import { motion } from 'framer-motion';

export default function SectionHeader({ title, subtitle, id }: { title: string; subtitle: string; id?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12"
      id={id}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-fuchsia-500/30 to-transparent" />
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-fuchsia-400">{subtitle}</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </div>
      <h2 className="text-4xl sm:text-5xl font-black text-center tracking-tight">
        <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">{title}</span>
      </h2>
    </motion.div>
  );
}