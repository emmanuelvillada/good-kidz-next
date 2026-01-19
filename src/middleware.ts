import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()

    // ⚠️ IMPORTANTE: no proteger reset-password
    if (req.nextUrl.pathname.startsWith('/reset-password')) {
        return res
    }

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll: () => req.cookies.getAll(),
                setAll: (cookies) => {
                    cookies.forEach(({ name, value, options }) => {
                        res.cookies.set(name, value, options)
                    })
                },
            },
        }
    )

    const {
        data: { session },
    } = await supabase.auth.getSession()

    // 🔒 Proteger rutas admin
    if (req.nextUrl.pathname.startsWith('/admin') && !session) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return res
}
