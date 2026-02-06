'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ResetPasswordPage() {
    const [ready, setReady] = useState(false)
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            if (data.session) {
                setReady(true)
            } else {
                setMessage('❌ Link inválido o expirado')
            }
        })
    }, [])

    const handleReset = async () => {
        const { error } = await supabase.auth.updateUser({ password })

        if (error) {
            setMessage(error.message)
        } else {
            setMessage('✅ Contraseña actualizada')
        }
    }

    if (!ready) return <p>Cargando sesión de recuperación...</p>

    return (
        <div style={{ padding: 40 }}>
            <h1>Restablecer contraseña</h1>

            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nueva contraseña"
            />

            <button onClick={handleReset}>Cambiar contraseña</button>

            {message && <p>{message}</p>}
        </div>
    )
}
