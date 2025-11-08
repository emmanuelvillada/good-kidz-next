"use client"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect } from "react"
import { Sparkles } from "lucide-react"

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
                        <Sparkles className="text-primary" size={24} />
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                            SOBRE <span className="text-primary">GOOD KIDZ</span>
                        </h2>
                    </div>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8 rounded-full"></div>
                    <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
                        Es la idea original de <strong>FEID y su familia</strong> con la intención de transformar positivamente la
                        sociedad.
                    </p>
                </motion.div>
                <div className="grid md:grid-cols-2 gap-8 sm:gap-12 mb-16">
                    <motion.article
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border-l-4 border-primary"
                    >
                        <h3 className="text-3xl font-bold text-primary">Nuestra Misión</h3>
                        <p className="text-lg text-foreground/70 leading-relaxed">
                            Fomentar la adquisición de habilidades para la vida de niños, jóvenes y adultos a través del aprendizaje y
                            práctica de actividades creativas, para el cultivo de la sensibilidad, la adquisición de buenos hábitos y
                            sentido de pertenencia, mediante la conformación de grupos de diferentes edades, géneros y condición en
                            los campos de las artes, las artesanías y, con miras a la formación, la integración y el empleo productivo
                            del tiempo libre.
                        </p>
                    </motion.article>

                    <motion.article
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border-l-4 border-accent"
                    >
                        <h3 className="text-3xl font-bold text-accent">Nuestra Visión</h3>
                        <p className="text-lg text-foreground/70 leading-relaxed">
                            Ser un referente en la educación artística y el desarrollo integral de niños y jóvenes, promoviendo la
                            inclusión y la innovación en todos nuestros programas.
                        </p>
                        <ul className="space-y-4">
                            {valores.map((value, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <svg
                                        aria-hidden="true"
                                        className="w-6 h-6 text-primary"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-foreground/80">{value}</span>
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
                    <h3 className="text-3xl font-bold text-primary mb-8 text-center">Nuestro Impacto</h3>
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
                                <p className="text-sm text-foreground/70 font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
