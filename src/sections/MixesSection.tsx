import { useState, useEffect } from 'react';
import MixCard from '../components/MixCard';
import SectionHeader from '../components/SectionHeader';
import supabase from '../lib/supabase';

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

const genres = ['All', 'Techno', 'House', 'Trance', 'Drum & Bass', 'Deep House'];

export default function MixesSection() {
  const [mixes, setMixes] = useState<Mix[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeGenre, setActiveGenre] = useState('All');

  useEffect(() => {
    fetchMixes();
  }, []);

  const fetchMixes = async () => {
    try {
      const { data, error } = await supabase
        .from('mixes')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setMixes(data || []);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = activeGenre === 'All' ? mixes : mixes.filter(m => m.genre === activeGenre);

  return (
    <section id="mixes" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Featured Mixes" subtitle="The Sound" id="mixes-header" />

        {/* Genre filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                activeGenre === genre
                  ? 'bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                  : 'bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Mixes grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white/[0.03] rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-square bg-white/[0.05]" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-white/[0.05] rounded w-3/4" />
                  <div className="h-3 bg-white/[0.05] rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((mix, i) => (
              <MixCard key={mix.id} mix={mix} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
