'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import ImageWithLoader from '@/components/ui/ImageWithLoader'
import { supabase } from '@/lib/supabase'
import { useEffect, useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react'

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

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'start',
            skipSnaps: false,
            dragFree: false,
        },
        [Autoplay({ delay: 5000, stopOnInteraction: true })]
    )

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
        setCanScrollPrev(emblaApi.canScrollPrev())
        setCanScrollNext(emblaApi.canScrollNext())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)

        return () => {
            emblaApi.off('select', onSelect)
            emblaApi.off('reInit', onSelect)
        }
    }, [emblaApi, onSelect])

    useEffect(() => {
        let isMounted = true;

        const fetchEvents = async () => {
            setIsLoading(true);
            try {
                const { data, error } = await supabase
                    .from('past_events')
                    .select('*')
                    .order('date', { ascending: false })
                    .limit(6);

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
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent border-verde-goodkidz"></div>
                    <div className="absolute inset-0 animate-pulse rounded-full h-16 w-16 border-4 border-verde-goodkidz/20"></div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-12 px-4" role="alert">
                <div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-lg p-6">
                    <p className="text-lg font-semibold text-red-800 mb-2">Error al cargar eventos</p>
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    if (events.length === 0) {
        return (
            <div className="text-center py-16 px-4">
                <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <Calendar className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="text-gray-600 text-lg font-medium">No hay eventos disponibles en este momento</p>
                    <p className="text-gray-500 text-sm mt-2">Pronto compartiremos nuevas actividades</p>
                </div>
            </div>
        );
    }

    return (
        <section className="py-20 md:py-24 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden mx-auto">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-verde-goodkidz/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-verde-goodkidz/5 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 md:mb-16"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-verde-goodkidz mb-4">
                            AL COMPÁS DE LAS ACCIONES
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
                            Descubre las iniciativas que hacen la diferencia en nuestra comunidad
                        </p>
                    </motion.div>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-verde-goodkidz to-transparent rounded-full mx-auto"></div>
                </motion.div>

                <div className="relative">
                    {/* Carousel */}
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex gap-4 md:gap-6">
                            {events.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Card className="group border-none shadow-lg hover:shadow-2xl transition-all duration-500 h-full overflow-hidden bg-white hover:-translate-y-1">
                                        <CardContent className="p-0 flex flex-col h-full">
                                            <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
                                                <ImageWithLoader
                                                    src={event.image || '/default-image.jpg'}
                                                    alt={event.title}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                                {event.date && (
                                                    <motion.div
                                                        initial={{ x: 20, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        transition={{ delay: 0.3 }}
                                                        className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-lg border border-gray-100"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="w-4 h-4 text-verde-goodkidz" />
                                                            <p className="text-sm font-semibold text-gray-800">{event.date}</p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </div>

                                            <div className="p-6 md:p-7 flex-1 flex flex-col">
                                                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-verde-goodkidz transition-colors duration-300">
                                                    {event.title}
                                                </h3>

                                                <p className="line-clamp-3 text-gray-600 mb-4 leading-relaxed flex-1">
                                                    {event.description}
                                                </p>

                                                {event.location && (
                                                    <div className="flex items-center gap-2 text-gray-600 mt-auto pt-4 border-t border-gray-100">
                                                        <MapPin className="w-4 h-4 flex-shrink-0 text-verde-goodkidz" />
                                                        <span className="text-sm font-medium truncate">{event.location}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    {events.length > 1 && (
                        <>
                            <button
                                onClick={scrollPrev}
                                disabled={!canScrollPrev}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 bg-white hover:bg-verde-goodkidz text-verde-goodkidz hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-verde-goodkidz shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 active:scale-95"
                                aria-label="Evento anterior"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>

                            <button
                                onClick={scrollNext}
                                disabled={!canScrollNext}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 bg-white hover:bg-verde-goodkidz text-verde-goodkidz hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-verde-goodkidz shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 active:scale-95"
                                aria-label="Siguiente evento"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}
                </div>

                {/* Dots indicator */}
                {events.length > 1 && (
                    <div className="flex justify-center gap-2 mt-8">
                        {events.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => emblaApi && emblaApi.scrollTo(index)}
                                className={`transition-all duration-300 rounded-full ${index === selectedIndex
                                    ? 'w-8 h-2 bg-verde-goodkidz'
                                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                                    }`}
                                aria-label={`Ir al evento ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}