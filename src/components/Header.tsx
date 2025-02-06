'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import logo from '@/public/logo.png';

export default function Header() {
  // Estado para manejar el efecto de desplazamiento
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full p-4 md:p-6 border-b-2 border-gray-200 shadow-md bg-white/75 transition-all duration-300 ${isScrolled ? 'backdrop-blur-md' : ''
        }`}
    >
      <div className="flex flex-row items-center justify-between text-center max-w-6xl mx-auto">
        {/* Logo */}
        <Image
          src={logo}
          alt="Logo Good Kidz"
          className="cursor-pointer w-[30vw] sm:w-[100px] md:w-[150px] lg:w-[200px]"
        />

        {/* Título */}
        <h1 className="text-xl md:text-2xl font-bold text-verde-goodkidz text-center flex-1">Good Kidz</h1>

        {/* Menú de navegación */}
        <nav className="hidden md:flex items-center gap-x-6">
          <Link href="#about" className="text-gray-800 hover:text-verde-goodkidz hover:m-1 hover:scale-50 hover:margin-color-verde-goodkidz">
            Sobre Nosotros
          </Link>
          <Link href="#events" className="text-gray-800 hover:text-verde-goodkidz">
            Eventos
          </Link>
          <Link href="#help" className="text-gray-800 hover:text-verde-goodkidz hover:scale">
            Cómo Ayudar
          </Link>
          <Button className="bg-yellow-400 text-black hover:bg-yellow-500">Donar</Button>
        </nav>
      </div>
    </header>
  );
}
