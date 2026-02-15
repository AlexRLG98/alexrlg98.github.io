import { motion } from 'framer-motion';

export default function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="text-center mb-14"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
        {title}
      </h2>
      <p className="text-gray-400 text-body-lg max-w-2xl mx-auto">
        {subtitle}
      </p>
    </motion.div>
  );
}
