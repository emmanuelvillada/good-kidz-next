'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
    email: z.string().email('Correo inválido'),
    password: z.string().min(6, 'Mínimo 6 caracteres'),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
    const router = useRouter()
    const supabase = createPagesBrowserClient()
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    })

    const onSubmit = async (data: FormData) => {
        setLoading(true)
        setErrorMsg('')
        const { error } = await supabase.auth.signInWithPassword(data)
        setLoading(false)

        if (error) {
            setErrorMsg(error.message)
        } else {
            router.push('/admin')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Panel de administración</h2>
                {errorMsg && (
                    <div className="mb-4 p-3 text-sm bg-red-100 text-red-700 rounded">{errorMsg}</div>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div>
                        <label className="block font-semibold text-gray-700 mb-1">Correo electrónico</label>
                        <input
                            type="email"
                            {...register('email')}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="correo@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 mb-1">Contraseña</label>
                        <input
                            type="password"
                            {...register('password')}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 mt-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </button>
                </form>
            </div>
        </div>
    )
}
