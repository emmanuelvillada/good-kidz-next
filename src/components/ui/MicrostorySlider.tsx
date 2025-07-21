'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface MicrostorySliderProps {
    children: React.ReactNode[]
    autoPlay?: boolean
    interval?: number
}

export function MSlider({ children, autoPlay = false, interval = 7000 }: MicrostorySliderProps) {
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

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') {
                prev()
            } else if (event.key === 'ArrowRight') {
                next()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [next, prev])

    return (
        <div
            className="relative w-full mx-auto max-w-7xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Slider container - Altura optimizada para microcuentos */}
            <div className="overflow-hidden relative h-[600px] sm:h-[700px] md:h-[750px] lg:h-[800px] bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-3xl shadow-lg">
                <AnimatePresence initial={false} custom={currentIndex} mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.05, y: -20 }}
                        transition={{
                            duration: 0.6,
                            ease: [0.4, 0, 0.2, 1]
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="w-full h-full flex items-center justify-center p-4 sm:p-6 md:p-8">
                            {children[currentIndex]}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Loading progress bar */}
                {autoPlay && !isHovered && (
                    <motion.div
                        className="absolute top-0 left-0 h-1 bg-green-400 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: interval / 1000, ease: "linear" }}
                        key={currentIndex}
                    />
                )}
            </div>

            {/* Navigation buttons - Mejorado con mejor posicionamiento */}
            <button
                onClick={prev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 
                         bg-white/90 hover:bg-white backdrop-blur-sm
                         p-2 sm:p-3 rounded-full shadow-xl 
                         transition-all duration-300 z-20 
                         hover:scale-110 hover:shadow-2xl
                         border border-gray-200/50
                         group"
                aria-label="Microcuento anterior"
            >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-gray-900" />
            </button>

            <button
                onClick={next}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 
                         bg-white/90 hover:bg-white backdrop-blur-sm
                         p-2 sm:p-3 rounded-full shadow-xl 
                         transition-all duration-300 z-20 
                         hover:scale-110 hover:shadow-2xl
                         border border-gray-200/50
                         group"
                aria-label="Siguiente microcuento"
            >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-gray-900" />
            </button>

            {/* Indicators - Rediseñados para microcuentos */}
            <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 flex gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                {children.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`relative transition-all duration-300 rounded-full overflow-hidden
                          ${currentIndex === index
                                ? 'w-6 h-2 bg-green-500'
                                : 'w-2 h-2 bg-gray-300 hover:bg-green-300'
                            }`}
                        aria-label={`Ver microcuento ${index + 1}`}
                    >
                        {currentIndex === index && autoPlay && !isHovered && (
                            <motion.div
                                className="absolute inset-0 bg-green-600"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: interval / 1000, ease: "linear" }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Counter */}
            <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                {currentIndex + 1} / {children.length}
            </div>

            {/* Touch/swipe instructions para móviles */}
            <div className="absolute bottom-[-70px] left-1/2 -translate-x-1/2 text-center">
                <p className="text-xs text-gray-500 sm:hidden">
                    Desliza para navegar entre microcuentos
                </p>
                <p className="text-xs text-gray-500 hidden sm:block">
                    Usa las flechas del teclado o los botones para navegar
                </p>
            </div>
        </div>
    )
}