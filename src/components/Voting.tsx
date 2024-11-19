import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from "@/lib/supabase";
import { Document, Page, pdfjs } from 'react-pdf';

// Configurar worker de PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
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

            <div className="relative w-full max-w-5xl overflow-hidden px-4 py-8">
    <Carousel>
        <CarouselContent
            className="flex items-center justify-center transition-transform duration-300"
            style={{ width: "100%" }} // Asegúrate de que solo una obra sea visible
        >
            {Arts.map((art) => (
                <CarouselItem
                    key={art.id}
                    className="flex flex-col items-center w-full"
                >
                    <div className="relative w-[80%] aspect-square shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-500">
                        {art.image.endsWith('.pdf') ? (
                            <div className="relative w-full h-full flex flex-col items-center justify-center bg-gray-100 p-4">
                                <Document file={art.image} className="w-full h-[80%]"    onLoadError={(error) => console.error('Error loading PDF:', error.message)}
    onSourceError={(error) => console.error('Error with source:', error.message)}>
                                    <Page pageNumber={1} />
                                </Document>
                                <a
                                    href={art.image}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 text-sm text-blue-500 underline hover:text-blue-700"
                                >
                                    Ver PDF Completo
                                </a>
                            </div>
                        ) : (
                            <Image
                                src={art.image}
                                alt={art.title}
                                width={800}
                                height={800}
                                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                            />
                        )}
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-gray-800 text-center">
                        {art.title}
                    </h3>
                    <p className="text-sm text-gray-600 text-center px-4 mt-1">
                        {art.description}
                    </p>
                    <p className="text-sm text-gray-500 text-center mt-1">
                        <strong>Técnica:</strong> {art.technique} |{" "}
                        <strong>Categoría:</strong> {art.categoria}
                    </p>
                </CarouselItem>
            ))}
        </CarouselContent>

        {/* Botón Anterior */}
        <CarouselPrevious
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-3 shadow hover:scale-110 hover:bg-verde-goodkidz transition-transform duration-100"
        >
            ←
        </CarouselPrevious>

        {/* Botón Siguiente */}
        <CarouselNext
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-3 shadow hover:scale-110 hover:bg-verde-goodkidz transition-transform duration-100"
        >
            →
        </CarouselNext>
    </Carousel>
</div>


        </div>
    );

}
