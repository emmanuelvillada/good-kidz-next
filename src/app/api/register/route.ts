import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
    try {
        const { email, name, apellido, contraseña, age, ciudad } = await req.json();

        if (!email || !name || !apellido || !contraseña || !age || !ciudad) {
            return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
        }

        // Cifrar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        const client = await clientPromise;
        const db = client.db('goodkidz');

        const result = await db.collection('users').insertOne({
            email,
            name,
            apellido,
            contraseña: hashedPassword, // Guardar la contraseña cifrada
            age,
            ciudad,
            createdAt: new Date(),
        });

        return NextResponse.json({ message: 'Registro exitoso', result }, { status: 200 });
    } catch (error) {
        console.error('Error al procesar el registro:', error);
        return NextResponse.json({ error: 'Error al procesar el registro' }, { status: 500 });
    }
}
