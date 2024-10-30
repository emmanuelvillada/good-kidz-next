'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import HomeSection from '@/components/HomeSection';
import ConoceMas from '@/components/ConoceMas';
import TerminosCondiciones from '@/components/TerminosCondiciones';
import Registro from '@/components/Registro';
import Modal from '@/components/Modal';


export default function Home() {
  const [activeSection, setActiveSection] = useState('homeSection');  // Estado inicial para Home Section

  return (
    <>
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />

      <main >
        <Modal />
        {activeSection === 'homeSection' && <HomeSection setActiveSection={setActiveSection} />}
        {activeSection === 'conoceMas' && <ConoceMas />}
        {activeSection === 'terminosCondiciones' && <TerminosCondiciones />}
        {activeSection === 'registrate' && <Registro />}
      </main>
    </>
  );
}
