// app/microcuentos/page.tsx

import MicrostoryCard from '@/components/MicrostoryCard'
import { PostgrestError } from '@supabase/supabase-js'
import { supabaseClient } from '@/lib/supabase'

export default async function MicrocuentosPage() {
    const supabase = supabaseClient


    const { data: cuentos, error } = await supabase
        .from('micro_stories')
        .select('id, title, name, file_image, audio_url')
        .not('audio_url', 'is', null)
        .order('created_at', { ascending: false })


    console.log(cuentos)

    if (error instanceof PostgrestError) {
        console.error('Error al cargar microcuentos:', error.message && error.details && error.code);
        return (
            <p className="text-red-500 mt-24 text-center text-3xl">
                No se pudieron cargar los cuentos. Inténtalo de nuevo.
            </p>
        )
    }

    if (!cuentos || cuentos.length === 0) {
        return (
            <p className="text-gray-600 mt-24 text-center text-3xl">
                No hay microcuentos con audio aún.
            </p>
        )
    }

    return (
        <section className="mt-4 container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Microcuentos Infantiles</h1>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {cuentos.map((cuento) => (
                    <MicrostoryCard
                        key={cuento.id}
                        cuento={{
                            id: cuento.id,
                            title: cuento.title,
                            author: cuento.name,
                            imageUrl:
                                'https://asisdninqgnkereutwxt.supabase.co/storage/v1/object/public/micro-stories/' +
                                cuento.file_image,
                            audioUrl: cuento.audio_url,
                        }}
                    />
                ))}
            </div>
        </section>
    )
}
