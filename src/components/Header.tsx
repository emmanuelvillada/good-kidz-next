'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/public/logo.png';
import SuscribeModal from './form/SuscribeForm';

const navLinks = [
  { href: "#about", label: "Sobre Nosotros" },
  { href: "#events", label: "Eventos" },
  { href: "#help", label: "Cómo Ayudar" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú al hacer click en un enlace
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`
      fixed top-0 z-50 lg:w-full
      py-3 px-4 md:px-6 
      border-b border-gray-200/80 
      bg-white/80 backdrop-blur-sm
      transition-all duration-300 ease-in-out
      ${isScrolled ? 'shadow-lg py-2' : 'py-4'}
    `}
    >
      <div className="container mx-auto max-w-7xl ">
        <div className="flex items-center justify-between">
          {/* Logo y nombre */}
          <div className="flex items-center gap-4">
            <Image
              src={logo}
              alt="Logo Good Kidz"
              className="w-[80px] md:w-[120px] lg:w-[140px] transition-transform hover:scale-105 hover:cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              priority
            />
            <h1 className="text-lg md:text-xl font-bold text-verde-goodkidz hidden sm:block">
              Good Kidz
            </h1>
          </div>

          {/* Navegación Desktop */}
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
              onClick={() => setIsModalOpen(true)}
            >
              Unete a nosotros
            </Button>
          </nav>

          {/* Botón móvil */}
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            variant="ghost"
            className="md:hidden p-2"
            aria-label="Menú"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Menú móvil */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden "
            >
              <nav className="flex flex-col items-center gap-4 py-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="text-gray-700 hover:text-verde-goodkidz transition-colors duration-200 text-base font-medium w-full text-center py-2"
                  >
                    {link.label}
                  </a>
                ))}
                <Button
                  className="bg-verde-goodkidz text-white hover:bg-verde-goodkidz/90 
                            shadow-md hover:shadow-lg transition-all duration-200 w-full"
                  onClick={() => setIsModalOpen(true)}
                >
                  Unete a nosotros
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <SuscribeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>

  );
}
