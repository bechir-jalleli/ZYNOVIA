import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken, hashPassword, comparePassword } from '@/lib/auth';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function PUT(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = (await cookieStore.get('token'))?.value;

        if (!token) {
            return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
        }

        const payload: any = verifyToken(token);
        if (!payload) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }

        const { name, email, currentPassword, newPassword } = await req.json();

        await connectToDatabase();
        const user = await User.findById(payload.id);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Email uniqueness check if email is being changed
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return NextResponse.json({ message: 'Email déjà utilisé' }, { status: 400 });
            }
            user.email = email;
        }

        if (name !== undefined) {
            user.name = name;
        }

        // Password update
        if (newPassword) {
            if (!currentPassword) {
                return NextResponse.json({ message: 'Mot de passe actuel requis' }, { status: 400 });
            }

            const isMatch = await comparePassword(currentPassword, user.password);
            if (!isMatch) {
                return NextResponse.json({ message: 'Mot de passe actuel incorrect' }, { status: 400 });
            }

            user.password = await hashPassword(newPassword);
        }

        await user.save();

        const updatedUser = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        return NextResponse.json({ message: 'Profil mis à jour avec succès', user: updatedUser }, { status: 200 });
    } catch (error: any) {
        console.error('Update profile error:', error);
        return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
    }
}
