// app/api/auth/signup/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    const { email, password } = await request.json();

    // Vérifier que tous les champs sont remplis
    if (!email || !password) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });

    return NextResponse.json({ message: 'User created successfully', user }, { status: 201 });
}
