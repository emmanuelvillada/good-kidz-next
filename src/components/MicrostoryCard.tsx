
'use client'

import Image from 'next/image'
import { FaPlay, FaPause } from 'react-icons/fa'

import { useState, useRef } from 'react'

type Microcuento = {
    id: string
    title: string
    imageUrl: string
    audioUrl: string
    author?: string
}

export default function MicrostoryCard({ cuento }: { cuento: Microcuento }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const togglePlay = () => {
        if (!audioRef.current) return
        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    return (
        <div className="rounded-2xl shadow-lg bg-white p-4 w-full max-w-sm">
            <Image src={cuento.imageUrl} alt={`Imagen de ${cuento.title}`} className="rounded-xl object-cover w-full h-52" />
            <h2 className="text-xl font-semibold mt-4">{cuento.title}</h2>
            {cuento.author && <p className="text-sm text-gray-500">por {cuento.author}</p>}
            <div className="mt-4 flex items-center gap-2">
                <button
                    onClick={togglePlay}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                    {isPlaying ? <FaPause className="inline" /> : <FaPlay className="inline" />}
                </button>
                <audio src={cuento.audioUrl} ref={audioRef} preload="auto" />
            </div>
        </div>
    )
}
