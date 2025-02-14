import Image from "next/image";
import { useState } from "react";
import { Loader } from "lucide-react";
import { StaticImageData } from "next/image";
function ImageWithLoader({ src, alt }: { src: string | StaticImageData; alt: string }) {
    const [loading, setLoading] = useState(true);

    return (
        <div className="relative w-full h-full">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-t-xl">
                    <Loader className="animate-spin w-8 h-8 text-gray-600" />
                </div>
            )}
            <Image
                src={src}
                alt={alt}
                className={`object-cover rounded-t-xl transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
                priority
                width={391}
                height={220}
                objectFit="cover"
                objectPosition="center"
                onLoadingComplete={() => setLoading(false)}
            />
        </div>
    )
}

export default ImageWithLoader;