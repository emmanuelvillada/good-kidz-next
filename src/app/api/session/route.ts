// src/app/api/session/route.ts
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: 'No hay sesión activa' }, { status: 401 });
  }

  return NextResponse.json({ session });
}
