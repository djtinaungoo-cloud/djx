import { Play, Clock, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePlayer, Track } from '../lib/PlayerContext';
import { asset } from '../lib/asset';

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

export default function MixCard({ mix, index }: { mix: Mix; index: number }) {
  const { playTrack } = usePlayer();

  const handlePlay = () => {
    playTrack(mix as Track);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-fuchsia-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]"
    >
      {/* Cover image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={mix.cover_url || asset('uploads/upload_1.png')}
          alt={mix.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handlePlay}
            className="w-16 h-16 rounded-full bg-fuchsia-500 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-110 transition-transform"
          >
            <Play size={28} fill="white" className="text-white ml-1" />
          </button>
        </div>

        {/* Genre badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs font-bold text-cyan-300 uppercase tracking-wider border border-cyan-500/20">
            {mix.genre}
          </span>
        </div>

        {/* Duration */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs font-medium text-gray-300">
          <Clock size={12} />
          {mix.duration}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-white text-lg truncate group-hover:text-fuchsia-300 transition-colors">
          {mix.title}
        </h3>
        <p className="text-sm text-gray-400 mt-1 font-medium">{mix.dj_name}</p>
        <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
          <Headphones size={12} />
          <span>{(mix.plays || 0).toLocaleString()} plays</span>
        </div>
      </div>
    </motion.div>
  );
}