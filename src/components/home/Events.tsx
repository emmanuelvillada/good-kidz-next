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
        let isMounted = true;

        const fetchEvents = async () => {
            setIsLoading(true);
            try {
                const { data, error } = await supabase
                    .from('past_events')
                    .select('*')
                    .order('date', { ascending: false })
                    .limit(5);

                if (error) throw error;

                if (isMounted) {
                    setEvents(data || []);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Error al cargar eventos');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchEvents();

        return () => {
            isMounted = false;
        };
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]" role="status" aria-label="Cargando eventos">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-verde-goodkidz"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-12 text-red-600" role="alert">
                <p className="text-lg font-medium">Error al cargar eventos</p>
                <p className="text-sm mt-2">{error}</p>
            </div>
        );
    }

    if (events.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No hay eventos disponibles en este momento</p>
            </div>
        );
    }

    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        AL COMPÁS DE LAS ACCIONES
                    </h2>
                    <div className="w-24 h-1 bg-verde-goodkidz mx-auto mb-6"></div>
                </motion.div>

                <Slider>
                    {events.map((event, index) => (
                        <div key={event.id} className="px-4 md:px-6 lg:px-8 h-full">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="h-full"
                            >
                                <Card className="group border-none shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 h-full overflow-hidden">
                                    <CardContent className="p-0 flex flex-col h-full">
                                        <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
                                            <ImageWithLoader
                                                src={event.image || '/default-image.jpg'}
                                                alt={event.title}
                                            />
                                            {event.date && (
                                                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                                                    <p className="text-sm font-semibold text-gray-800">{event.date}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-verde-goodkidz transition-colors duration-300">
                                                    {event.title}
                                                </h3>
                                                <p className="line-clamp-3 text-gray-700 mb-4 leading-relaxed">
                                                    {event.description}
                                                </p>
                                            </div>
                                            {event.location && (
                                                <div className="flex items-center gap-2 text-gray-600 mt-auto pt-4 border-t border-gray-100">
                                                    <svg className="w-5 h-5 flex-shrink-0 text-verde-goodkidz" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <span className="text-sm font-medium">{event.location}</span>
                                                </div>
                                            )}
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