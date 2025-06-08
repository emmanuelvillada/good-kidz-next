'use client'

import { Card, CardContent } from '@/components/ui/card'
import ImageWithLoader from '@/components/ui/ImageWithLoader'
import { motion } from 'framer-motion'

interface Event {
    id: string
    title: string
    description?: string
    image?: string
    date: string
    location?: string
}

export default function EventCard({ event }: { event: Event }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto px-4 md:px-0"
        >
            <Card className="border-none shadow-2xl">
                <CardContent className="p-0">
                    <div className="relative w-full h-[250px] md:h-[450px]">
                        <ImageWithLoader
                            src={event.image || '/default-image.jpg'}
                            alt={event.title}
                        />
                        {event.date && (
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                                <p className="text-sm font-medium text-gray-800">
                                    {event.date}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="p-6 md:p-10">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">
                            {event.title}
                        </h2>
                        <p className="text-gray-600 mb-6">{event.description}</p>
                        {event.location && (
                            <div className="flex items-center gap-2 text-gray-500">
                                <svg
                                    className="w-5 h-5 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <span className="text-sm">{event.location}</span>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
