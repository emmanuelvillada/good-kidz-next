'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/public/logo.png';
import { useRouter, usePathname } from 'next/navigation';

const navLinks: { href: string; label: string }[] = [
  { href: '#mision', label: '¿Qué queremos lograr?' },
  { href: '#team', label: '¿Quiénes somos?' },
  // { href: '/events', label: 'Eventos y actividades ' },
  { href: '/podcast', label: 'Podcast' },
  { href: 'https://docs.google.com/forms/d/e/1FAIpQLSe99WChgMH3XqZV3Ou_qW6DakVC5C8vcfHLJQ_XrCLlFWRY3g/viewform', label: 'Formulario Festival del Microcuento' },

];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);



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
        // Guarda el hash en sessionStorage
        sessionStorage.setItem('scrollToSection', href);
        router.push("/");
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      router.push(href);
    }
  };

  return (
    <nav
      style={{ zIndex: 2000 }}
      className={`
      fixed top-0 lg:w-full
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
                className=" rounded-xl text-black bg-verde-goodkidz transition-colors duration-200 text-base font-medium cursor-pointer p-3  hover:bg-verde-goodkidz/80"
              >
                {link.label}
              </a>
            ))}

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

              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </nav>

  );
}
