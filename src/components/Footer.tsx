import Link from 'next/link';


export default function Footer() {
    return (
        <footer className="bg-black text-white p-4">
            <div className="container mx-auto flex flex-col items-center space-y-4">
                {/* Texto de derechos reservados */}
                <p className="text-sm   text-center">
                    © 2024 Fundación Good Kidz. Todos los derechos reservados.
                </p>

                {/* Enlaces a términos y condiciones y política de privacidad */}
                <div className="flex space-x-4 text-sm">
                    <a
                        href="../public/terminos.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-500 hover:underline"
                    >
                        Términos y Condiciones
                    </a>
                </div>

                {/* Ícono de Instagram */}
                <div className="flex justify-center">
                    <Link href="https://www.instagram.com/fundaciongoodkidz" target="_blank" rel="noopener noreferrer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-instagram text-white hover:text-green-500"
                        >
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
                        </svg>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
