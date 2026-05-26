import { motion } from 'framer-motion';
import { Zap, Globe, Headphones, Radio } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { asset } from '../lib/asset';

const stats = [
  { icon: Headphones, label: 'Active Listeners', value: '50K+' },
  { icon: Radio, label: 'Live Sets', value: '200+' },
  { icon: Globe, label: 'Countries', value: '80+' },
  { icon: Zap, label: 'Artists', value: '120+' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 relative bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="About DJX" subtitle="Our Story" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - About text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-fuchsia-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl blur-xl" />
              <div className="relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8">
                <img
                  src={asset('uploads/upload_1.png')}
                  alt="DJX"
                  className="h-16 w-auto mb-6 drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                />
                <p className="text-gray-300 leading-relaxed text-lg mb-6">
                  DJX was born from the underground — a collective of DJs, producers, and electronic music lovers united by one mission: to bring the raw energy of the club to the digital world.
                </p>
                <p className="text-gray-400 leading-relaxed mb-6">
                  We curate the finest mix sets from techno to trance, deep house to drum & bass. Every set is a journey, every beat is intentional, and every listener is part of the movement.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  From intimate warehouse sessions to massive festival recordings, DJX is your portal to the world's best electronic music — streaming 24/7, no compromises.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 text-center hover:border-fuchsia-500/20 transition-all duration-300 group"
              >
                <stat.icon className="w-8 h-8 text-fuchsia-400 mx-auto mb-3 group-hover:text-cyan-400 transition-colors" />
                <div className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 mt-1 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}