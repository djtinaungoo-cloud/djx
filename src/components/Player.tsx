import { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayer } from '../lib/PlayerContext';

export default function Player() {
  const { currentTrack, isPlaying, togglePlay, playNext, playPrev } = usePlayer();
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.3));
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    setProgress(0);
    setIsLiked(false);
  }, [currentTrack?.id]);

  if (!currentTrack) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-2xl border-t border-white/[0.06]"
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 cursor-pointer group"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setProgress(((e.clientX - rect.left) / rect.width) * 100);
          }}
        >
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 transition-all duration-100 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_10px_rgba(168,85,247,0.5)] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Track info */}
          <div className="flex items-center gap-3 min-w-0 flex-1 sm:flex-initial sm:w-64">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 group">
              <img
                src={currentTrack.cover_url || '/uploads/upload_1.png'}
                alt={currentTrack.title}
                className={`w-full h-full object-cover ${isPlaying ? 'animate-pulse' : ''}`}
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">{currentTrack.title}</p>
              <p className="text-xs text-gray-400 truncate">{currentTrack.dj_name}</p>
            </div>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`ml-2 flex-shrink-0 transition-colors ${isLiked ? 'text-fuchsia-500' : 'text-gray-500 hover:text-fuchsia-400'}`}
            >
              <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Controls */}
          <div className="hidden sm:flex items-center gap-3">
            <button className="text-gray-400 hover:text-white transition-colors">
              <Shuffle size={16} />
            </button>
            <button onClick={playPrev} className="text-gray-300 hover:text-white transition-colors">
              <SkipBack size={20} fill="currentColor" />
            </button>
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform"
            >
              {isPlaying ? (
                <Pause size={20} className="text-black" fill="black" />
              ) : (
                <Play size={20} className="text-black ml-0.5" fill="black" />
              )}
            </button>
            <button onClick={playNext} className="text-gray-300 hover:text-white transition-colors">
              <SkipForward size={20} fill="currentColor" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Repeat size={16} />
            </button>
          </div>

          {/* Mobile play button */}
          <button
            onClick={togglePlay}
            className="sm:hidden w-10 h-10 rounded-full bg-white flex items-center justify-center"
          >
            {isPlaying ? <Pause size={18} className="text-black" fill="black" /> : <Play size={18} className="text-black ml-0.5" fill="black" />}
          </button>

          {/* Volume */}
          <div className="hidden md:flex items-center gap-2 ml-auto">
            <button onClick={() => setIsMuted(!isMuted)} className="text-gray-400 hover:text-white">
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => { setVolume(Number(e.target.value)); setIsMuted(false); }}
              className="w-24 h-1 rounded-full appearance-none bg-white/10 accent-fuchsia-500 cursor-pointer"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}