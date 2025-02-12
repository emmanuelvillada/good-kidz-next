'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/Slider'


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Event {
    title: string;
    description: string;
    image: string;
    date: string;
    location: string;
}

const events: Event[] = [
    {
        title: "1er Evento Arte y Vida",
        description: "Más de 100 personas presentaron sus obras de arte",
        image: "",
        date: "septiembre 2024",
        location: "Medellín, Colombia"
    },
    {
        title: "Entrega de Utiles Escolares",
        description: "Donación de útiles escolares a niños de bajos recursos",
        image: "",
        date: "Enero 2025",
        location: "Medellín, Colombia"
    },
    {
        title: "Siembra Colectiva",
        description: "2da siembra en colaboración con Casa Madre Raíz",
        image: "",
        date: "Febrero 2025",
        location: "Medellín, Colombia"
    },
]


export default function EventCarousel() {
    return (
        <section className="py-16 bg-transparent relative">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Nuestros Eventos
                    </h2>
                    <div className="w-24 h-1 bg-verde-goodkidz mx-auto mb-6"></div>
                </motion.div>

                <Slider>
                    {events.map((event, index) => (
                        <div key={index} className="px-4 md:px-6 lg:px-8">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="h-full max-w-4xl mx-auto"
                            >
                                <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300">
                                    <CardContent className="p-0">
                                        <div className="relative aspect-[16/9]">
                                            <Image
                                                src={event.image || "/placeholder.svg"}
                                                alt={event.title}
                                                fill
                                                className="object-cover rounded-t-xl"
                                                priority={index === 0}
                                            />
                                            {event.date && (
                                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                                                    <p className="text-sm font-medium text-gray-800">{event.date}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-8">
                                            <h3 className="text-2xl font-bold text-gray-800 mb-3">{event.title}</h3>
                                            <p className="text-gray-600 mb-4">{event.description}</p>
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

