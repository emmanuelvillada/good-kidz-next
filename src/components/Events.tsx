'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/Slider'
import ImageWithLoader from '@/components/ui/ImageWithLoader'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

interface Event {
    id: string;
    title: string;
    description: string;
    image?: string;
    date: string;
    location?: string;
    created_at: string;
}

export default function EventCarousel() {
    const [events, setEvents] = useState<Event[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true) // Asegurar que esto se ejecuta antes de la llamada async
            try {
                const { data, error } = await supabase
                    .from('past_events')
                    .select('*')
                    .order('date', { ascending: false })
                    .limit(5);

                if (error) throw error;

                // Aseguramos que solo actualizamos el estado si el componente está montado
                setEvents(data || []);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchEvents();
    }, []);


    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-verde-goodkidz"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-12 text-red-600">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <section className="py-24 bg-transparent relative">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16 h-full"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        AL COMPÁS DE LAS ACCIONES
                    </h2>
                    <div className="w-24 h-1 bg-verde-goodkidz mx-auto mb-6"></div>
                </motion.div>

                <Slider>
                    {events.map((event) => (
                        <div key={event.id} className="px-4 md:px-6 lg:px-8 h-full w">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="h-full"
                            >
                                <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                                    <CardContent className="p-0 flex flex-col h-full">
                                        <div className="relative w-full h-[200px] md:h-[350px] lg:h-[450px] xl:h-[500px]">
                                            <ImageWithLoader src={event.image || '/default-image.jpg'} alt={event.title} />                                            {event.date && (
                                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                                                    <p className="text-sm font-medium text-gray-800">{event.date}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-8 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-800 mb-3">{event.title}</h3>
                                                <p className="text-gray-600 mb-4">{event.description}</p>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-500 mt-auto">
                                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span className="text-sm">{event.location}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    )
}
