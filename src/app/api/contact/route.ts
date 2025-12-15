import { NextResponse } from 'next/server'

// Rate limiting: simple in-memory store (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3 // Max 3 requests per minute per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }

  record.count++
  return true
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip)
    }
  }
}, RATE_LIMIT_WINDOW)

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown'

    // Rate limiting check
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Trop de requêtes. Veuillez réessayer dans quelques instants.' },
        { status: 429 }
      )
    }

    const body = await request.json()

    // Honeypot field check (spam protection)
    if (body.website || body.website !== '') {
      // If honeypot is filled, it's likely a bot
      return NextResponse.json({ success: true }) // Silent fail to not alert bots
    }

    // Validation
    const { name, email, role, message, phone } = body

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Le nom doit contenir au moins 2 caractères.' },
        { status: 400 }
      )
    }

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'L\'email est requis.' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Format d\'email invalide.' },
        { status: 400 }
      )
    }

    if (!role || typeof role !== 'string') {
      return NextResponse.json(
        { error: 'Le rôle est requis.' },
        { status: 400 }
      )
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Le message doit contenir au moins 10 caractères.' },
        { status: 400 }
      )
    }

    // Sanitize inputs (basic sanitization)
    const sanitizedName = name.trim().substring(0, 100)
    const sanitizedEmail = email.trim().substring(0, 255)
    const sanitizedPhone = phone ? phone.trim().substring(0, 20) : ''
    const sanitizedRole = role.trim().substring(0, 50)
    const sanitizedMessage = message.trim().substring(0, 2000)

    // In production, you would:
    // 1. Save to database
    // 2. Send email notification using nodemailer, SendGrid, Resend, etc.
    // 3. Send confirmation email to user
    // 4. Log the submission

    // Example email sending (commented out - requires email service setup):
    /*
    import nodemailer from 'nodemailer'
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Send notification to admin
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: `Nouveau contact: ${sanitizedRole} - ${sanitizedName}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Téléphone:</strong> ${sanitizedPhone || 'Non fourni'}</p>
        <p><strong>Rôle:</strong> ${sanitizedRole}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
      `,
    })

    // Send confirmation to user
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: sanitizedEmail,
      subject: 'Confirmation de réception - INOTEQIA Academy',
      html: `
        <h2>Merci pour votre message !</h2>
        <p>Nous avons bien reçu votre demande et nous vous répondrons dans les plus brefs délais.</p>
        <p>L'équipe INOTEQIA Academy</p>
      `,
    })
    */

    // For now, just log and return success
    console.log('Contact form submission:', {
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      role: sanitizedRole,
      message: sanitizedMessage.substring(0, 100) + '...',
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Votre message a été envoyé avec succès. Nous vous répondrons rapidement.',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}


