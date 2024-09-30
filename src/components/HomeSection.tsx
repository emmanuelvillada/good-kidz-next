// src/components/HomeSection.tsx
'use client';

import Image from 'next/image';
import eventImage from '@/public/homeImage.jpg';
import categorias from '@/public/categorias.png';

export default function HomeSection({ setActiveSection }: { setActiveSection: (section: string) => void }) {
    return (
        <section className="flex flex-col md:flex-row items-start justify-between py-12 pl-10 pr-4 bg-white min-h-screen">
            {/* Contenido textual en la parte izquierda */}
            <div className="md:w-[60%] lg:w-[50%]">
                <h1 className="text-5xl md:text-7xl font-bold text-green-500 leading-tight">
                    <span className="text-7xl">1</span><span className="align-top text-4xl underline">er</span> Encuentro <br /> Arte y Vida
                </h1>
                <h2 className="text-3xl text-green-300 mt-4">PLANETA VERDE</h2>

                {/* Imagen de categorías y texto alineado */}
                <div className="flex items-start mt-6">
                    <Image
                        src={categorias}
                        alt="Imagen de categorías"
                        width={242}
                        height={242}
                        className="mr-4"
                    />
                    <p className="text-lg text-gray-600">
                        ¿Cómo te imaginas un planeta verde y sostenible, lleno de esperanza y con infinitas posibilidades de vida para todxs?
                        Comparte tu visión a través de tu obra y participa en la exposición
                        <span className="font-bold"> Encuentro Arte y Vida | PLANETA VERDE </span> durante el mes de diciembre de 2024.
                    </p>
                </div>

                <div className="mt-8 p-4 w-max text-center">
                    <button
                        className="font-bold text-green-500 border-2 border-green-500 px-6 py-3 rounded-lg 
               hover:bg-green-500 hover:text-white hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                        onClick={() => setActiveSection('registrate')}
                    >
                        ¡Regístrate para participar!
                    </button>
                </div>

            </div>

            {/* Imagen del evento en la parte derecha */}
            <div className="mt-8 md:mt-0 md:w-[40%] lg:w-[50%]">
                <Image
                    src={eventImage}
                    alt="Encuentro Arte y Vida"
                    width={920}
                    height={759}
                    className="rounded-lg object-contain"
                />
            </div>
        </section>
    );
}
