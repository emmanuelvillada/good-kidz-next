import Hero from '@/components/Hero';
// import About from '@/components/About';
// import Contributors from '@/components/Contributors';
// import Blog from '@/components/Blog';
import UpcomingEvents from '@/components/UpcomingEvents';
// import Help from '@/components/Help';
import Events from '@/components/Events';
import MicrostorySlider from '@/components/MicrostorySlider';

export default function Home() {

  return (
    <>

      <Hero />
      <MicrostorySlider />
      <UpcomingEvents />
      {/* <About /> */}
      <Events />
      {/* <Blog /> */}
      {/* <Help /> */}
      {/* <Contributors /> */}
    </>
  );
}