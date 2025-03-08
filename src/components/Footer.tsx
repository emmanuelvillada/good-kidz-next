'use client';
import Link from 'next/link';
import { FaTiktok, FaInstagram, FaYoutube, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const socialLinks = [
    {
        href: "https://www.tiktok.com/@fundaciongoodkidz",
        icon: FaTiktok,
        label: "TikTok"
    },
    {
        href: "https://www.instagram.com/fundaciongoodkidz",
        icon: FaInstagram,
        label: "Instagram"
    },
    {
        href: "https://www.youtube.com/@fundaciongoodkidz",
        icon: FaYoutube,
        label: "YouTube"
    }
];

export default function Footer() {
    return (
        <footer className="bg-[#2E2D33] text-white py-12 mt-auto">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center md:text-left"
                    >
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-verde-goodkidz to-verde-goodkidz/70">
                            GOOD KIDZ
                        </h3>
                        {/* <p className="mt-4 text-gray-300">Construyendo un futuro brillante</p> */}

                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-center"
                    >
                        <h4 className="text-lg font-semibold mb-4">Contáctanos</h4>
                        <div className="flex items-center justify-center text-gray-300 hover:text-verde-goodkidz transition-colors">
                            <FaEnvelope className="mr-2" />
                            <a href="mailto:info@goodkidz.org" className="hover:underline">
                                info@goodkidz.org
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-center md:text-right"
                    >
                        <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
                        <div className="flex justify-center md:justify-end space-x-6">
                            {socialLinks.map((social) => (
                                <motion.div
                                    key={social.label}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-300 hover:text-verde-goodkidz transition-colors"
                                        aria-label={`Síguenos en ${social.label}`}
                                    >
                                        <social.icon size={24} />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400"
                >
                    <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
                        <p>&copy; {new Date().getFullYear()} Good Kidz. Todos los derechos reservados.</p>
                        <span className="hidden md:inline-block">•</span>
                        <Link
                            href="https://asisdninqgnkereutwxt.supabase.co/storage/v1/object/public/web%20files//politica_datos.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-verde-goodkidz transition-colors hover:underline"
                        >
                            Política de Tratamiento de Datos
                        </Link>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
