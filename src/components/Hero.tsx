'use client';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Events from './Events';

export default function Hero() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-blue-600 to-green-400 text-white min-h-screen flex flex-col items-center justify-center"
        >
            <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center py-20 md:py-32 lg:py-20 lg:pt-32">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    Construyendo un <br className="hidden sm:block" />
                    Futuro Brillante
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                    Descubre nuestras actividades y únete a nuestra misión de transformar vidas
                </p>
                <Button className="bg-yellow-400 text-black text-lg md:text-xl px-8 py-6 hover:bg-yellow-500 transform hover:scale-105 transition-all duration-300">
                    ¡Únete a Nosotros!
                </Button>
            </div>
            <Events />
        </motion.div>
    );
}