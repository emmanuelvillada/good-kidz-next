// src/components/HomeSection.tsx
'use client';

import Image from 'next/image';
import eventImage from '@/public/homeImage.jpg';

export default function HomeSection({ }: { setActiveSection: (section: string) => void }) {


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
                    <div className="flex items-center">
                        <h2 className="text-3xl md:text-5xl text-white bg-verde-goodkidz px-2 py-1 text-left md:text-left sm:text-left">PLANETA VERDE</h2>
                        <span className="text-3xl md:text-5xl text-green-300 ml-4 text-left md:text-left sm:text-left">MED</span>
                    </div>                </div>

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
            <div className="flex flex-col items-center justify-between bg-verde-goodkidz px-4 md:px-10 py-4 text-white">
                <h1 className="text-2xl md:text-4xl font-bold leading-tight">
                    Visita la exposición hasta el 13 de diciembre<br />
                    en el ITM Fraternidad y el Claustro Comfama
                </h1>
                <h1 className="text-2xl md:text-4xl font-bold bg-black px-4 py-2 rounded-lg">
                    ¡Te esperamos!
                </h1>
            </div>


        </section>
    );
}
