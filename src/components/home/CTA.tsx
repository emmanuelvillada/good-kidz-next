"use client"
import { motion } from "framer-motion"

export default function CallToAction() {
    return (
        <section className="w-full py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-verde-goodkidz/5 via-white to-verde-goodkidz/5">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center space-y-8"
                >
                    <div className="space-y-4">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-verde-goodkidz">
                            <span className="font-semibold">Sé parte</span> del cambio
                        </h2>
                        <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto font-light leading-relaxed">
                            Tu <span className="font-semibold">apoyo y contribución</span> nos ayuda a <span className="font-semibold">transformar vidas</span> a través del arte, la educación y la inclusión. Únete a nuestra misión de crear un futuro más esperanzador para nuestras comunidades.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">

                        <motion.a
                            href="/events"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 border-2 border-verde-goodkidz text-verde-goodkidz font-semibold rounded-full hover:bg-verde-goodkidz/5 transition-all duration-300"
                        >
                            Saber Más
                        </motion.a>
                    </div>

                    <div className="pt-8">
                        <p className="text-sm text-foreground/60 font-light">
                            Contáctanos: <span className="font-semibold">info@goodkidz.org</span>
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
