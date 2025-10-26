import Hero from '@/components/home/Hero';
// import About from '@/components/home/About';
import MissionVision from '@/components/home/Mision';
import Team from '@/components/home/Team';
import UpcomingEvents from '@/components/home/UpcomingEvents';
// // import Help from '@/components/Help';
import MicrostorySlider from '@/components/MicrostorySlider'
import ProtectedRoute from '@/components/home/ProtectedRoute';

// import TeamCarousel from '@/components/home/TeamCarrousel';

export default function Home() {

  return (
    <>

      <Hero />
      {/* <About /> */}
      <MissionVision />
      <Team />
      <MicrostorySlider />
      <ProtectedRoute />
      <UpcomingEvents />

      {/* <Blog /> */}
      {/* <Help /> */}
      {/* <TeamCarousel /> */}

    </>
  );
}