import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.MODE === 'dev'
    ? process.env.NEXT_PUBLIC_SUPABASE_URL_DEV
    : process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseAnonKey = process.env.MODE === 'dev'
    ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_DEV
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Las variables de entorno de Supabase no están configuradas correctamente.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
