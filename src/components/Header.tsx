'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import logo from '@/public/logo.png';

const navLinks = [
  { href: "#about", label: "Sobre Nosotros" },
  { href: "#events", label: "Eventos" },
  { href: "#help", label: "Cómo Ayudar" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 z-50 w-full 
        py-3 px-4 md:px-6 
        border-b border-gray-200/80 
        bg-white/80 backdrop-blur-sm
        transition-all duration-300 ease-in-out
        ${isScrolled ? 'shadow-lg py-2' : 'py-4'}
      `}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo y nombre */}
          <div className="flex items-center gap-4">
            <Image
              src={logo}
              alt="Logo Good Kidz"
              className="w-[80px] md:w-[120px] lg:w-[140px] transition-transform hover:scale-105"
              priority
            />
            <h1 className="text-lg md:text-xl font-bold text-verde-goodkidz hidden sm:block">
              Good Kidz
            </h1>
          </div>

          {/* Navegación */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-verde-goodkidz transition-colors duration-200 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <Button
              className="bg-verde-goodkidz text-white hover:bg-verde-goodkidz/90 
                        shadow-md hover:shadow-lg transition-all duration-200"
            >
              Donar
            </Button>
          </nav>

          {/* Botón móvil */}
          <Button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
}
