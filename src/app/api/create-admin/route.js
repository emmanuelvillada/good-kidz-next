import { supabaseService } from "@/lib/supabase";

const supabase = supabaseService();

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return new Response(JSON.stringify({ error: 'Email and password required' }), { status: 400 });
        }

        // Crear usuario con supabase admin
        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
        });

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 400 });
        }

        // Insertar is_admin en tabla users (ajusta el nombre de la tabla si tienes otra)
        const { error: updateError } = await supabase
            .from('users')
            .insert([{ id: data.user.id, email, is_admin: true }]);

        if (updateError) {
            return new Response(JSON.stringify({ error: updateError.message }), { status: 400 });
        }

        return new Response(JSON.stringify({ message: 'Admin user created successfully' }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}