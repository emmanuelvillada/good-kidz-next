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
        className="cursor-pointer w-[30vw] h-auto sm:w-[116px] sm:h-[54px] md:w-[116px] md:h-[54px] lg:w-[268px] lg:h-[125px]" // Ajustes para diferentes tamaños
        onClick={() => setActiveSection('homeSection')}
      />

      {/* Corazón e icono */}
      <div className="flex items-center space-x-2 md:space-x-4">
      <Image
  src={corazon}
  alt="Corazón"
  className="cursor-pointer w-[8vw] h-auto sm:w-[40px] sm:h-[34px] md:w-[40px] md:h-[34px] lg:w-[60px] lg:h-[50px]" // Ajustes responsivos con vw y tamaños específicos para pantallas pequeñas
/>




        {/* Contenedor de botones con bordes unidos */}
        <div className="flex border-2 border-green-500 rounded-full overflow-hidden">
          <button
            onClick={() => handleClick('conoceMas')}
            className={`px-1 py-1 text-xs sm:px-1 sm:py-2 sm:text-sm md:text-base transition ${activeSection === 'conoceMas' ? 'text-green-500' : 'text-gray-500 hover:text-green-500'}`}
          >
            Conoce Más +
          </button>
          <button
            onClick={() => handleClick('terminosCondiciones')}
            className={`px-1 py-1 text-xs sm:px-1 sm:py-2 sm:text-sm md:text-base transition ${activeSection === 'terminosCondiciones' ? 'text-green-500' : 'text-gray-500 hover:text-green-500'}`}
          >
            Términos y Condiciones
          </button>
          <button
            onClick={() => handleClick('registrate')}
            className={`px-1 py-1 text-xs sm:px-1 sm:py-2 sm:text-sm md:text-base transition ${activeSection === 'registrate' ? 'text-green-500' : 'text-gray-500 hover:text-green-500'}`}
          >
            ¡Regístrate!
          </button>
        </div>
      </div>
    </header>
  );
}
