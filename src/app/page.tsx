import Hero from '@/components/Hero';
import About from '@/components/About';
import Events from '@/components/Events';
import Contributors from '@/components/Contributors';

export default function Home() {

  return (
    <>
      <main className='flex-grow'>
        <Hero />
        <About />
        <Events />
        <Contributors />
      </main>
    </>
  );
}