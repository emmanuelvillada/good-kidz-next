// app/admin/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminPanel from '@/components/admin/AdminPanel'

export default async function AdminPage() {
    const supabase = createServerComponentClient({ cookies })

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (error || profile?.role !== 'admin') {
        redirect('/login')
    }

    return (
        <section className="p-6">
            <h1 className="text-2xl mb-4">Panel de Administración</h1>
            <AdminPanel />
        </section>
    )
}
