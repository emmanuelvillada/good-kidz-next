import Image from 'next/image';
import image from '@/public/hero.png';
export default function GoodKidzHero() {
    return (
        <section className="w-full bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Contenido de texto */}
                    <div className="space-y-6 sm:space-y-8">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                            <span className="text-verde-goodkidz">FUNDACIÓN</span>
                            <br className="hidden sm:block" />
                            <span className="text-verde-goodkidz">GOOD KIDZ</span>
                        </h1>

                        <div className="w-80  h-1 bg-verde-goodkidz"></div>

                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                            En la Fundación GOOD KIDZ creemos en la magia de lo sencillo: un
                            pincel, una canción, un juego compartido. Desde ahí nace la fuerza
                            para transformar realidades, abrazar la diversidad e imaginar un
                            futuro donde la esperanza, la equidad y el cuidado mutuo se
                            entrejejen en nuestro planeta verde.
                        </p>
                    </div>

                    {/* Área de imagen (placeholder para la foto grupal) */}
                    <div className="relative h-96 sm:h-[500px] lg:h-[600px]">
                        {/* Formas decorativas de fondo */}
                        <div className="absolute bottom-0 left-0 w-32 sm:w-48 h-32 sm:h-48 bg-verde-goodkidz rounded-full opacity-20 -z-10"></div>
                        <div className="absolute bottom-12 right-0 w-24 sm:w-40 h-24 sm:h-40 bg-verde-goodkidz rounded-full opacity-20 -z-10"></div>

                        {/* En producción, reemplazar con Image component de Next.js */}
                        <div className="absolute bottom-0 right-0 w-full h-4/5  rounded-lg flex items-center justify-center text-gray-400">
                            <Image
                                src={image}
                                alt="Fundación Good Kidz"
                                width={1000}
                                height={1500}
                                className="object-cover rounded-lg shadow-lg position-fixed top-36"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}