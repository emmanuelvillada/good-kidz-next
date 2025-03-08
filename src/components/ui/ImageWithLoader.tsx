import Image from "next/legacy/image";
import { useState } from "react";
import { Loader } from "lucide-react";
function ImageWithLoader({ src, alt }: { src: string; alt: string }) {
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
                className={`object-cover w-full h-full rounded-t-xl transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
                priority
                layout="fill"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                objectFit="cover"
                objectPosition="center"
                onLoad={() => setLoading(false)}
            />
        </div>
    )
}

export default ImageWithLoader;