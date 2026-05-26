import { Heart } from 'lucide-react';
import { asset } from '../lib/asset';

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-white/[0.04] bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={asset('uploads/upload_1.png')} alt="DJX" className="h-8 w-auto" />
            <span className="text-lg font-black tracking-wider bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
              DJX
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            <a href="#mixes" className="hover:text-white transition-colors">Mixes</a>
            <a href="#playlists" className="hover:text-white transition-colors">Playlists</a>
            <a href="#artists" className="hover:text-white transition-colors">Artists</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-1 text-sm text-gray-600">
            Made with <Heart size={14} className="text-fuchsia-500" fill="currentColor" /> by DJX
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.04] text-center text-xs text-gray-600">
          © {new Date().getFullYear()} DJX. All rights reserved. The frequency is the message.
        </div>
      </div>
    </footer>
  );
}