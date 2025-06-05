import { createClient } from '@supabase/supabase-js';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;


const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Las variables de entorno de Supabase no están configuradas correctamente.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


export const supabaseClient = createPagesBrowserClient()
