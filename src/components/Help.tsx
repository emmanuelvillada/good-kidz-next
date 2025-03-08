'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import APORTES from '@/public/APORTES.png';
import DONACIONES from '@/public/DONACIONES.png';
import COLABORACIONES from '@/public/COLABORACIONES.png';
import VOLUNTARIADO from '@/public/VOLUNTARIADO.png';

const helpOptions = [
    {
        title: "Donaciones",
        description: "Con aportes monetarios que apoyarán nuestros proyectos y ayudarán a más niños.",
        icon: DONACIONES,
        color: "text-pink-500",
        action: "Donar ahora"
    },
    {
        title: "Aportes en especie",
        description: "Equipos, materiales y elementos que nos ayuden a impulsar la comunidad.",
        icon: APORTES,
        color: "text-purple-500",
        action: "Ver necesidades"
    },
    {
        title: "Colaboraciones",
        description: "Comparte tu conocimiento en charlas y networking con nuestra comunidad.",
        icon: COLABORACIONES,
        color: "text-blue-500",
        action: "Ser mentor"
    },
    {
        title: "Voluntariado",
        description: "Únete a nuestras actividades, talleres, charlas y eventos como voluntario.",
        icon: VOLUNTARIADO,
        color: "text-verde-goodkidz",
        action: "Inscribirme"
    }
];

export default function Help() {
    return (
        <section className="py-20 bg-gray-50" id="help">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        ¿Cómo puedes ayudar?
                    </h2>
                    <div className="bg-verde-goodkidz w-24 h-1 mx-auto mb-6"></div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Hay muchas formas de ser parte del cambio y ayudar a transformar vidas
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 ">
                    {helpOptions.map((option, index) => (
                        <motion.div
                            key={option.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                                <div className={`${option.color} mb-6`}>
                                    <Image src={option.icon.src} alt={option.title + " icon"} width={48} height={48} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">
                                    {option.title}
                                </h3>
                                <p className="text-gray-600 mb-6 ">
                                    {option.description}
                                </p>
                                <Button
                                    className="w-full bg-verde-goodkidz hover:bg-verde-goodkidz/90 text-white"
                                    variant="default"
                                >
                                    {option.action}
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center mt-16"
                >
                    <p className="text-gray-600 mb-6">
                        ¿Tienes otra forma de ayudar? ¡Nos encantaría escucharte!
                    </p>
                    <Button
                        className="bg-white text-verde-goodkidz border-2 border-verde-goodkidz 
                                 hover:bg-verde-goodkidz hover:text-white transition-colors duration-300"
                        variant="outline"
                    >
                        Contactarnos
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}