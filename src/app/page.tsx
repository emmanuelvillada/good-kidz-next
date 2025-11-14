import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Values from '@/components/home/Values';
import Team from '@/components/home/Team';
import CTA from '@/components/home/CTA';

export default function Home() {
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