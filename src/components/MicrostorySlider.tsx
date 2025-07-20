'use client';
import { useEffect, useState } from "react";
import { Slider } from "./ui/Slider";
import MicrostoryCard from "./MicrostoryCard";
import { PostgrestError } from '@supabase/supabase-js'
import { supabaseClient } from '@/lib/supabase'

type Microcuento = {
    id: string;
    title: string;
    name?: string;
    file_image: string;
    audio_url: string;
}
export default function MicrostorySlider() {
    const supabase = supabaseClient;
    const [cuentos, setCuentos] = useState<Microcuento[]>([]);
    const [error, setError] = useState<PostgrestError | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCuentos = async () => {
            const { data, error } = await supabase
                .from('micro_stories')
                .select('id, title, name, file_image, audio_url')
                .not('audio_url', 'is', null)
                .order('created_at', { ascending: false });

            if (error) {
                setError(error);
            } else {
                setCuentos(data || []);
            }
            setLoading(false);
        };
        fetchCuentos();
    }, [supabase]);

    if (loading) {
        return (
            <p className="text-gray-600 mt-24 text-center text-3xl">
                Cargando microcuentos...
            </p>
        );
    }

    if (error instanceof PostgrestError) {
        console.error('Error al cargar microcuentos:', error.message, error.details, error.code);
        return (
            <p className="text-red-500 mt-24 text-center text-3xl">
                No se pudieron cargar los cuentos. Inténtalo de nuevo.
            </p>
        );
    }


    return (
        <Slider>
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
        </Slider>
    );
}