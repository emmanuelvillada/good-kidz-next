// src/components/HomeSection.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import eventImage from '@/public/homeImage.jpg';
import { motion } from 'framer-motion';
export default function HomeSection() {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        // Fecha límite: 22 de noviembre de 2024
        const deadline = new Date('2024-11-22T23:59:59');

        const updateCountdown = () => {
            const now = new Date();
            const difference = deadline.getTime() - now.getTime();

            if (difference <= 0) {
                setTimeLeft('¡El tiempo ha expirado!');
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / (1000 * 60)) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            }
        };

        // Actualiza el contador cada segundo
        const intervalId = setInterval(updateCountdown, 1000);

        // Limpia el intervalo al desmontar el componente
        return () => clearInterval(intervalId);
    }, []);

    return (
        <section className="relative flex flex-col items-center justify-between px-4 md:px-10 bg-white pb-24 mt-3 pt-32">
            {/* Contenido principal en el centro */}
            <div className="flex flex-col md:flex-row w-full items-start justify-between">
                {/* Contenido textual en la parte izquierda */}
                <div className="w-full md:w-[60%] lg:w-[50%] md:mb-0">
                    <h1 className="text-5xl md:text-8xl font-bold text-verde-goodkidz leading-tight text-left md:text-left sm:text-left">
                        <span className="text-8xl text-start">1</span>
                        <span className="align-top text-4xl underline">er</span> <br /> Encuentro <br /> Arte y Vida
                    </h1>
                    <h2 className="text-3xl md:text-5xl text-green-300 my-6 text-left md:text-left sm:text-left">PLANETA VERDE</h2>

                    {/* Imagen de categorías y texto alineado */}
                    <div className="flex flex-col items-start mt-9 px-4">
                        <div className="w-full max-w-2xl">
                            <p className="text-base md:text-lg text-gray-700 leading-relaxed text-justify">
                                <span className="font-bold text-xl block mb-4">¡Artistas!</span>

                                Les ofrecemos disculpas por la tardanza en publicar lxs autorxs de las obras seleccionadas para la exposición &quot;Encuentro Arte y Vida&quot; <span className="font-bold">¡pero por suerte la convocatoria fue un éxito y recibimos muchas más obras de las que esperábamos!</span> Así que era importante tomarnos el tiempo para revisarlas a detalle. <br /> <br />

                                Esta respuesta positiva de <b>nuestros Good Kidz</b> nos confirma que debemos seguir trabajando de manera consistente para extender este tipo de eventos y que cada vez más personas alrededor del mundo sueñen con <b> habitar un Planeta Verde.</b> <br /> <br />

                                Nos honra que nuestra primera convocatoria haya tenido tan buena acogida, les agradecemos a todxs la <b>masiva participación,</b> además de haber compartido y apoyado la actividad. <br /> <br />

                                Para la selección contamos con <b> 3 jurados externos</b> a la fundación, expertos en el campo de las artes y la gestión cultural, quienes evaluaron minuciosamente las piezas recibidas verificando que cumplieran con los términos y condiciones de la convocatoria. <br /> <br />

                                La exposición &quot;Encuentro Arte y Vida&quot; estará abierta al público en la ciudad de Medellín (Colombia) del 3 al 13 de diciembre, en el Claustro Comfama y el ITM en su sede Fraternidad. <br /> <br />

                                <span className="font-bold block mt-4">¡Muchas felicidades a lxs seleccionadxs!</span>

                                Les recomendamos estar muy atentxs a sus correos pues les estaremos compartiendo más información.
                            </p>
                            <a href="https://drive.google.com/file/d/19nIf3FfhM3zK8PmUel_9WsLqrZSA8Qwz/view?usp=drivesdk" target="_blank" rel="noopener noreferrer" className='text-verde-goodkidz underline text-xl'>Listado de Obras Seleccionadas</a>
                        </div>


                    </div>

                </div>
                {/* Imagen del evento con animación */}
                <motion.div
                    className="w-full md:w-[40%] lg:w-[50%] hover:scale-105 transition-transform duration-300"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Image
                        src={eventImage}
                        alt="Encuentro Arte y Vida"
                        width={920}
                        height={759}
                        className="rounded-2xl object-cover w-full shadow-xl hover:shadow-2xl transition-shadow duration-300"
                    />
                </motion.div>
            </div>

            {/* Video de YouTube mejorado */}
            <motion.div
                className="w-full flex justify-center mt-16 px-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/AYZ0FBqN7h4"
                        title="Video de YouTube - Encuentro Arte y Vida"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading='lazy'
                        referrerPolicy="no-referrer-when-downgrade"
                        sandbox="allow-scripts allow-same-origin allow-presentation"
                    ></iframe>
                </div>
            </motion.div>


            {
                timeLeft && (
                    <motion.div
                        className="w-full flex justify-center mt-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="bg-gradient-to-r from-verde-goodkidz/90 to-verde-goodkidz text-white p-8 rounded-2xl shadow-2xl backdrop-blur-sm">
                            <p className="text-xl font-medium mb-4">Tiempo límite para subir tu obra</p>
                            <div className="text-3xl font-bold tracking-wider">{timeLeft}</div>
                        </div>
                    </motion.div>
                )
            }
        </section >
    );
}