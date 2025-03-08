'use client'
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const contributors = [
    {
        id: 1,
        name: "Patrocinador 1",
        image: "/patrocinadores/1.jpg",
        description: "Apoyo en proyectos educativos"
    },
    {
        id: 2,
        name: "Patrocinador 2",
        image: "/patrocinadores/2.jpg",
        description: "Materiales artísticos"
    },
    {
        id: 3,
        name: "Patrocinador 3",
        image: "/patrocinadores/3.jpg",
        description: "Espacios culturales"
    },
    // Agrega más patrocinadores aquí
];

export default function Contributors() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === contributors.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Cambia cada 3 segundos

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Nuestros Colaboradores
                    </h2>
                    <div className="w-24 h-1 bg-verde-goodkidz mx-auto mb-6"></div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Agradecemos a quienes hacen posible nuestra misión
                    </p>
                </motion.div>

                <div className="relative overflow-hidden max-w-5xl mx-auto">
                    <div className="flex justify-center items-center">
                        {contributors.map((contributor, index) => (
                            <motion.div
                                key={contributor.id}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{
                                    opacity: index === currentIndex ? 1 : 0.3,
                                    x: 0,
                                    scale: index === currentIndex ? 1 : 0.8
                                }}
                                transition={{ duration: 0.5 }}
                                className="mx-4"
                            >
                                <div className="relative group">
                                    <Image
                                        src={contributor.image}
                                        alt={contributor.name}
                                        width={200}
                                        height={200}
                                        className="rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <motion.div
                                        className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                    >
                                        <div className="flex flex-col justify-center items-center h-full text-white p-4">
                                            <h3 className="text-xl font-bold mb-2">{contributor.name}</h3>
                                            <p className="text-sm">{contributor.description}</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-8 gap-2">
                        {contributors.map((_, index) => (
                            <Button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === currentIndex ? 'bg-verde-goodkidz' : 'bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}