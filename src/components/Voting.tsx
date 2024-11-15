import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from "@/lib/supabase";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

export default function Voting() {
    interface Art {
        id: number;
        title: string;
        description: string;
        image: string;
        technique: string;
        categoria: string;

    }

    const [Arts, setArts] = useState<Art[]>([]);

    useEffect(() => {
        const fetchArts = async () => {
            const { data, error } = await supabase.from('users').select('*');

            if (error) {
                console.log('Error fetching users:', error);
                return;
            }

            if (!data) {
                console.log('No data found');
                return;
            }

            const artsWithImages = await Promise.all(data.map(async (art) => {
                const filePath = art.obra_url.startsWith('public/uploads/')
                    ? art.obra_url
                    : `public/uploads/${art.obra_url}`;

                const { data: publicUrlData } = supabase
                    .storage
                    .from('obras') // Bucket correcto
                    .getPublicUrl(filePath);

                // Verifica si `data` existe
                if (!publicUrlData) {
                    console.log('Error: Public URL not generated for', filePath);
                    return { ...art, image: null }; // Devuelve el arte sin imagen si no se genera la URL
                }

                return { ...art, image: publicUrlData.publicUrl };
            }));

            setArts(artsWithImages);
        };

        fetchArts();
    }, []);
    console.dir(Arts);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white via-gray-100 to-gray-200 text-gray-800 p-8">
            <h2 className="text-4xl md:text-5xl font-extrabold text-verde-goodkidz mb-8">
                Votaciones de Obras
            </h2>

            <div className="relative w-full max-w-4xl">
                <Carousel>
                    <CarouselContent className="flex items-center justify-center space-x-6">{Arts.map((art) => (
                        <CarouselItem key={art.id} className="flex flex-col items-center w-full max-w-[400px]">
                            <div className="relative w-72 h-72 sm:w-96 sm:h-96 shadow-lg rounded-lg overflow-hidden border-2 border-gray-200">
                                <Image
                                    src={art.image}
                                    alt={art.title}
                                    width={500}
                                    height={500}
                                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                            <h3 className="mt-4 text-2xl font-semibold text-gray-700">
                                {art.title}
                            </h3>
                            <p className="text-gray-500 text-center px-4">Descripción: {art.description}</p>
                            <p className='text-gray-500 text-center px-4'><strong>Técnica:</strong> {art.technique} | <strong>Categoría:</strong> {art.categoria} </p>
                        </CarouselItem>
                    ))}
                    </CarouselContent>

                    {/* Botón Anterior */}
                    <CarouselPrevious
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-verde-goodkidz text-white rounded-full p-3 shadow-lg hover:scale-110 hover:shadow-xl transition duration-300"
                    >
                        ←
                    </CarouselPrevious>

                    {/* Botón Siguiente */}
                    <CarouselNext
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-verde-goodkidz text-white rounded-full p-3 shadow-lg hover:scale-110 hover:shadow-xl transition duration-300"
                    >
                        →
                    </CarouselNext>
                </Carousel>
            </div>
        </div>

    );
}
