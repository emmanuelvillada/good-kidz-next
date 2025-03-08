'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/public/logo.png';
import SuscribeModal from './form/SuscribeForm';
import { useRouter, usePathname } from 'next/navigation';

const navLinks = [
  // { href: "#about", label: "Sobre Nosotros" },
  { href: "#upcoming-events", label: "VEN Y DESCUBRE..." },
  // { href: "/#help", label: "Cómo Ayudar" },
  { href: "microstory", label: "Formulario Microcuento" },
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


  const router = useRouter();
  const pathname = usePathname();
  const [pendingHash, setPendingHash] = useState("");

  useEffect(() => {
    if (pendingHash) {
      setTimeout(() => {
        window.location.hash = pendingHash; // Forzar la actualización del hash
        setPendingHash(""); // Limpiar el estado
      }, 300); // Espera a que cargue la página antes de hacer scroll
    }
  }, [pathname, pendingHash]);

  const handleNavigation = (href: string) => {
    if (href.startsWith("#")) {
      if (pathname !== "/") {
        setPendingHash(href); // Guarda el hash para hacer scroll después
        router.push("/"); // Primero navega a la home
      } else {
        window.location.hash = href; // Si ya estamos en home, actualiza el hash directamente
      }
    } else {
      router.push(href);
    }
  };

  return (
    <nav
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
              //navigate to home page if isn't already there else scroll to top
              onClick={() => window.location.pathname === '/' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : window.location.href = '/'}
              priority
            />
            <h1 className="text-lg md:text-xl font-bold text-verde-goodkidz hidden sm:block">
              GOOD KIDZ
            </h1>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                //navigate to the home if the link has a # else navigate to the other page
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(link.href);
                }}
                className="text-gray-700 hover:text-verde-goodkidz transition-colors duration-200 text-sm font-medium cursor-pointer"
              >
                {link.label}
              </a>
            ))}
            <Button
              className="bg-verde-goodkidz text-white hover:bg-verde-goodkidz/90 
                        shadow-md hover:shadow-lg transition-all duration-200"
              onClick={() => setIsModalOpen(true)}
            >
              Únete a nosotros
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
                  Únete a nosotros
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <SuscribeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>

  );
}
