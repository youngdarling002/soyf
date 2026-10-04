import { useMemo } from 'react';
import './App.css';
import './styles/albums.css';
import Hero from './components/hero/Hero';
import EventsRibbon from './components/gallery/EventsRibbon';
import PosterSection from './components/hero/PosterSection';
import Pricing from './components/pricing/Pricing';
import SiteFooter from './components/Footer';
import SocialFab from './components/SocialFab';
import StudioLocation from './components/studio/StudioLocation';
import Works from './components/works/Works';
import CustomCursor from './components/CustomCursor';
import { useImagePreloader } from './hooks/useImagePreloader';
import { heavyImages, criticalImages, galleryImages } from './data/preloadAssets';

// Detect mobile once at module level — never changes during a session.
const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches

function App() {
  // useMemo ensures a stable array reference across renders.
  // Without this, [...a, ...b] creates a new array every render, causing
  // useImagePreloader's effect to fire on every render → crash.
  const preloadList = useMemo(
    () =>
      isMobile
        ? criticalImages
        : [...criticalImages, ...galleryImages, ...heavyImages],
    [] // deps empty — isMobile is module-level constant
  )

  useImagePreloader(preloadList)

  return (
    <>
      <CustomCursor />
      <Hero />
      <EventsRibbon />
      <Works />
      <PosterSection />
      <Pricing />
      <StudioLocation />
      <SocialFab />
      <SiteFooter />
    </>
  );
}

export default App;
