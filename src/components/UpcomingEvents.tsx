'use client';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Image from "next/image";

interface Event {
    id: number;
    title: string;
    date: string;
    location: string;
    description?: string;
    image_url?: string;
}

export default function UpcomingEvents() {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchEvents() {
            try {
                setIsLoading(true);
                const { data, error } = await supabase
                    .from("events")
                    .select("*")
                    .order("date", { ascending: true })
                    .gte("date", new Date().toISOString());

                if (error) throw error;
                setEvents(data || []);
            } catch (err) {
                setError("Error al cargar los eventos");
                console.error("Error fetching events:", err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchEvents();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-verde-goodkidz"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12 text-red-600">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <section className="container mx-auto pb-12 px-4" id="events">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4">
                    Próximos Eventos
                </h2>
                <div className="w-24 h-1 bg-verde-goodkidz mx-auto mb-12"></div>

                {events.length === 0 ? (
                    <p className="text-center text-gray-600">No hay eventos próximos programados.</p>

                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => (
                            <motion.div
                                key={event.id}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                            >
                                {event.image_url && (
                                    <div className="relative h-48 w-full">
                                        <Image
                                            src={event.image_url}
                                            alt={event.title}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                                        {event.title}
                                    </h3>
                                    {event.description && (
                                        <p className="text-gray-600 mb-4 line-clamp-2">
                                            {event.description}
                                        </p>
                                    )}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-gray-500">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            <span className="text-sm">
                                                {format(new Date(event.date), 'PPP', { locale: es })}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-gray-500">
                                            <MapPin className="w-4 h-4 mr-2" />
                                            <span className="text-sm">{event.location}</span>
                                        </div>
                                    </div>
                                    <Button
                                        className="w-full bg-verde-goodkidz hover:bg-verde-goodkidz/90 
                                                 text-white font-medium py-2 px-4 rounded-lg 
                                                 transition-all duration-300 shadow-md hover:shadow-lg"
                                    >
                                        Más Información
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </section>
    );
}
