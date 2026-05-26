import { motion } from 'framer-motion';
import { Play, ChevronDown } from 'lucide-react';
import { usePlayer } from '../lib/PlayerContext';
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

export default function Hero({ featuredMix }: { featuredMix: Mix | null }) {
  const { playTrack, setQueue } = usePlayer();

  const handlePlay = () => {
    if (featuredMix) {
      playTrack(featuredMix);
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-black">
        {/* Gradient orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[128px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[150px]"
        />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <img
            src={asset('uploads/upload_1.png')}
            alt="DJX Logo"
            className="h-28 sm:h-36 md:h-44 w-auto mx-auto drop-shadow-[0_0_40px_rgba(168,85,247,0.4)]"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-none mb-6"
        >
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            FEEL THE
          </span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent">
            FREQUENCY
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-medium"
        >
          Immerse yourself in the world of electronic music. Stream exclusive DJ sets, discover new artists, and feel the beat.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={handlePlay}
            className="group relative px-8 py-4 bg-gradient-to-r from-fuchsia-600 to-blue-600 rounded-full font-bold text-white text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Play size={20} fill="white" />
              Play Featured Mix
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          <a
            href="#mixes"
            onClick={(e) => { e.preventDefault(); document.querySelector('#mixes')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="px-8 py-4 rounded-full font-bold text-white text-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300"
          >
            Explore Mixes
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="text-gray-500" size={28} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}