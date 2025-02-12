'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SliderProps {
    children: React.ReactNode[]
    autoPlay?: boolean
    interval?: number
}

export function Slider({ children, autoPlay = true, interval = 5000 }: SliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)

    const next = useCallback(() => {
        setCurrentIndex((current) => (current + 1) % children.length)
    }, [children.length])

    const prev = useCallback(() => {
        setCurrentIndex((current) => (current - 1 + children.length) % children.length)
    }, [children.length])

    useEffect(() => {
        if (autoPlay && !isHovered) {
            const timer = setInterval(next, interval)
            return () => clearInterval(timer)
        }
    }, [autoPlay, interval, next, isHovered])

    return (
        <div
            className="relative w-full mx-auto max-w-[1200px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="overflow-hidden relative min-h-[500px] md:min-h-[600px]">
                <AnimatePresence initial={false} custom={currentIndex}>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -300 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                    >
                        {children[currentIndex]}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controles de navegación */}
            <button
                onClick={prev}
                className="absolute left-[-60px] top-1/2 -translate-y-1/2 bg-white hover:bg-white/90 
               p-3 rounded-full shadow-lg transition-all duration-200 z-10 
               hidden lg:flex items-center justify-center
               hover:scale-110"
                aria-label="Anterior"
            >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>

            <button
                onClick={next}
                className="absolute right-[-60px] top-1/2 -translate-y-1/2 bg-white hover:bg-white/90 
               p-3 rounded-full shadow-lg transition-all duration-200 z-10 
               hidden lg:flex items-center justify-center
               hover:scale-110"
                aria-label="Siguiente"
            >
                <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {children.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 
                      ${currentIndex === index
                                ? 'bg-verde-goodkidz w-4'
                                : 'bg-gray-300 hover:bg-verde-goodkidz/50'
                            }`}
                        aria-label={`Ir a slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}