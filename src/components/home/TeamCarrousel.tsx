// components/TeamCarousel.tsx

"use client"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

type Member = {
    name: string
    role: string
    photo: string
    bio?: string
}

const team: Member[] = [
    {
        name: "Ana María López",
        role: "Directora",
        photo: "/images/team/ana.jpg",
        bio: "Encargada de la gestión general y estrategia de la fundación."
    },
    {
        name: "Carlos Pérez",
        role: "Coordinador de proyectos",
        photo: "/images/team/carlos.jpg",
        bio: "Lidera los programas sociales y educativos."
    },
    {
        name: "Laura Gómez",
        role: "Diseñadora",
        photo: "/images/team/laura.jpg",
        bio: "Apoya en la comunicación visual y diseño de materiales."
    },
    {
        name: "Juan Torres",
        role: "Comunicaciones",
        photo: "/images/team/juan.jpg",
        bio: "Gestiona la difusión de actividades y eventos."
    }
]

export default function TeamCarousel() {
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        mode: "snap",
        slides: { perView: 1, spacing: 15 },
        breakpoints: {
            "(min-width: 640px)": { slides: { perView: 2, spacing: 15 } },
            "(min-width: 1024px)": { slides: { perView: 3, spacing: 20 } },
        },
    })

    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        if (instanceRef.current) setLoaded(true)
    }, [instanceRef])

    return (
        <section className="py-16 bg-[#FCFCFC]" id="team">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-[#525156] mb-10">
                    Nuestro Equipo
                </h2>

                <div className="relative">
                    {/* Slider */}
                    <div ref={sliderRef} className="keen-slider">
                        {team.map((member, idx) => (
                            <div key={idx} className="keen-slider__slide">
                                <Card className="shadow-md rounded-2xl overflow-hidden">
                                    <Image
                                        src={member.photo}
                                        alt={member.name}
                                        className="w-full h-56 object-cover"
                                    />
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-semibold text-[#00E58D]">
                                            {member.name}
                                        </h3>
                                        <p className="text-sm text-[#525156] font-medium">
                                            {member.role}
                                        </p>
                                        {member.bio && (
                                            <p className="mt-3 text-sm text-gray-600">{member.bio}</p>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>

                    {/* Flechas */}
                    {loaded && instanceRef.current && (
                        <>
                            <button
                                onClick={() => instanceRef.current?.prev()}
                                className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg p-2"
                                title="Anterior"
                            >
                                <ChevronLeft className="w-6 h-6 text-[#525156]" />
                            </button>
                            <button
                                onClick={() => instanceRef.current?.next()}
                                className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg p-2"
                                title="Siguiente"
                            >
                                <ChevronRight className="w-6 h-6 text-[#525156]" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}
