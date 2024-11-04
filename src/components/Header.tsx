'use client';

import Image from 'next/image';
import logo from '@/public/logo.png';
import corazon from '@/public/corazon.png';

export default function Header({ activeSection, setActiveSection }: { activeSection: string, setActiveSection: (section: string) => void }) {

  const handleClick = (section: string) => {
    if (activeSection === section) {
      setActiveSection('homeSection');
    } else {
      setActiveSection(section);
    }
  };

  return (
    <header className="flex justify-between items-center p-4 md:p-6 bg-white w-full">
      <Image
        src={logo}
        alt="Logo Good Kidz"
        className="cursor-pointer w-[30vw] h-auto sm:w-[100px] sm:h-auto md:w-[150px] md:h-auto lg:w-[200px] lg:h-auto"
        onClick={() => setActiveSection('homeSection')}
      />


      {/* Corazón e icono */}
      <div className="flex items-center space-x-2 md:space-x-4">
       <Image
  src={corazon}
  alt="Corazón"
  className="hidden md:block cursor-pointer w-[8vw] h-auto sm:w-[40px] sm:h-[34px] md:w-[40px] md:h-[34px] lg:w-[60px] lg:h-[50px]" // Ajustes responsivos
/>
        {/* Contenedor de botones con bordes unidos */}
        <div className="flex border-2 border-verde-goodkidz rounded-full overflow-hidden">
          <button
            onClick={() => handleClick('conoceMas')}
            className={`px-1 py-1 text-xs sm:px-1 sm:py-2 sm:text-sm md:text-base transition ${activeSection === 'conoceMas' ? 'text-verde-goodkidz' : 'text-gray-500 hover:text-verde-goodkidz'}`}
          >
            Conoce Más +
          </button>
          <button
            onClick={() => handleClick('registrate')}
            className={`px-1 py-1 text-xs sm:px-1 sm:py-2 sm:text-sm md:text-base transition ${activeSection === 'registrate' ? 'text-verde-goodkidz' : 'text-gray-500 hover:text-verde-goodkidz'}`}
          >
            ¡Regístrate!
          </button>
        </div>
      </div>
    </header>
  );
}
