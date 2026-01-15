"use client";
import { motion } from "framer-motion";
import { Heart, Users, Lightbulb, Leaf } from 'lucide-react';

const values = [
    {
        icon: Heart,
        title: "Educación Artística",
        description: "Desarrollamos <span className=\"font-semibold\">habilidades creativas y expresivas</span> a través de las artes.",
    },
    {
        icon: Users,
        title: "Inclusión Social",
        description: "Creamos <span className=\"font-semibold\">espacios seguros y acogedores</span> para todos, sin distinción.",
    },
    {
        icon: Lightbulb,
        title: "Innovación",
        description: "Buscamos <span className=\"font-semibold\">nuevas formas de impactar</span> positivamente la sociedad.",
    },
    {
        icon: Leaf,
        title: "Sostenibilidad",
        description: "Comprometidos con <span className=\"font-semibold\">el cuidado del planeta</span> y nuestras comunidades.",
    },
];

export default function Values() {
    return (
        <section
            id="values"
            className="w-full bg-gradient-to-b from-white via-[#F9FFFB] to-white overflow-hidden py-10 "
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Título */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-verde-goodkidz mb-4">
                        Nuestros{" "}
                        <span className="text-verde-goodkidz">Valores</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-verde-goodkidz to-verde-goodkidz/50 rounded-full mx-auto"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto mt-6 text-base sm:text-lg leading-relaxed font-light">
                        En GOOD KIDZ creemos en <span className="font-semibold">los valores</span> que inspiran, fortalecen y transforman
                        nuestras acciones para construir un <span className="font-semibold">futuro más consciente y solidario</span>.
                    </p>
                </motion.div>

                {/* Cuadros de valores */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => {
                        const Icon = value.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                whileHover={{ y: -6, scale: 1.02 }}
                                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all"
                            >
                                <div className="w-14 h-14 bg-verde-goodkidz/10 rounded-xl flex items-center justify-center mb-5">
                                    <Icon className="text-verde-goodkidz" size={28} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">
                                    {value.title}
                                </h3>
                                <p
                                    className="text-gray-600 text-sm leading-relaxed font-light"
                                    dangerouslySetInnerHTML={{ __html: value.description }}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
