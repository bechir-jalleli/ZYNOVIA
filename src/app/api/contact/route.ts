import { NextResponse } from 'next/server'
import { saveFormSubmission } from '@/lib/formSubmission'
import { sendContactEmail } from '@/lib/email'

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
  console.log('--- Start /api/contact POST ---')
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown'

    // Rate limiting check
    if (!checkRateLimit(ip)) {
      console.log('Rate limit exceeded for IP:', ip)
      return NextResponse.json(
        { error: 'Trop de requêtes. Veuillez réessayer dans quelques instants.' },
        { status: 429 }
      )
    }

    const rawBody = await request.text()
    console.log('Raw body received:', rawBody)

    let body
    try {
      body = JSON.parse(rawBody)
    } catch (e) {
      console.error('Failed to parse JSON body:', e)
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    // Honeypot field check (spam protection)
    const { name, email, role, message, phone, website } = body
    if (website && website !== '') {
      console.log('Honeypot triggered, silent fail.')
      return NextResponse.json({ success: true })
    }

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      console.log('Validation failed: name too short or missing')
      return NextResponse.json(
        { error: 'Le nom doit contenir au moins 2 caractères.' },
        { status: 400 }
      )
    }

    if (!email || typeof email !== 'string') {
      console.log('Validation failed: email missing')
      return NextResponse.json(
        { error: 'L\'email est requis.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      console.log('Validation failed: invalid email format')
      return NextResponse.json(
        { error: 'Format d\'email invalide.' },
        { status: 400 }
      )
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      console.log('Validation failed: message too short')
      return NextResponse.json(
        { error: 'Le message doit contenir au moins 10 caractères.' },
        { status: 400 }
      )
    }

    // Sanitize and format
    const sanitizedName = name.trim().substring(0, 100)
    const sanitizedEmail = email.trim().substring(0, 255)
    const sanitizedPhone = phone ? phone.trim().substring(0, 20) : 'Non fourni'
    const sanitizedRole = (role || 'General').trim().substring(0, 50)
    const sanitizedMessage = message.trim().substring(0, 2000)

    console.log('Attempting SMTP send...')
    const emailResult = await sendContactEmail({
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      role: sanitizedRole,
      message: sanitizedMessage,
      formType: 'contact',
      subject: `Nouveau Contact: ${sanitizedName} (${sanitizedRole})`,
    })

    if (!emailResult.success) {
      console.error('SMTP send failed:', emailResult.error)
      return NextResponse.json(
        { error: 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.' },
        { status: 500 }
      )
    }

    try {
      await saveFormSubmission({
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        role: sanitizedRole,
        message: sanitizedMessage,
        formType: 'contact',
      })
    } catch (dbError) {
      console.error('Failed to save contact submission:', dbError)
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Votre message a été envoyé avec succès. Nous vous répondrons rapidement.',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('CRITICAL Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}
