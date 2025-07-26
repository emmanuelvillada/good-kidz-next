'use client'

import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { Play, Pause } from 'lucide-react'

type MicrocuentoCardProps = {
    title: string
    author: string
    imageUrl: string
    audioUrl: string
    description?: string
    season: string
}

export default function MicrocuentoCard({ title, author, imageUrl, audioUrl, description, season }: MicrocuentoCardProps) {
    const audioRef = useRef<HTMLAudioElement>(null)
    const progressRef = useRef<HTMLInputElement>(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [expanded, setExpanded] = useState(false)

    const toggleAudio = () => {
        if (!audioRef.current) return
        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    const handleTimeUpdate = () => {
        if (!audioRef.current) return
        setProgress(audioRef.current.currentTime)
    }

    const handleLoadedMetadata = () => {
        if (!audioRef.current) return
        setDuration(audioRef.current.duration)
    }

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!audioRef.current) return
        const newTime = Number(e.target.value)
        audioRef.current.currentTime = newTime
        setProgress(newTime)
    }

    useEffect(() => {
        const audio = audioRef.current
        if (audio) {
            const handleEnded = () => setIsPlaying(false)
            audio.addEventListener('ended', handleEnded)
            return () => {
                audio.removeEventListener('ended', handleEnded)
            }
        }
    }, [])

    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
            {/* Imagen */}
            <div className="relative w-full h-72 sm:h-80 md:h-96 lg:h-[26rem]">
                <Image
                    src={imageUrl}
                    alt={`Ilustración de ${title}`}
                    fill
                    className="object-contain rounded-t-3xl bg-gradient-to-br from-gray-50 to-gray-100"
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 672px"
                />
            </div>

            {/* Contenido */}
            <div className="p-6 md:p-8 space-y-4 bg-white">
                {/* Título y autor */}
                <div className="space-y-2 text-center">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                        {title}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 font-medium">
                        <span className="text-verde-goodkidz font-semibold">{season}</span>
                    </p>
                    {/* Descripción con ver más/ver menos */}
                    <div className="text-sm sm:text-base text-gray-600 font-medium relative">
                        <p
                            className={`transition-all duration-300 ${expanded ? '' : 'line-clamp-2'
                                }`}
                        >
                            {description}
                        </p>

                        {description && description.length > 120 && (
                            <button
                                onClick={() => setExpanded(!expanded)}
                                className="mt-1 text-verde-goodkidz font-semibold focus:outline-none"
                            >
                                {expanded ? 'Ver menos' : 'Ver más'}
                            </button>
                        )}
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 font-medium">
                        por <span className="text-verde-goodkidz font-semibold">{author}</span>
                    </p>
                </div>

                {/* Audio player */}
                <div className="space-y-3">
                    <button
                        onClick={toggleAudio}
                        className="w-full flex items-center justify-center gap-3 px-6 py-3 sm:py-4 bg-verde-goodkidz text-white rounded-xl hover:from-verde-goodkidz hover:to-green-700 transition-all duration-200 font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                        disabled={!audioUrl}
                    >
                        {isPlaying ? (
                            <>
                                <Pause size={18} className="sm:w-5 sm:h-5" />
                                <span>Pausar microcuento</span>
                            </>
                        ) : (
                            <>
                                <Play size={18} className="sm:w-5 sm:h-5" />
                                <span>Reproducir microcuento</span>
                            </>
                        )}
                    </button>

                    {/* Barra de progreso */}
                    <div className="space-y-2">
                        <input
                            ref={progressRef}
                            disabled={!duration}
                            type="range"
                            min={0}
                            max={duration || 100}
                            value={progress}
                            onChange={handleSeek}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500 hover:accent-verde-goodkidz"
                            title="Progreso del audio"
                            style={{
                                background: `linear-gradient(to right, #00E58D 0%, #00E58D ${(progress / (duration || 100)) * 100}%, #e5e7eb ${(progress / (duration || 100)) * 100}%, #e5e7eb 100%)`
                            }}
                        />

                        {/* Tiempo */}
                        {duration > 0 && (
                            <div className="flex justify-between text-xs sm:text-sm text-gray-500 font-medium">
                                <span>{Math.floor(progress / 60)}:{Math.floor(progress % 60).toString().padStart(2, '0')}</span>
                                <span>{Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Audio element (oculto) */}
                <audio
                    ref={audioRef}
                    src={audioUrl}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    preload="metadata"
                />
            </div>
        </div>
    )
}