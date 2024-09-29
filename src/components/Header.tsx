// src/components/Header.tsx
import Image from 'next/image';
import logo from 'public/logo.png';  // Ajusta esta ruta según dónde guardes la imagen

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-white border-b-2">
      {/* Logo de la Fundación */}
      <div className="flex items-center">
        <Image src={logo} alt="Good Kidz Logo" width={80} height={80} />
        <div className="ml-2 text-4xl font-bold">
          <span className="text-black">FUN</span>
          <span className="text-green-500">DA</span>
          <span className="text-blue-500">CIÓN</span>
        </div>
      </div>

      {/* Botón de registro */}
      <div className="flex items-center space-x-4">
        <svg
          className="w-8 h-8 text-green-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21c-.858 0-2.253-.485-3.279-1.512C6.344 17.11 3 13.565 3 9.5 3 6.419 5.418 4 8.5 4c1.74 0 3.307.895 4.5 2.29C14.193 4.895 15.76 4 17.5 4 20.582 4 23 6.419 23 9.5c0 4.065-3.344 7.61-5.721 9.988C14.253 20.515 12.858 21 12 21z"
          ></path>
        </svg>
        <button className="border-2 border-green-500 text-green-500 px-4 py-2 rounded-full hover:bg-green-500 hover:text-white transition">
          CONOCE MÁS + TÉRMINOS Y CONDICIONES ¡REGÍSTRATE!
        </button>
      </div>
    </header>
  );
}
