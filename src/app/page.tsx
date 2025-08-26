// import Hero from '@/components/Hero';
import About from '@/components/About';
// import Blog from '@/components/Blog';
import UpcomingEvents from '@/components/UpcomingEvents';
// import Help from '@/components/Help';
import Events from '@/components/Events';
import MicrostorySlider from '@/components/MicrostorySlider';
import TeamCarousel from '@/components/home/TeamCarrousel';

export default function Home() {

  return (
    <>

      {/* <Hero /> */}
      <About />
      <MicrostorySlider />
      <UpcomingEvents />
      <Events />
      {/* <Blog /> */}
      {/* <Help /> */}
      <TeamCarousel />

    </>
  );
}