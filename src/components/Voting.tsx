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
      }
      
      const [Arts, setArts] = useState<Art[]>([]);

    useEffect(() => {
        const fetchArts = async () => {
            const { data, error } = await supabase.from('users').select('*');

            if (error) {
                console.log(error);
                return;
            }

            // Cargar imágenes públicas para cada obra
            const artsWithImages = await Promise.all(data.map(async (art) => {
                const { data: publicUrlData } = await supabase
                    .storage
                    .from('obras')
                    .getPublicUrl(art.url_obra);

                if (!publicUrlData) {
                    console.log('Error retrieving public URL');
                    return art;
                }

                return { ...art, image: publicUrlData.publicUrl };
            }));

            setArts(artsWithImages);
        };

        fetchArts();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-6">
            <h2 className="text-3xl md:text-4xl font-bold text-verde-goodkidz mb-4">Votaciones de obras</h2>
            <Carousel>
                <CarouselContent>
                    {Arts.map((art) => (
                        <CarouselItem key={art.id}>
                            <Image src={art.image} alt={art.title} />
                            <h3>{art.title}</h3>
                            <p>{art.description}</p>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}
