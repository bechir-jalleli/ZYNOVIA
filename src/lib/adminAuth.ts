import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export async function isAdmin() {
    const cookieStore = await cookies();
    const token = (await cookieStore.get('token'))?.value;
    if (!token) return false;
    const payload: any = verifyToken(token);
    return payload && payload.role === 'admin';
}
