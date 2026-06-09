import { NextResponse } from 'next/server';
import { saveFormSubmission } from '@/lib/formSubmission';
import { sendContactEmail } from '@/lib/email';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (process.env.NODE_ENV === 'development') {
            console.log('Meet Request Submission (Body):', JSON.stringify(body, null, 2));
        }

        const { firstName, lastName, name, email, date, time, subject, appointmentType } = body;

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

        const emailResult = await sendContactEmail({
            name: fullName,
            email,
            role: subject || 'Réunion',
            message: formattedMessage,
            formType: 'rendez-vous',
            subject: `Demande de Réunion: ${subject || 'Sans sujet'}`,
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
                role: subject || 'Réunion',
                message: formattedMessage,
                formType: 'rendez-vous',
                appointmentDate: date,
                appointmentTime: time,
                appointmentType: appointmentType || '',
            });
        } catch (dbError) {
            console.error('Failed to save meet submission:', dbError);
        }

        return NextResponse.json({
            success: true,
            message: 'Réunion envoyée avec succès',
        });
    } catch (error: unknown) {
        console.error('API error:', error);
        return NextResponse.json({ success: false, message: 'Erreur interne' }, { status: 500 });
    }
}
