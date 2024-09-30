// src/components/Header.tsx
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
    <header className="flex justify-between items-center p-6 bg-white">
      {/* Logo */}
      <Image
        src={logo}
        alt="Logo Good Kidz"
        height={125}
        width={268}
        onClick={() => setActiveSection('homeSection')}
        className="cursor-pointer"
      />

      {/* Corazón e icono */}
      <div className="flex items-center space-x-4">
        <Image
          src={corazon}
          alt="Corazón"
          height={40}
          width={40}
          className="cursor-pointer"
        />

        {/* Contenedor de botones con bordes unidos */}
        <div className="flex border-2 border-green-500 rounded-full overflow-hidden">
          <button
            onClick={() => handleClick('conoceMas')}
            className={`px-4 py-2 transition ${activeSection === 'conoceMas' ? 'text-green-500' : 'text-gray-500  hover:text-green-500'}`}
          >
            Conoce Más +
          </button>
          <button
            onClick={() => handleClick('terminosCondiciones')}
            className={`px-4 py-2 transition ${activeSection === 'terminosCondiciones' ? 'text-green-500' : 'text-gray-500  hover:text-green-500'}`}
          >
            Términos y Condiciones
          </button>
          <button
            onClick={() => handleClick('registrate')}
            className={`px-4 py-2 transition ${activeSection === 'registrate' ? 'text-green-500' : 'text-gray-500  hover:text-green-500'}`}
          >
            ¡Regístrate!
          </button>
        </div>
      </div>
    </header>
  );
}
