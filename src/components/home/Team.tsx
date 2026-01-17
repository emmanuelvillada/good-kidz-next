"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import image from "@/public/equipo.webp";

export default function GoodKidzTeam() {
    return (
        <section
            id="team"
            className="w-full pb-12 bg-gradient-to-b from-white via-[#F9FFFB] to-white overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Texto principal */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6 sm:space-y-8 z-10"
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-verde-goodkidz leading-tight">
                            <span>Nuestro Equipo</span>
                        </h1>

                        <div className="w-80 h-1 bg-gradient-to-r from-verde-goodkidz to-verde-goodkidz/50 rounded-full"></div>

                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-xl font-light">
                            En GOOD KIDZ  sabemos que las iniciativas florecen  gracias a las personas.
                            Nuestro equipo diverso y sensible es la energía que inspira, crea y sostiene
                            cada proyecto.
                        </p>
                    </motion.div>

                    {/* Imagen del equipo */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className=""
                    >
                        <div className="z-0 relative xl:w-[850px] xl:h-[600px] xl:bottom-[-330px] xl:left-[-200px] lg:w-[600px] lg:h-[400px] lg:bottom-[-100px]">
                            <Image
                                src={image || "/placeholder.svg"}
                                alt="Equipo Fundación Good Kidz"
                                width={1200}
                                height={600}
                                className="rounded-2xl object-contain"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Rejilla con nombres */}
                <div className="mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                    {[
                        {
                            nombre: "JORGE MARIO VILLADA VELEZ",
                            rol: "Presidente",
                            correo: "goodkidz@goodkidz.org",
                        },
                        {
                            nombre: "JUAN MAURICIO ÁLVAREZ AMARILES",
                            rol: "Jurídico",
                            correo: "juridico@goodkidz.org",
                        },
                        {
                            nombre: "SANTIAGO TOBÓN ÁLVAREZ",
                            rol: "Financiero",
                            correo: "financiero@goodkidz.org",
                        },
                        {
                            nombre: "ALINA SÁNCHEZ VILLADA",
                            rol: "Administrativo",
                            correo: "contabilidad@goodkidz.org",
                        },
                        {
                            nombre: "CAROLINA OCHOA HOYOS",
                            rol: "Proyectos",
                            correo: "proyectos@goodkidz.org",
                        },
                        {
                            nombre: "NATALIA OCHOA HOYOS",
                            rol: "Comunicación",
                            correo: "comunicacion@goodkidz.org",
                        },
                        {
                            nombre: "SALOMÉ VILLADA SÁNCHEZ",
                            rol: "Audiovisual",
                            correo: "audiovisual@goodkidz.org",
                        },
                    ].map((persona, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="p-6 bg-white/60 backdrop-blur-lg rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <h3 className="text-lg font-semibold text-verde-goodkidz">
                                {persona.nombre}
                            </h3>
                            <p className="text-sm text-gray-600 font-light">{persona.rol}</p>
                            <a
                                href={`mailto:${persona.correo}`}
                                className="text-xs text-verde-goodkidz/80 hover:underline mt-1 block"
                            >
                                {persona.correo}
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
