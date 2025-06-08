// components/EventCard.tsx
import { Calendar, MapPin } from 'lucide-react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Event {
    id?: number;
    title: string;
    date: string;
    location: string;
    description?: string;
    file?: string;
    mobile_file?: string;
    link: string;
    isMobile?: boolean;
}

export function EventCard({ title, date, location, description, file, mobile_file, link, isMobile }: Event) {
    const imageSrc = isMobile ? mobile_file || file : file;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className=" bg-white rounded-xl shadow-lg overflow-visible hover:shadow-xl transition-all duration-300"
        >
            {imageSrc && (
                <div className="relative aspect-video w-full md:h-[300px]">
                    <Image
                        src={imageSrc}
                        alt={title}
                        layout="fill"
                        className="object-cover"
                    />
                </div>
            )}
            <div className="p-6">
                <div className="space-y-4 mb-8">
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
                        {title}
                    </h3>
                    {description && (
                        <p className="text-gray-600 line-clamp-2 w-[90%]">
                            {description}
                        </p>
                    )}
                    <div className="space-y-2">
                        <div className="flex items-center text-gray-500">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span className="text-sm">{date}</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span className="text-sm">{location}</span>
                        </div>
                    </div>
                </div>
                <div className="relative mb-4">
                    <a href={link} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full h-10 rounded-full bg-verde-goodkidz hover:bg-verde-goodkidz/90 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                            Conoce más
                        </Button>
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
