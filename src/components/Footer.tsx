import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-black text-white p-4">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                {/* Texto de derechos reservados */}
                <p className="text-sm text-center md:text-left">
                    © 2024 Fundación Good Kidz. Todos los derechos reservados.
                </p>

                {/* Ícono de Instagram */}
                <div className="flex justify-center space-x-4">
                    <Link href="https://www.instagram.com/fundaciongoodkidz" target="_blank" rel="noopener noreferrer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="feather feather-instagram text-white hover:text-green-500"
                        >
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
                        </svg>
                    </Link>
                </div>

                {/* Enlaces de navegación */}
                <nav className="text-sm flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 text-center md:text-left">
                    <Link href="/privacy-policy" className="hover:underline hover:text-green-500">
                        Política de Privacidad
                    </Link>
                    <Link href="/terms-conditions" className="hover:underline hover:text-green-500">
                        Términos y Condiciones
                    </Link>
                    <Link href="/contact" className="hover:underline hover:text-green-500">
                        Contacto
                    </Link>
                </nav>
            </div>
        </footer>
    );
}
