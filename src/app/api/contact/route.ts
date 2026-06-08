import { NextResponse } from 'next/server'
import { saveFormSubmission } from '@/lib/formSubmission'

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

    let body;
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

    const formattedMessage = `Rôle: ${sanitizedRole}\nTéléphone: ${sanitizedPhone}\n\nMessage:\n${sanitizedMessage}`

    console.log('Env variables check:', {
      EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID ? 'Exists' : 'Missing',
      EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID ? 'Exists' : 'Missing',
      EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY ? 'Exists' : 'Missing',
      WEB3FORMS_ACCESS_KEY: process.env.WEB3FORMS_ACCESS_KEY ? 'Exists' : 'Missing',
    })

    // 1. EmailJS (Primary)
    let emailStatus = false
    try {
      console.log('Attempting EmailJS send...')
      const emailJsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: process.env.EMAILJS_SERVICE_ID,
          template_id: process.env.EMAILJS_TEMPLATE_ID,
          user_id: process.env.EMAILJS_PUBLIC_KEY,
          template_params: {
            from_name: sanitizedName,
            from_email: sanitizedEmail,
            message: formattedMessage,
            role: sanitizedRole,
            phone: sanitizedPhone,
          },
        }),
      })
      emailStatus = emailJsResponse.ok
      console.log('EmailJS Response Status:', emailJsResponse.status, emailJsResponse.statusText)
      if (!emailStatus) {
        const errorText = await emailJsResponse.text()
        console.error('EmailJS Error Detail:', errorText)
      }
    } catch (error) {
      console.error('EmailJS Fetch Exception:', error)
    }

    // 2. Web3 Forms (Redundancy)
    let web3Status = false
    try {
      console.log('Attempting Web3Forms send...')
      const web3FormData = new URLSearchParams()
      web3FormData.append('access_key', process.env.WEB3FORMS_ACCESS_KEY || '')
      web3FormData.append('name', sanitizedName)
      web3FormData.append('email', sanitizedEmail)
      web3FormData.append('message', formattedMessage)
      web3FormData.append('subject', `Nouveau Contact: ${sanitizedName} (${sanitizedRole})`)

      const web3Response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: web3FormData,
      })
      web3Status = web3Response.ok
      console.log('Web3Forms Response Status:', web3Response.status)
      if (!web3Status) {
        const errorText = await web3Response.text()
        console.error('Web3Forms Error Detail:', errorText)
      }
    } catch (error) {
      console.error('Web3Forms Fetch Exception:', error)
    }

    console.log('Final Status - EmailJS:', emailStatus, 'Web3Forms:', web3Status)

    if (emailStatus || web3Status) {
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
    }

    console.log('Both services failed.')
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.' },
      { status: 500 }
    )
  } catch (error) {
    console.error('CRITICAL Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}


