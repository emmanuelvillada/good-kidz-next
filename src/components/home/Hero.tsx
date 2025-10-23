import Image from 'next/image';
import image from '@/public/hero.png';
export default function GoodKidzHero() {
    return (
        <section className="w-full bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Contenido de texto */}
                    <div className="space-y-6 sm:space-y-8 z-10">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                            <span className="text-verde-goodkidz">FUNDACIÓN</span>
                            <br className="" />
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
                        <div className="absolute 
                    bottom-[-60px] sm:bottom-[-120px] md:bottom-[-120px] lg:bottom-[-120px]
                    left-0 sm:left-[-150px] md:left-[-200px] lg:left-[-240px]
                    w-full sm:w-[700px] md:w-[800px] lg:w-[1000px]
                    h-4/5 rounded-lg flex items-center justify-center text-gray-400 ">
                            <Image
                                src={image}
                                alt="Fundación Good Kidz"
                                width={1000}
                                height={1500}
                                className="object-cover w-full h-full rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}