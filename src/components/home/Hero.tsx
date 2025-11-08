"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import hero from "@/public/hero.png"
import hero_movil from "@/public/hero-movil.png"
export default function GoodKidzHero() {
    return (
        <section id="hero" className="w-full   xl:pb-12 lg:pb-8 bg-gradient-to-b from-white via-[#F9FFFB] to-white overflow-hidden" >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[500px] lg:min-h-[650px]"> {/* Texto principal */} <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-6 sm:space-y-8 z-10" >
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-pretty text-verde-goodkidz"> <span>FUNDACIÓN</span> <br /> <span>GOOD KIDZ</span> </h1> <div className="w-80 h-1 bg-gradient-to-r from-verde-goodkidz to-verde-goodkidz/50 rounded-full"></div> <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-base sm:text-lg text-foreground/80 leading-relaxed max-w-xl" > En la Fundación GOOD KIDZ creemos en la magia de lo sencillo: un pincel, una canción, un juego compartido. Desde ahí nace la fuerza para transformar realidades, abrazar la diversidad e imaginar un futuro donde la esperanza, la equidad y el cuidado mutuo se entretejen en nuestro planeta verde. </motion.p>
                </motion.div> {/* Imagen Desktop */}
                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
                        className="relative hidden lg:flex justify-center items-center xl:w-[1200px] xl:h-[600px] xl:bottom-[-180px] xl:left-[-300px] lg:w-[700px] lg:h-[500px] lg:bottom-[-130px] lg:left-[-100px]" >
                        <Image src={hero} alt="Fundación Good Kidz" className="object-contain w-full h-full " priority />
                    </motion.div> {/* Imagen Mobile */} <div className="relative flex lg:hidden justify-center items-center w-[400px] left-[-20px] h-80 sm:h-96">
                        <Image src={hero} alt="Fundación Good Kidz" className="object-contain w-full h-full " priority />
                    </div>
                </div> {/* Indicador de scroll */} <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex justify-center mt-12" >
                </motion.div> </div> </section>)
}
