'use client'
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function About() {
    const [numbers, setNumbers] = useState({
        kids: 0,
        programs: 0,
        volunteers: 0,
        schools: 0
    });

    useEffect(() => {
        const targetNumbers = { kids: 1300, programs: 50, volunteers: 100, schools: 20 };
        const duration = 2000; // 2 segundos
        const steps = 50; // Cantidad de actualizaciones
        const intervalTime = duration / steps;

        let count = 0;
        const interval = setInterval(() => {
            setNumbers({
                kids: Math.floor(Math.random() * targetNumbers.kids),
                programs: Math.floor(Math.random() * targetNumbers.programs),
                volunteers: Math.floor(Math.random() * targetNumbers.volunteers),
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
        <section id="about" className="py-20 bg-white ">
            <div className="container mx-auto items-center px-6">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Sobre Good Kidz</h2>
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                    <div className="w-full md:w-1/2 p-6">
                        <h3 className="text-2xl font-bold text-blue-600 mb-4">Nuestra Misión</h3>
                        <p className="text-gray-600 mb-4">
                            En Good Kidz, nos dedicamos a contribuir a la sociedad a través del arte, la educación y la cultura.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 p-6">
                        <h3 className="text-2xl font-bold text-green-600 mb-4">Nuestro Impacto</h3>
                        <ul className="list-disc list-inside text-gray-600">
                            <li>
                                <motion.span className="text-3xl font-bold text-black">{numbers.kids}+</motion.span> niños beneficiados
                            </li>
                            <li>
                                <motion.span className="text-3xl font-bold text-black">{numbers.programs}+</motion.span> programas educativos implementados
                            </li>
                            <li>
                                <motion.span className="text-3xl font-bold text-black">{numbers.volunteers}+</motion.span> voluntarios activos
                            </li>
                            <li>
                                <motion.span className="text-3xl font-bold text-black">{numbers.schools}+</motion.span> colaboraciones
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
