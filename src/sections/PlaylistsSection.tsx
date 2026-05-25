import { useState, useEffect } from 'react';
import { Play, Music, ListMusic } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import { usePlayer, Track } from '../lib/PlayerContext';
import supabase from '../lib/supabase';

interface Playlist {
  id: number;
  title: string;
  description: string;
  cover_url: string;
  track_count: number;
}

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

export default function PlaylistsSection() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [mixes, setMixes] = useState<Mix[]>([]);
  const [loading, setLoading] = useState(true);
  const { playTrack, setQueue } = usePlayer();

  useEffect(() => {
    async function fetchData() {
      try {
        const [playlistsRes, mixesRes] = await Promise.all([
          supabase.from('playlists').select('*').order('created_at', { ascending: false }),
          supabase.from('mixes').select('*').order('created_at', { ascending: false }),
        ]);
        if (playlistsRes.error) throw playlistsRes.error;
        if (mixesRes.error) throw mixesRes.error;
        setPlaylists(playlistsRes.data || []);
        setMixes(mixesRes.data || []);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const playPlaylist = (playlist: Playlist) => {
    if (mixes.length > 0) {
      setQueue(mixes as Track[]);
      playTrack(mixes[0] as Track);
    }
  };

  return (
    <section id="playlists" className="py-24 px-4 relative bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Playlists" subtitle="The Vibe" />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/[0.03] rounded-2xl p-6 animate-pulse">
                <div className="h-40 bg-white/[0.05] rounded-xl mb-4" />
                <div className="h-4 bg-white/[0.05] rounded w-3/4 mb-2" />
                <div className="h-3 bg-white/[0.05] rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists.map((playlist, i) => (
              <motion.div
                key={playlist.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.08)]"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={playlist.cover_url || '/uploads/upload_1.png'}
                    alt={playlist.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-bold text-white text-xl">{playlist.title}</h3>
                    <p className="text-sm text-gray-300 mt-1">{playlist.track_count} tracks</p>
                  </div>

                  <button
                    onClick={() => playPlaylist(playlist)}
                    className="absolute top-4 right-4 w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                  >
                    <Play size={20} fill="white" className="text-white ml-0.5" />
                  </button>
                </div>

                <div className="p-5">
                  <p className="text-sm text-gray-400 line-clamp-2">{playlist.description}</p>

                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/[0.06]">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <ListMusic size={14} />
                      <span>{playlist.track_count} tracks</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Music size={14} />
                      <span>Mix Collection</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
