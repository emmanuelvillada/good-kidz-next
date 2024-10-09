// src/app/api/register/route.ts
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, contraseña } = await req.json();

  if (!email || !contraseña) {
    return NextResponse.json({ error: 'El correo y la contraseña son obligatorios' }, { status: 400 });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password: contraseña,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Registro exitoso', data }, { status: 200 });
}
