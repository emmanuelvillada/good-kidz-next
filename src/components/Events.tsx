'use client'

import { motion } from 'framer-motion'

import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/Slider'
import FotoSiembra from '@/public/events/Siembra1.jpg'
import FotoTaller from '@/public/events/Talleres.jpg'
import ImageWithLoader from './ui/ImageWithLoader'
import Arteyvida from '@/public/events/Arte.jpeg'
import siembra2 from '@/public/events/siembra2.jpg'
import { StaticImageData } from 'next/image'

interface Event {
    title: string;
    description: string;
    image: StaticImageData;
    date: string;
    location: string;
}

const events: Event[] = [
    {
        title: "1ra Siembra Fundación Casa Raíz",
        description: "Siembra de árboles en colaboración con Casa Madre Raíz",
        image: FotoSiembra,
        date: "junio 2024",
        location: "Medellín, Colombia"
    },
    {
        title: "Talleres de Sensibilización",
        description: "Evento ejecutado en el Instituto Tecnológico Metropolitano",
        image: FotoTaller,
        date: "julio 2024",
        location: "Medellín, Colombia"
    },
    {
        title: "1er Evento Arte y Vida",
        description: "Más de 100 personas presentaron sus obras de arte",
        image: Arteyvida,
        date: "septiembre 2024",
        location: "Medellín, Colombia"
    },
    {
        title: "Entrega de Utiles Escolares",
        description: "Donación de útiles escolares a niños de bajos recursos",
        image: FotoSiembra,
        date: "Enero 2025",
        location: "Medellín, Colombia"
    },
    {
        title: "2da Siembra Fundación Casa Raíz",
        description: "2da siembra en colaboración con Casa Madre Raíz",
        image: siembra2,
        date: "Febrero 2025",
        location: "Medellín, Colombia"
    },
]


export default function EventCarousel() {
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
                                className="h-full"
                            >
                                <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                                    <CardContent className="p-0 flex flex-col h-full">
                                        <div className="relative h-[200px] md:h-[400px]">
                                            <ImageWithLoader
                                                src={event.image || "/placeholder.svg"}
                                                alt={event.title}

                                            />
                                            {event.date && (
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

