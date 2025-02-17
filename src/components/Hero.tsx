'use client';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useState } from 'react';
import SuscribeForm from './form/SuscribeForm';

export default function Hero() {
    const [isModalOpen, setIsModalOpen] = useState(false);


    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen flex flex-col items-center justify-center text-white "
        >
            <div className="absolute top-0 left-0 w-full h-screen md:aspect-[16/9] overflow-hidden">
                <video
                    className="w-full h-full absolute top-0 left-0 object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="https://asisdninqgnkereutwxt.supabase.co/storage/v1/object/public/events//Fondo-goodkidz%20(1).mp4" type="video/mp4" />
                    Tu navegador no soporta videos.
                </video>
            </div>

            {/* Contenido */}
            <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 text-center py-20 md:py-32 lg:py-20 lg:pt-32">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    Construyendo un <br className="hidden sm:block" />
                    Futuro Brillante
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                    Descubre nuestras actividades y únete a nuestra misión de transformar vidas
                </p>
                <Button
                    className="bg-yellow-400 text-black text-lg md:text-xl px-8 py-6 hover:bg-yellow-500 transform hover:scale-105 transition-all duration-300"
                    onClick={() => setIsModalOpen(true)}
                >
                    ¡Únete a Nosotros!
                </Button>
            </div>


            <SuscribeForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </motion.div>
    );
}
