'use client';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Calendar, MapPin } from 'lucide-react';
import Image from "next/image";
import { StaticImageData } from "next/image";
import { Slider } from "./ui/Slider";


interface Event {
    id: number;
    title: string;
    date: string;
    location: string;
    description?: string;
    file?: StaticImageData | string;
    link: string;
}

export default function UpcomingEvents() {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setIsLoading(true);
                const { data, error } = await supabase
                    .from("events")
                    .select("*")
                    .order("date", { ascending: true })
                    .gte("date", new Date().toISOString());

                if (error) throw error;
                setEvents(data as Event[]);
            } catch (err) {
                setError("Error al cargar los eventos");
                console.error("Error fetching events:", err);
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
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="bg-red-50 p-4 rounded-lg inline-block">
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <section className="pt-10 bg-transparent" id="upcoming-events">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        VEN Y DESCUBRE...
                    </h2>
                    <div className="w-24 h-1 bg-verde-goodkidz mx-auto mb-6"></div>
                </motion.div>

                {events.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12 bg-gray-50 rounded-xl"
                    >
                        <p className="text-gray-600">No hay eventos próximos programados.</p>
                    </motion.div>
                ) : (
                    <div className="relative" id="upcoming-events">
                        {/* Aumenté la altura del contenedor del Slider */}
                        <div className="pb-16">
                            <Slider>
                                {events.map((event, index) => (
                                    <div key={event.id} className="px-4 pb-12"> {/* Aumentado a pb-12 */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1, duration: 0.3 }}
                                            className=" bg-white rounded-xl shadow-lg overflow-visible hover:shadow-xl transition-all duration-300"

                                        >
                                            {event.file && (
                                                <div className="relative aspect-video w-full md:h-[300px]"> {/* Reducida altura */}
                                                    <Image
                                                        src={event.file}
                                                        alt={event.title}
                                                        layout="fill"
                                                        className="object-cover"
                                                        priority={index === 0}
                                                    />
                                                </div>
                                            )}
                                            <div className="p-6">
                                                <div className="space-y-4 mb-8"> {/* Aumentado a mb-8 */}
                                                    <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
                                                        {event.title}
                                                    </h3>
                                                    {event.description && (
                                                        <p className="text-gray-600 line-clamp-2">
                                                            {event.description}
                                                        </p>
                                                    )}
                                                    <div className="space-y-2">
                                                        <div className="flex items-center text-gray-500">
                                                            <Calendar className="w-4 h-4 mr-2" />
                                                            <span className="text-sm">
                                                                {event.date}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center text-gray-500">
                                                            <MapPin className="w-4 h-4 mr-2" />
                                                            <span className="text-sm">{event.location}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Contenedor separado para el botón */}
                                                <div className="relative mb-4">
                                                    <Button
                                                        className="w-full h-10 rounded-full bg-verde-goodkidz hover:bg-verde-goodkidz/90 
                                                        text-white shadow-md hover:shadow-lg 
                                                        transition-all duration-300 hover:scale-[1.02]"
                                                        onClick={() => {
                                                            window.location.href = event.link;
                                                        }}
                                                    >
                                                        Conoce más
                                                    </Button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}