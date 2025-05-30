// app/admin/layout.tsx o app/admin/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const supabase = createServerComponentClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
        redirect('/login') // o página pública
    }

    // Verifica si el usuario es admin
    const { data: profile } = await supabase
        .from('profiles') // tu tabla de usuarios
        .select('role')
        .eq('id', session.user.id)
        .single()

    if (profile?.role !== 'admin') {
        redirect('/') // o muestra un 403
    }

    return (
        <section className="p-6">
            <h1 className="text-2xl mb-4">Panel de Administración</h1>
            {children}
        </section>
    )
}
