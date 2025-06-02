import { createClient } from '@supabase/supabase-js';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey || !supabaseKey) {
    throw new Error('Las variables de entorno de Supabase no están configuradas correctamente.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const supabaseService = createClient(supabaseUrl, supabaseKey);


export const supabaseClient = createPagesBrowserClient()
