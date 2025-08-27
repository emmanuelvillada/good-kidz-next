import { supabaseClient } from "../supabase"
type Member = {
    name: string
    role: string
    photo: string
    bio?: string
}

export async function getTeam(): Promise<Member[]> {
    const { data, error } = await supabaseClient
        .from('team')
        .select('name, role, photo, bio')
        .order('id', { ascending: true });

    if (error) {
        console.error('Error fetching team data:', error);
        return [];
    }

    return data || [];
}
