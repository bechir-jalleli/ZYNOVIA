import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (process.env.NODE_ENV === 'development') {
            console.log('Meet Request Submission (Body):', JSON.stringify(body, null, 2));
        }

        const { firstName, lastName, name, email, date, time, subject, appointmentType } = body;

        // Validation
        if (!email || !date || !time) {
            return NextResponse.json(
                { success: false, message: 'Champs requis manquants' },
                { status: 400 }
            );
        }

        let fullName = name || '';
        if (!fullName) {
            fullName = `${firstName || ''} ${lastName || ''}`.trim();
        }
        if (!fullName) fullName = 'Inconnu';

        const serviceId = process.env.EMAILJS_SERVICE_ID;
        const templateId = process.env.EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.EMAILJS_PUBLIC_KEY;
        const privateKey = process.env.EMAILJS_PRIVATE_KEY;

        if (!serviceId || !templateId || !publicKey) {
            return NextResponse.json(
                { success: false, message: 'Configuration EmailJS manquante.' },
                { status: 500 }
            );
        }

        const now = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });

        const formattedMessage = `
Demande de réunion reçue.

Sujet: ${subject || 'Enquête / Autre'}
Type: ${appointmentType || 'Non spécifié'}
Date: ${date}
Heure: ${time}

--- Détails de l'expéditeur ---
Nom: ${fullName}
Email: ${email}
`.trim();

        const emailjsData: any = {
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
                type: 'Réunion',
                name: fullName,
                time: now,
                message: formattedMessage,
                from_name: fullName,
                from_email: email,
            }
        };

        if (privateKey && privateKey !== 'YOUR_PRIVATE_KEY_HERE') {
            emailjsData.accessToken = privateKey;
        }

        // 1. Submit to EmailJS
        let emailjsResponse;
        try {
            emailjsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(emailjsData),
            });
        } catch (err) {
            console.error('EmailJS Request Failed:', err);
        }

        // 2. Submit to Web3Forms
        let web3Status = false;
        const web3Key = process.env.WEB3FORMS_ACCESS_KEY;
        if (web3Key) {
            try {
                const web3FormData = new URLSearchParams();
                web3FormData.append('access_key', web3Key);
                web3FormData.append('name', fullName);
                web3FormData.append('email', email);
                web3FormData.append('message', formattedMessage);
                web3FormData.append('subject', `Demande de Réunion: ${subject || 'Sans sujet'}`);
                web3FormData.append('from_name', 'Energy Way Meeting');

                const web3Response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'User-Agent': `Mozilla/5.0 (compatible; NextJS/${process.env.NEXT_VERSION || '16.1.1'})`,
                        'Accept': 'application/json',
                    },
                    body: web3FormData,
                });
                web3Status = web3Response.ok;
                if (web3Status) {
                    const data = await web3Response.json().catch(() => ({}));
                    if (process.env.NODE_ENV === 'development') console.log('✅ Web3Forms Success (Meeting):', data);
                }
            } catch (err) {
                console.error('❌ Web3Forms Error (Meeting):', err);
            }
        }

        if (emailjsResponse?.ok || web3Status) {
            return NextResponse.json({
                success: true,
                message: 'Réunion envoyée avec succès',
                details: {
                    emailjs: emailjsResponse?.ok || false,
                    web3forms: web3Status
                }
            });
        } else {
            const errorText = emailjsResponse ? await emailjsResponse.text() : 'EmailJS call failed';
            console.error('All services failed. EmailJS Error:', errorText);
            return NextResponse.json({ success: false, message: errorText }, { status: 400 });
        }

    } catch (error: any) {
        console.error('API error:', error);
        return NextResponse.json({ success: false, message: 'Erreur interne' }, { status: 500 });
    }
}
