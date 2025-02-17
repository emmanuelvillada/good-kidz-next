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
            {/* Video de fondo desde YouTube */}
            <div className="absolute top-2 left-0 w-full h-full overflow-hidden">

                {/* Dependiendo del tipo de dispositivo se muestra el video en desktop o en mobile */}

                <iframe
                    className="w-full h-full absolute top-0 left-0 hidden md:block"
                    src="https://player.vimeo.com/video/1057358811?h=773a7f19b4&amp;badge=0&amp;autopause=0&amp;autoplay=1&muted=1&loop=1&background=1&controls=0;player_id=0&amp;app_id=58479"
                    allow="autoplay; 
            fullscreen; picture-in-picture; clipboard-write; encrypted-media"  title="Fundacion-GoodKidz"
                >
                </iframe>
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
