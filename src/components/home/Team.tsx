import Image from 'next/image';
import image from '@/public/equipo.webp';
export default function GoodKidzHero() {
    return (
        <section className="w-full bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Contenido de texto */}
                    <div className="space-y-6 sm:space-y-8 z-10">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                            <span className="text-verde-goodkidz">EQUIPO</span>
                            <br className="hidden sm:block" />
                            <span className="text-verde-goodkidz">DE TRABAJO</span>
                        </h1>

                        <div className="w-80  h-1 bg-verde-goodkidz"></div>

                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                            En GOOD KIDZ  sabemos que las iniciativas florecen  gracias a las personas.
                            Nuestro equipo diverso y sensible es la energía que inspira, crea y sostiene
                            cada proyecto.
                        </p>
                    </div>

                    {/* Área de imagen (placeholder para la foto grupal) */}
                    <div className="relative h-96 sm:h-[500px] lg:h-[600px]">
                        <div className="absolute bottom-[-200px] left-[-340px] w-[1200px] h-4/5  rounded-lg flex items-center justify-center text-gray-400">
                            <Image
                                src={image}
                                alt="Fundación Good Kidz"
                                width={1000}
                                height={1500}
                                className="object-cover rounded-lg shadow-lg "
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}