
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import MicrostoryCard from '@/components/MicrostoryCard'

export default async function MicrocuentosPage() {
    const supabase = createServerComponentClient({ cookies })

    const { data: cuentos, error } = await supabase
        .from('microcuentos')
        .select('id, title, author, image_url, audio_url')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error al cargar microcuentos:', error.message)
        return <p className="text-red-500">No se pudieron cargar los cuentos.</p>
    }

    return (
        <section className="mt-4 container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Microcuentos Infantiles</h1>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {cuentos?.map((cuento) => (
                    <MicrostoryCard
                        key={cuento.id}
                        cuento={{
                            id: cuento.id,
                            title: cuento.title,
                            author: cuento.author,
                            imageUrl: cuento.image_url,
                            audioUrl: cuento.audio_url,
                        }}
                    />
                ))}
            </div>
        </section>
    )
}
