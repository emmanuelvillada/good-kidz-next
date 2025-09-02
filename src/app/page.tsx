// import Hero from '@/components/Hero';
import About from '@/components/home/About';
// import Help from '@/components/Help';
import MicrostorySlider from '@/components/MicrostorySlider';
import TeamCarousel from '@/components/home/TeamCarrousel';

export default function Home() {

  return (
    <>

      {/* <Hero /> */}
      <About />
      <MicrostorySlider />

      {/* <Blog /> */}
      {/* <Help /> */}
      <TeamCarousel />

    </>
  );
}