'use client'

import { useEffect, useState, useCallback } from "react"
import { MSlider } from "./ui/MicrostorySlider"
import MicrostoryCard from "./MicrostoryCard"
import { PostgrestError } from '@supabase/supabase-js'
import { supabaseClient } from '@/lib/supabase'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Microcuento = {
    id: string
    title: string
    name?: string
    file_image: string
    audio_url: string
    description?: string
    season?: string
}

export default function MicrostorySlider() {
    const supabase = supabaseClient

    const [cuentos, setCuentos] = useState<Microcuento[]>([])
    const [seasons, setSeasons] = useState<string[]>([])
    const [selectedSeason, setSelectedSeason] = useState<string | undefined>(undefined)

    const [loadingCuentos, setLoadingCuentos] = useState(true)
    const [loadingSeasons, setLoadingSeasons] = useState(true)
    const [errorCuentos, setErrorCuentos] = useState<PostgrestError | null>(null)
    const [errorSeasons, setErrorSeasons] = useState<PostgrestError | null>(null)

    const fetchSeasons = useCallback(async () => {
        setLoadingSeasons(true)
        setErrorSeasons(null)
        try {
            const { data, error } = await supabase
                .from('latest_seasons').select('season, created_at').order('created_at', { ascending: false })

            if (error) throw error

            if (data) {
                // Normalizar nombres y agrupar con la fecha más reciente
                const seasonMap = new Map<string, Date>()

                data.forEach(({ season, created_at }) => {
                    if (!season) return
                    const cleanName = season.replace(/\r?\n/g, '').trim()
                    const date = new Date(created_at)

                    // Guardar la fecha más reciente para cada temporada
                    if (!seasonMap.has(cleanName) || date > seasonMap.get(cleanName)!) {
                        seasonMap.set(cleanName, date)
                    }
                })

                // Ordenar por fecha más reciente y obtener solo nombres
                const uniqueSeasons = [...seasonMap.entries()]
                    .sort((a, b) => b[1].getTime() - a[1].getTime())
                    .map(([name]) => name)

                setSeasons(uniqueSeasons)

                // Si no hay aún season seleccionada, preselecciona la última (más reciente)
                if (!selectedSeason && uniqueSeasons.length > 0) {
                    setSelectedSeason(uniqueSeasons[0])
                }
            }
        } catch (err) {
            setErrorSeasons(err as PostgrestError)
        } finally {
            setLoadingSeasons(false)
        }
    }, [supabase, selectedSeason])

    const fetchCuentos = useCallback(
        async (season?: string) => {
            setLoadingCuentos(true)
            setErrorCuentos(null)
            try {
                if (!season) {
                    // si no hay temporada seleccionada no traemos nada (según tu requisito)
                    setCuentos([])
                    return
                }

                const { data, error } = await supabase
                    .from('micro_stories_audios')
                    .select('id, title, name, file_image, audio_url, description, season')
                    .not('audio_url', 'is', null)
                    .eq('season', season)
                    .order('created_at', { ascending: false })

                if (error) throw error

                if (data) {
                    setCuentos(data as Microcuento[])
                }
            } catch (err) {
                setErrorCuentos(err as PostgrestError)
            } finally {
                setLoadingCuentos(false)
            }
        },
        [supabase]
    )

    // al montar trae temporadas
    useEffect(() => {
        fetchSeasons()
    }, [fetchSeasons])

    // cuando cambia temporada, trae cuentos de esa temporada
    useEffect(() => {
        fetchCuentos(selectedSeason)
    }, [selectedSeason, fetchCuentos])

    const isLoading = loadingCuentos || loadingSeasons
    const hasError = errorCuentos || errorSeasons

    if (isLoading) {
        return (
            <p className="text-gray-600 mt-24 text-center text-3xl">
                Cargando microcuentos...
            </p>
        )
    }

    if (hasError) {
        console.error('Errores:', { errorSeasons, errorCuentos })
        return (
            <p className="text-red-500 mt-24 text-center text-3xl">
                Ocurrió un error cargando los datos. Inténtalo de nuevo más tarde.
            </p>
        )
    }

    if (!selectedSeason) {
        return (
            <p className="text-gray-600 mt-24 text-center text-3xl">
                Selecciona una temporada para ver sus microcuentos.
            </p>
        )
    }

    if (cuentos.length === 0) {
        return (
            <p className="text-gray-600 mt-24 text-center text-3xl">
                No hay cuentos disponibles para la temporada &quot;{selectedSeason}&quot;.
            </p>
        )
    }

    return (
        <section className="pt-10 mb-32 bg-transparent" id="microstories">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center mt-8">
                    GUARDIANES DEL PLANETA VERDE
                </h2>
                <div>
                    <div className="bg-verde-goodkidz w-32 h-1 mx-auto mb-6"></div>
                </div>
                <p className="text-lg md:text-xl text-gray-600 mb-12 text-center">
                    Un viaje sonoro tejido con la imaginación y la sabiduría de niñas y niños
                    que sueñan un mundo mejor. Este podcast nació en el Festival de Microcuento
                    Infantil Ilustrado Planeta Verde Good Kidz 2025, donde sus letras —dulces,
                    audaces y llenas de magia— se convirtieron en faros para imaginar un futuro
                    más verde y justo. Cinco universos narrativos reúnen las voces de estos
                    pequeños guardianes del planeta: historias que inspiran, conmueven y
                    despiertan el deseo de cuidar la Tierra desde la ternura y la acción.
                </p>

                <div className="flex flex-col items-center justify-center mb-8">
                    <label htmlFor="season-select" className="text-xl font-bold mb-2 text-verde-goodkidz">
                        Selecciona una temporada:
                    </label>
                    <Select
                        value={selectedSeason}
                        onValueChange={(val) => setSelectedSeason(val)}
                    >
                        <SelectTrigger
                            id="season-select"
                            className="
                            cursor-pointer
                            w-full max-w-sm
                            text-black
                            rounded-lg
                            shadow-sm
                            border-2 border-verde-goodkidz
                            bg-white
                            focus:outline-none
                            focus-visible:ring-2 focus-visible:ring-verde-goodkidz
                            focus-visible:ring-offset-0
                        "
                        >
                            <SelectValue placeholder="Selecciona una temporada" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-gray-800 rounded-lg shadow-lg">
                            <SelectGroup>
                                <SelectLabel className="text-sm font-medium text-gray-700">
                                    Temporadas:
                                </SelectLabel>
                                {seasons.map((s) => (
                                    <SelectItem key={s} value={s} className="hover:bg-gray-300 cursor-pointer">
                                        {s}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <MSlider>
                {cuentos.map((cuento) => (
                    <MicrostoryCard
                        key={cuento.id}
                        id={cuento.id}
                        title={cuento.title}
                        author={cuento.name ?? ""}
                        imageUrl={cuento.file_image}
                        audioUrl={cuento.audio_url}
                        description={cuento.description}
                        season={cuento.season ?? ""}
                    />
                ))}
            </MSlider>
        </section>
    )
}
