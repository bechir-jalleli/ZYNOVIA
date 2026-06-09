import { NextResponse } from 'next/server';
import { saveFormSubmission } from '@/lib/formSubmission';
import { sendContactEmail } from '@/lib/email';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (process.env.NODE_ENV === 'development') {
            console.log('Client Submission (Body):', JSON.stringify(body, null, 2));
        }

        const { firstName, lastName, name, email, company, role, phone, message } = body;

        if (!email || !message) {
            return NextResponse.json(
                { success: false, message: 'Champs requis manquants' },
                { status: 400 }
            );
        }

        let fullName = name || '';
        if (!fullName) {
            fullName = `${firstName || ''} ${lastName || ''}`.trim();
        }
        if (!fullName) fullName = 'Client';

        const resolvedRole = company || role || 'Client';
        const resolvedPhone = phone || 'N/A';

        let formattedMessage = message || '';
        formattedMessage += `\n\n--- Détails Entreprise ---`;
        formattedMessage += `\nSociété/Rôle: ${resolvedRole}`;
        formattedMessage += `\nEmail: ${email}`;
        if (phone) formattedMessage += `\nTéléphone: ${phone}`;
        formattedMessage += `\nType: CLIENT (Projet)`;

        const emailResult = await sendContactEmail({
            name: fullName,
            email,
            phone: resolvedPhone,
            role: resolvedRole,
            message: formattedMessage,
            formType: body.formType || 'contact',
            subject: `Nouveau Projet Client: ${fullName}`,
        });

        if (!emailResult.success) {
            console.error('SMTP send failed:', emailResult.error);
            return NextResponse.json(
                { success: false, message: emailResult.error || 'Erreur lors de l\'envoi du message.' },
                { status: 500 }
            );
        }

        try {
            await saveFormSubmission({
                name: fullName,
                email,
                phone,
                role: resolvedRole,
                message: formattedMessage,
                formType: body.formType,
                appointmentDate: body.appointmentDate,
                appointmentTime: body.appointmentTime,
                appointmentType: body.appointmentType,
            });
        } catch (dbError) {
            console.error('Failed to save form submission:', dbError);
        }

        return NextResponse.json({
            success: true,
            message: 'Message envoyé avec succès',
        });
    } catch (error: unknown) {
        console.error('API error:', error);
        return NextResponse.json({ success: false, message: 'Erreur interne' }, { status: 500 });
    }
}
