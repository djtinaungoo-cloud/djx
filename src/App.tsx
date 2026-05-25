import { useState, useEffect } from 'react';
import { PlayerProvider } from './lib/PlayerContext';
import Navbar from './components/Navbar';
import Player from './components/Player';
import Hero from './components/Hero';
import MixesSection from './sections/MixesSection';
import PlaylistsSection from './sections/PlaylistsSection';
import ArtistsSection from './sections/ArtistsSection';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';
import Footer from './components/Footer';
import supabase from './lib/supabase';

interface Mix {
  id: number;
  title: string;
  dj_name: string;
  genre: string;
  duration: string;
  cover_url: string;
  plays: number;
  featured: boolean;
}

export default function App() {
  const [featuredMix, setFeaturedMix] = useState<Mix | null>(null);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const { data, error } = await supabase
          .from('mixes')
          .select('*')
          .eq('featured', true)
          .order('plays', { ascending: false })
          .limit(1);
        if (error) throw error;
        if (data && data.length > 0) setFeaturedMix(data[0]);
      } catch (err) {
        console.error('Fetch featured error:', err);
      }
    }
    fetchFeatured();
  }, []);

  return (
    <PlayerProvider>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <Hero featuredMix={featuredMix} />
        <MixesSection />
        <PlaylistsSection />
        <ArtistsSection />
        <AboutSection />
        <ContactSection />
        <Footer />
        <Player />
      </div>
    </PlayerProvider>
  );
}
