import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import supabase from '../lib/supabase';

interface Artist {
  id: number;
  name: string;
  bio: string;
  image_url: string;
  genre: string;
  social_spotify: string;
  social_soundcloud: string;
  social_instagram: string;
}

export default function ArtistsSection() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArtists() {
      try {
        const { data, error } = await supabase
          .from('artists')
          .select('*')
          .order('name', { ascending: true });
        if (error) throw error;
        setArtists(data || []);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchArtists();
  }, []);

  return (
    <section id="artists" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="The Artists" subtitle="Who We Are" />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/[0.03] rounded-2xl p-6 animate-pulse">
                <div className="w-24 h-24 rounded-full bg-white/[0.05] mx-auto mb-4" />
                <div className="h-5 bg-white/[0.05] rounded w-1/2 mx-auto mb-2" />
                <div className="h-3 bg-white/[0.05] rounded w-1/3 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {artists.map((artist, i) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 text-center hover:border-purple-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.08)]"
              >
                <div className="relative w-28 h-28 mx-auto mb-5">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
                  <img
                    src={artist.image_url || '/uploads/upload_1.png'}
                    alt={artist.name}
                    className="relative w-full h-full rounded-full object-cover border-2 border-white/10"
                  />
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">{artist.name}</h3>
                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-purple-500/10 text-xs font-bold text-purple-300 uppercase tracking-wider border border-purple-500/20">
                  {artist.genre}
                </span>

                <p className="text-sm text-gray-400 mt-4 line-clamp-3 leading-relaxed">{artist.bio}</p>

                {/* Social links */}
                <div className="flex items-center justify-center gap-3 mt-5">
                  {artist.social_spotify && (
                    <a href={artist.social_spotify} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/[0.05] flex items-center justify-center text-gray-400 hover:text-green-400 hover:bg-green-500/10 transition-all">
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {artist.social_soundcloud && (
                    <a href={artist.social_soundcloud} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/[0.05] flex items-center justify-center text-gray-400 hover:text-orange-400 hover:bg-orange-500/10 transition-all">
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {artist.social_instagram && (
                    <a href={artist.social_instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/[0.05] flex items-center justify-center text-gray-400 hover:text-pink-400 hover:bg-pink-500/10 transition-all">
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
