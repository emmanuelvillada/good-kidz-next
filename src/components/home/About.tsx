"use client"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect } from "react"

export default function About() {
    const valores = ["Educación Artística", "Desarrollo Personal", "Inclusión Social", "Innovación Educativa"]

    const stats = [
        { label: "Niños Beneficiados", value: 1300 },
        { label: "Programas Educativos", value: 50 },
        { label: "Proyectos Ejecutados", value: 100 },
        { label: "Colaboraciones", value: 20 },
    ]

    function AnimatedCounter({ from = 0, to }: { from?: number; to: number }) {
        const count = useMotionValue(from)
        const rounded = useTransform(count, (latest) => Math.floor(latest))

        useEffect(() => {
            const controls = animate(count, to, { duration: 2.5 })
            return controls.stop
        }, [to])

        return <motion.span>{rounded}</motion.span>
    }

    return (
        <section id="about" className="py-16 sm:py-20 lg:py-24 bg-muted">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground text-verde-goodkidz">
                            SOBRE <span className="text-primary text-verde-goodkidz">GOOD KIDZ</span>
                        </h2>
                    </div>
                    <div className="w-24 h-1 bg-gradient-to-r from-verde-goodkidz to-verde-goodkidz/50 mx-auto mb-8 rounded-full"></div>
                    <p className="text-base sm:text-lg text-foreground/70 max-w-3xl mx-auto font-light leading-relaxed">
                        Es la idea original de <span className="font-semibold">FEID y su familia</span> con la intención de <span className="font-semibold">transformar positivamente la sociedad</span>.
                    </p>
                </motion.div>
                <div className="grid md:grid-cols-2 gap-8 sm:gap-12 mb-16">
                    <motion.article
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border-l-4 border-verde-goodkidz"
                    >
                        <h3 className="text-3xl font-bold text-verde-goodkidz">Nuestra Misión</h3>
                        <p className="text-base sm:text-lg text-foreground/70 leading-relaxed font-light">
                            La Fundación GOOD KIDZ es una <span className="font-semibold">organización sin ánimo de lucro</span> que impulsa <span className="font-semibold">el desarrollo humano</span> a través de
                            proyectos formativos de carácter artístico, recreativo y lúdico promoviendo <span className="font-semibold">inclusión, conciencia
                                ambiental, autoconocimiento y bienestar</span>. Con raíces en Medellín y alianzas con instituciones educativas y
                            otras organizaciones, impulsa iniciativas que <span className="font-semibold">fortalecen el tejido social</span> y mejoran la calidad de vida de
                            las comunidades diversas, sin distinción, frente a los retos sociales, ambientales y económicos del
                            presente.
                        </p>
                    </motion.article>

                    <motion.article
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border-l-4 border-accent"
                    >
                        <h3 className="text-3xl font-bold text-verde-goodkidz">Nuestra Visión</h3>
                        <p className="text-base sm:text-lg text-foreground/70 leading-relaxed font-light">
                            Para el 2035, la Fundación GOOD KIDZ será <span className="font-semibold">reconocida como un referente de transformación social</span> a través
                            de las artes, la educación y la recreación, fomentando <span className="font-semibold">conciencia ambiental, inclusión y bienestar</span> en
                            comunidades diversas a nivel local, nacional e internacional. Consolidará <span className="font-semibold">vínculos de colaboración</span> con
                            instituciones educativas, fundaciones y organizaciones afines que compartan nuestros propósitos de apoyo a
                            territorios y comunidades con historias por transformar, fortaleciendo así un <span className="font-semibold">compromiso firme con la
                                equidad, la diversidad y la sostenibilidad</span>.
                        </p>
                        <ul className="space-y-4">
                            {valores.map((value, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <svg
                                        aria-hidden="true"
                                        className="w-6 h-6 text-verde-goodkidz "
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-foreground/80 font-light">{value}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.article>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-8 sm:p-12 rounded-2xl shadow-lg"
                >
                    <h3 className="text-3xl font-bold text-verde-goodkidz mb-8 text-center">Nuestro Impacto</h3>
                    <div className="grid grid-cols-2 gap-6 sm:gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="text-center p-4 rounded-lg bg-muted hover:bg-primary/5 transition-colors"
                                whileHover={{ scale: 1.05 }}
                            >
                                <p className="text-4xl font-bold text-primary mb-2">
                                    <AnimatedCounter to={stat.value} />+
                                </p>
                                <p className="text-sm text-foreground/70 font-light">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
