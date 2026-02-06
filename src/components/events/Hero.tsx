'use client'

import { motion } from "framer-motion";
import EventsCard from "./EventsCard";
import { Sparkles } from "lucide-react";

export default function EventsHero() {
    const eventosPermanentes = [
        {
            title: "Arte y vida",
            description: "Convocamos para celebrar la vida y honrar la tierra a través del arte, desde las diferentes visiones y técnicas de artistas, con experiencia o sin experiencia y de todas las edades.",
            imageUrl: "placeholder.svg",
            isPermanent: true,
            category: "arte-vida" as const,
        },
        {
            title: "Arte y siembra",
            description: "Un espacio para sembrar y cosechar en colectivo, aprender sobre los alimentos y las plantas, siempre transversalizado por el arte, la juntanza, el trabajo en equipo y el cuidado del medio ambiente.",
            imageUrl: "/eventos/siembra-comunitaria.jpg",
            isPermanent: true,
            category: "arte-siembra" as const,
        },
        {
            title: "Festival de Microcuento Infantil Ilustrado",
            description: "Una fiesta para reconocer los relatos cortos que construyen las infancias, con temas relacionados al planeta verde y su cuidado, sustentados con ilustraciones que invitan a pensar en palabras e imágenes.",
            imageUrl: "/eventos/festival-microcuento.jpg",
            isPermanent: true,
            category: "Festival de Microcuento Infantil Ilustrado" as const,
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
            }
        }
    };

    return (
        <section className="w-full py-20 md:py-28 bg-gradient-to-b from-gray-50 via-white to-gray-50/50 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-verde-goodkidz/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-verde-goodkidz/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

            {/* Floating icons decoration */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-20 right-10 text-verde-goodkidz/10 hidden lg:block"
            >
                <Sparkles className="w-16 h-16" />
            </motion.div>

            <motion.div
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, -5, 0]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="absolute bottom-32 left-10 text-verde-goodkidz/10 hidden lg:block"
            >
            </motion.div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 md:mb-20"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="inline-block mb-4"
                    >
                        <div className="flex items-center justify-center gap-3 px-6 py-2 bg-verde-goodkidz/10 rounded-full border border-verde-goodkidz/20">
                            <Sparkles className="w-5 h-5 text-verde-goodkidz" />
                            <span className="text-sm font-semibold text-verde-goodkidz uppercase tracking-wider">
                                Proyectos Permanentes
                            </span>
                        </div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-verde-goodkidz mb-6"
                    >
                        NUESTROS PROYECTOS
                    </motion.h2>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="w-24 h-1.5 bg-gradient-to-r from-transparent via-verde-goodkidz to-transparent mx-auto mb-8 rounded-full"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                    >
                        Descubre nuestros <span className="text-verde-goodkidz font-semibold">proyectos</span> artísticos, recreativos y lúdicos{" "}

                    </motion.p>
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto"
                >
                    {eventosPermanentes.map((event, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="relative group"
                        >
                            {/* Decorative corner accent */}
                            <div className="absolute -top-3 -left-3 w-24 h-24 bg-verde-goodkidz/5 rounded-full blur-2xl group-hover:bg-verde-goodkidz/10 transition-colors duration-500 -z-10"></div>
                            <div className="absolute -bottom-3 -right-3 w-32 h-32 bg-verde-goodkidz/5 rounded-full blur-2xl group-hover:bg-verde-goodkidz/10 transition-colors duration-500 -z-10"></div>

                            <EventsCard
                                title={event.title}
                                description={event.description}
                                imageUrl={event.imageUrl}
                                isPermanent={event.isPermanent}
                                category={event.category}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA or Info Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mt-16 md:mt-20"
                >
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-verde-goodkidz/5 to-verde-goodkidz/10 rounded-full border border-verde-goodkidz/20">
                        <p className="text-sm md:text-base font-medium text-gray-700">
                            Iniciativas que se renuevan cada año para crear un impacto duradero
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}