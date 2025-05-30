// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    const { data: { session } } = await supabase.auth.getSession()

    // Proteger rutas admin
    if (req.nextUrl.pathname.startsWith('/admin') && !session) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return res
}
