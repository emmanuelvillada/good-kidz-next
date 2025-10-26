// components/TeamCarousel.tsx

"use client"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { getTeam } from "@/lib/home/getTeam"

type Member = {
    name: string
    role: string
    photo: string
    bio?: string
}




export default function TeamCarousel() {
    const [team, setTeam] = useState<Member[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const teamData = await getTeam()
            setTeam(teamData)
        }

        fetchData()
    }, [])

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
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    NUESTRO EQUIPO
                </h2>
                <div className="w-24 h-1 bg-verde-goodkidz mx-auto mb-16"></div>

                <div className="relative">
                    {/* Loading indicator */}
                    {loaded == false && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">Cargando...</div>
                    )}
                    {/* Slider */}
                    <div ref={sliderRef} className="keen-slider">
                        {team.map((member, idx) => (
                            <div key={idx} className="keen-slider__slide">
                                <Card className="shadow-md rounded-2xl overflow-hidden">
                                    <Image
                                        src={member.photo ?? "/placeholder.png"}
                                        alt={member.name ?? "Team Member"}
                                        width={500}
                                        height={500}
                                        className="w-full h-56 object-cover"
                                    />
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-semibold text-verde-goodkidz">
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
