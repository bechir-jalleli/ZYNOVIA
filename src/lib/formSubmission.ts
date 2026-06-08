import FormSubmission from '@/models/FormSubmission';
import connectToDatabase from '@/lib/mongodb';

interface SubmissionInput {
    name: string;
    email: string;
    phone?: string;
    role?: string;
    message: string;
    formType?: 'contact' | 'rendez-vous';
    appointmentDate?: string;
    appointmentTime?: string;
    appointmentType?: 'visio' | 'onsite' | '';
}

function resolveSubmissionType(body: SubmissionInput): 'contact' | 'rendez-vous' {
    if (body.formType === 'rendez-vous' || body.formType === 'contact') {
        return body.formType;
    }
    if (body.role?.startsWith('Rendez-vous')) {
        return 'rendez-vous';
    }
    return 'contact';
}

function resolveAppointmentType(body: SubmissionInput): 'visio' | 'onsite' | '' {
    if (body.appointmentType === 'visio' || body.appointmentType === 'onsite') {
        return body.appointmentType;
    }
    if (body.role?.includes('Visio')) return 'visio';
    if (body.role?.includes('Sur site')) return 'onsite';
    return '';
}

function parseAppointmentFromMessage(message: string) {
    const dateMatch = message.match(/Date souhaitée:\s*(.+)/);
    const timeMatch = message.match(/Heure souhaitée:\s*(.+)/);
    return {
        appointmentDate: dateMatch?.[1]?.trim() || '',
        appointmentTime: timeMatch?.[1]?.trim() || '',
    };
}

export async function saveFormSubmission(body: SubmissionInput) {
    const type = resolveSubmissionType(body);
    const parsed = parseAppointmentFromMessage(body.message);

    await connectToDatabase();
    await FormSubmission.create({
        type,
        name: body.name.trim(),
        email: body.email.trim(),
        phone: body.phone?.trim() || '',
        role: body.role?.trim() || '',
        message: body.message.trim(),
        appointmentDate: body.appointmentDate || parsed.appointmentDate,
        appointmentTime: body.appointmentTime || parsed.appointmentTime,
        appointmentType: resolveAppointmentType(body),
    });
}
