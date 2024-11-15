// src/components/HomeSection.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import eventImage from '@/public/homeImage.jpg';
import categorias from '@/public/categorias.png';

export default function HomeSection({ setActiveSection }: { setActiveSection: (section: string) => void }) {
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
        <section className="relative flex flex-col items-center justify-between px-4 md:px-10 bg-white pb-24">
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
                    <div className="flex flex-row items-start mt-9">
                        <div className="hidden md:block">
                            <Image
                                src={categorias}
                                alt="Imagen de categorías"
                                width={180}
                                height={180}
                                className="mr-4 mb-4 md:mb-0"
                            />
                        </div>

                        <p className="text-md md:text-lg sm:text-sm text-gray-600 max-w-lg md:max-w-md lg:text-justify sm:text-start">
                            ¿Cómo te imaginas un planeta verde y sostenible, lleno de esperanza y con infinitas posibilidades de vida para todxs?
                            Comparte tu visión a través de tu obra y participa en la exposición
                            <span className="font-bold"> Encuentro Arte y Vida | PLANETA VERDE </span> durante el mes de diciembre de 2024.
                        </p>
                    </div>
                    <div className="flex justify-center items-center sm:hidden">
                        <Image
                            src={categorias}
                            alt="Imagen de categorías"
                            width={180}
                            height={180}
                            className="mr-4 mb-4 md:mb-0"
                        />
                    </div>
                    <div className="mt-10 p-4 w-full md:w-max text-center">
                        <button
                            className="bg-verde-goodkidz font-bold text-white text-2xl border-4 border-white px-10 py-4 rounded-xl 
                                        hover:bg-white hover:text-verde-goodkidz hover:border-verde-goodkidz hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-110"
                            onClick={() => setActiveSection('registrate')}
                        >
                            ¡Regístrate para participar!
                        </button>
                    </div>
                </div>

                {/* Imagen del evento en la parte derecha */}
                <div className="w-full md:w-[40%] lg:w-[50%]">
                    <Image
                        src={eventImage}
                        alt="Encuentro Arte y Vida"
                        width={920}
                        height={759}
                        className="rounded-lg object-cover w-full"
                    />
                </div>
            </div>

            {/* Video de YouTube centrado, arriba del contador */}
            <div className="w-full flex justify-center mt-12">
                <iframe
                    className="w-full max-w-4xl h-[500px] rounded-lg shadow-lg"
                    src="https://www.youtube.com/embed/AYZ0FBqN7h4"
                    title="Video de YouTube - Encuentro Arte y Vida"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading='lazy'
                    referrerPolicy="no-referrer-when-downgrade"
                    sandbox="allow-scripts allow-same-origin allow-presentation"
                ></iframe>
            </div>

            {/* Contador en la parte inferior, centrado */}
            {timeLeft && (
                <div className="w-full flex justify-center mt-8">
                    <div className="text-verde-goodkidz text-2xl font-semibold py-2 px-6 rounded-lg shadow-lg text-center">
                        <p className="text-lg mb-1">Tiempo límite para subir tu obra:</p>
                        <div>{timeLeft}</div>
                    </div>
                </div>
            )}
        </section>
    );
}
