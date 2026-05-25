import { motion } from 'framer-motion';
import { Zap, Globe, Headphones, Radio } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

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
                  src="/uploads/upload_1.png"
                  alt="DJX"
                  className="h-16 w-auto mb-6 drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                />
                <p className="text-gray-300 leading-relaxed mb-6">
                  DJX, also known as Tin Aung Oo, is a highly skilled and experienced Trance DJ from Myanmar. With a love for music that dates back to the days of turntables, DJX has honed his craft over the years and has become a well-respected figure in the music industry.
                </p>
                <p className="text-gray-400 leading-relaxed mb-6">
                  With his mastery of different music styles and mixing techniques, DJX has proven himself to be a versatile DJ. However, it is in the realm of electronic music, particularly trance, where he has truly found his calling. His passion for the genre shines through in his sets, which are filled with uplifting beats and soulful melodies that get crowds moving.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  As a testament to his commitment to the trance genre, DJX also hosts a popular trance podcast on Apple Podcasts. The podcast showcases his mixing style and features some of the best and most uplifting trance tracks from around the world.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Overall, DJX is a highly talented and accomplished trance DJ who has made a significant impact on the music industry in Myanmar and beyond. His passion for music and dedication to his craft make him a true standout in the world of electronic music.
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
