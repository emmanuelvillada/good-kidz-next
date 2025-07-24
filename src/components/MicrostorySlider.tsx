'use client';
import { useEffect, useState } from "react";
import { MSlider } from "./ui/MicrostorySlider";
import MicrostoryCard from "./MicrostoryCard";
import { PostgrestError } from '@supabase/supabase-js'
import { supabaseClient } from '@/lib/supabase'

type Microcuento = {
    id: string;
    title: string;
    name?: string;
    file_image: string;
    audio_url: string;
    description?: string;
}
export default function MicrostorySlider() {
    const supabase = supabaseClient;
    const [cuentos, setCuentos] = useState<Microcuento[]>([]);
    const [error, setError] = useState<PostgrestError | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCuentos = async () => {
            try {
                setLoading(true);
                setError(null);
                const { data, error } = await supabase
                    .from('micro_stories_audios')
                    .select('id, title, name, file_image, audio_url, description')
                    .not('audio_url', 'is', null)
                    .order('created_at', { ascending: false });

                if (error) {
                    throw error;
                }

                if (data) {
                    setCuentos(data);
                    console.log('Cuentos cargados:', data);
                }
            } catch (error) {
                setError(error as PostgrestError);
            }
            finally {
                setLoading(false);
            }
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

    if (cuentos.length === 0) {
        return (
            <p className="text-gray-600 mt-24 text-center text-3xl">
                No hay cuentos disponibles.
            </p>
        );
    }


    return (
        <section className="pt-10 mb-32 bg-transparent" id="microstories">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">
                    GUARDIANES DEL PLANETA VERDE
                </h2>
                <p className="text-lg md:text-xl text-gray-600 mb-12 text-center">
                    Un viaje sonoro tejido con la imaginación y la sabiduría de niñas y niños que sueñan un mundo mejor.
                    Este podcast nació en el Festival de Microcuento Infantil Ilustrado Planeta Verde Good Kidz 2025, donde sus letras —dulces, audaces y llenas de magia— se convirtieron en faros para imaginar un futuro más verde y justo.
                    Cinco universos narrativos reúnen las voces de estos pequeños guardianes del planeta: historias que inspiran, conmueven y despiertan el deseo de cuidar la Tierra desde la ternura y la acción.
                </p>
            </div>
            <MSlider>
                {cuentos.map((cuento) => (
                    <MicrostoryCard
                        key={cuento.id}
                        title={cuento.title}
                        author={cuento.name ?? ""}
                        imageUrl={cuento.file_image}
                        audioUrl={cuento.audio_url}
                        description={cuento.description}
                    />
                ))}
            </MSlider>
        </section>
    );
}