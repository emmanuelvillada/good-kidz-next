// src/components/HomeSection.tsx
'use client';

import Image from 'next/image';
import eventImage from '@/public/homeImage.jpg';
import categorias from '@/public/categorias.png';

export default function HomeSection({ setActiveSection }: { setActiveSection: (section: string) => void }) {
    return (
        <section className="flex flex-col md:flex-row items-start justify-between px-4 md:px-10 bg-white pb-24">
            {/* Contenido textual en la parte izquierda */}
            <div className="w-full md:w-[60%] lg:w-[50%]  md:mb-0">
                {/* Contenedor del título y subtítulo */}
                <h1 className="text-5xl md:text-8xl font-bold text-verde-goodkidz leading-tight text-left md:text-left sm:text-left">
                    <span className="text-8xl text-start">1</span>
                    <span className="align-top text-4xl underline">er</span> <br /> Encuentro <br /> Arte y Vida
                </h1>
                <h2 className="text-3xl md:text-5xl text-green-300 my-6 text-left md:text-left sm:text-left">PLANETA VERDE</h2>


                {/* Imagen de categorías y texto alineado */}
                <div className="flex flex-row items-start mt-9"> {/* Cambié a flex-row para alinear horizontalmente */}
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
                <div className="mt-16 p-4 w-full md:w-max text-center">
                    <button
                        className="font-bold text-verde-goodkidz border-2 border-verde-goodkidz px-6 py-3 rounded-lg 
               hover:bg-verde-goodkidz hover:text-white hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
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
        </section>

    );
}
