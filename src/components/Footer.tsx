import Link from 'next/link';
import { FaTiktok, FaInstagram, FaYoutube } from 'react-icons/fa';



export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-6">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full md:w-1/3 text-center md:text-left">
                        <h3 className="text-2xl font-bold">Good Kidz</h3>
                        <p className="mt-2">Construyendo un futuro brillante en Medellín</p>
                    </div>
                    <div className="w-full md:w-1/3 text-center mt-4 md:mt-0">
                        <h4 className="text-lg font-semibold mb-2">Contáctanos</h4>
                        <p>info@goodkidz.org</p>
                    </div>
                    <div className="w-full md:w-1/3 text-center mt-4 md:mt-0">
                        <h4 className="text-lg font-semibold mb-2">Síguenos</h4>
                        <div className="flex justify-center md:justify-end space-x-4">


                            <Link href="https://www.tiktok.com/@fundaciongoodkidz" target='_blank' rel="noopener noreferrer" className="hover:text-verde-goodkidz">
                                <FaTiktok size={24} />
                            </Link>
                            <Link href="https://www.instagram.com/fundaciongoodkidz" target='_blank' rel="noopener noreferrer" className="hover:text-verde-goodkidz">
                                <FaInstagram size={24} />
                            </Link>
                            <Link href="https://www.youtube.com/@fundaciongoodkidz" target='_blank' rel="noopener noreferrer" className="hover:text-verde-goodkidz">
                                <FaYoutube size={24} />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p>&copy; {new Date().getFullYear()} Good Kidz. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer >
    )
}
