import { supabaseClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const supabase = supabaseClient
    const { data: { session } } = await supabase.auth.getSession()

    // Validación de sesión y rol
    if (!session) redirect('/login')

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

    if (profile?.role !== 'admin') redirect('/login')

    return <>{children}</>
}
