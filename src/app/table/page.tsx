import MicrostoryTable from "@/components/MicrostoryTable";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function TablePage() {
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
        <MicrostoryTable>

        </MicrostoryTable>
    );
}
