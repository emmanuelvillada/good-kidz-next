"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"


const events = [
    {
        title: "Feria de Ciencias 2023",
        description: "Más de 200 niños presentaron sus proyectos innovadores",
        image: "/placeholder.svg?height=200&width=300",
    },
    {
        title: "Campamento de Verano",
        description: "Una semana de aventuras y aprendizaje en la naturaleza",
        image: "/placeholder.svg?height=200&width=300",
    },
    {
        title: "Taller de Arte",
        description: "Explorando la creatividad a través de diferentes técnicas artísticas",
        image: "/placeholder.svg?height=200&width=300",
    },
]


export default function EventCarousel() {

    return (
        <section id="events" className="py-20 bg-gray-100">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Nuestros Eventos</h2>
                <Carousel className="w-full max-w-4xl mx-auto"
                    plugins={[
                        Autoplay({
                            delay: 2000,
                        }),
                    ]}>
                    <CarouselContent>
                        {events.map((event, index) => (
                            <CarouselItem key={index}>
                                <Card>
                                    <CardContent className="flex flex-col items-center p-6">
                                        <Image
                                            src={event.image || "/placeholder.svg"}
                                            alt={event.title}
                                            width={300}
                                            height={200}
                                            className="rounded-lg mb-4"
                                        />
                                        <h3 className="text-xl font-bold text-blue-600 mb-2">{event.title}</h3>
                                        <p className="text-gray-600 text-center">{event.description}</p>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
    )
}

