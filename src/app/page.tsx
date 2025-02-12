import Hero from '@/components/Hero';
import About from '@/components/About';
import Contributors from '@/components/Contributors';
import Blog from '@/components/Blog';
import UpcomingEvents from '@/components/UpcomingEvents';
import Help from '@/components/Help';

export default function Home() {

  return (
    <>

      <Hero />
      <About />
      <UpcomingEvents />
      <Blog />
      <Help />
      <Contributors />
    </>
  );
}