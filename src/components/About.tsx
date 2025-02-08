'use client'
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function About() {
    const [numbers, setNumbers] = useState({
        kids: 0,
        programs: 0,
        projects: 0,
        schools: 0
    });

    useEffect(() => {
        // Generar números aleatorios para las estadísticas
        const targetNumbers = { kids: 1300, programs: 50, projects: 100, schools: 20 };
        const duration = 2000; // 2 segundos
        const steps = 50; // Cantidad de actualizaciones
        const intervalTime = duration / steps;

        let count = 0;
        const interval = setInterval(() => {
            setNumbers({
                kids: Math.floor(Math.random() * targetNumbers.kids),
                programs: Math.floor(Math.random() * targetNumbers.programs),
                projects: Math.floor(Math.random() * targetNumbers.projects),
                schools: Math.floor(Math.random() * targetNumbers.schools)
            });
            count++;
            if (count >= steps) {
                clearInterval(interval);
                setNumbers(targetNumbers);
            }
        }, intervalTime);
    }, []);

    return (
        <section id="about" className="py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-6 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Sobre Good Kidz
                    </h2>
                    <div className="w-24 h-1 bg-green-500 mx-auto mb-8"></div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Transformando vidas a través del arte, la educación y la cultura desde 2020
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        <h3 className="text-3xl font-bold text-blue-600">Nuestra Misión</h3>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            En Good Kidz, nos dedicamos a empoderar a la próxima generación a través de programas innovadores que combinan arte, educación y desarrollo personal.
                        </p>
                        <div className="space-y-4">
                            {['Educación Artística', 'Desarrollo Personal', 'Inclusión Social', 'Innovación Educativa'].map((value, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-700">{value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-8 rounded-2xl shadow-xl"
                    >
                        <h3 className="text-3xl font-bold text-green-600 mb-8">Nuestro Impacto</h3>
                        <div className="grid grid-cols-2 gap-8">
                            {[
                                { label: 'Niños Beneficiados', value: numbers.kids },
                                { label: 'Programas Educativos', value: numbers.programs },
                                { label: 'Proyectos Ejecutados', value: numbers.projects },
                                { label: 'Colaboraciones', value: numbers.schools }
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="text-center"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <motion.p className="text-4xl font-bold text-gray-800 mb-2">
                                        {stat.value}+
                                    </motion.p>
                                    <p className="text-sm text-gray-600">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">¿Quieres ser parte del cambio?</h3>
                    <button className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors duration-300">
                        Únete como voluntario
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
