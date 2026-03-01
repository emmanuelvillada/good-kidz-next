'use client';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Values from '@/components/home/Values';
import Team from '@/components/home/Team';
import CTA from '@/components/home/CTA';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const scrollToSection = sessionStorage.getItem('scrollToSection');
    if (scrollToSection) {
      sessionStorage.removeItem('scrollToSection');

      setTimeout(() => {
        const element = document.querySelector(scrollToSection);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);
  return (
    <>
      <Hero />
      <About />
      <Values />
      <Team />
      <CTA />
    </>
  );
}