'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function ResetPasswordPage() {
    const supabase = createClientComponentClient()
    const [password, setPassword] = useState('')
    const [ready, setReady] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        // Auth helpers procesa automáticamente el token del link
        supabase.auth.getSession().then(({ data }) => {
            if (data.session) {
                setReady(true)
            } else {
                setMessage('❌ El link de recuperación es inválido o expiró')
            }
        })
    }, [supabase])

    const handleReset = async () => {
        const { error } = await supabase.auth.updateUser({
            password,
        })

        if (error) {
            setMessage(error.message)
        } else {
            setMessage('✅ Contraseña actualizada correctamente')
        }
    }

    if (!ready) {
        return <p>Cargando sesión de recuperación...</p>
    }

    return (
        <div style={{ padding: 40 }}>
            <h1>Restablecer contraseña</h1>

            <input
                type="password"
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleReset}>
                Cambiar contraseña
            </button>

            {message && <p>{message}</p>}
        </div>
    )
}
