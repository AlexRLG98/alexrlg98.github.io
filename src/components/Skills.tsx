import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { skillCategories } from '../data/skills';
import { useLanguage } from '../contexts/LanguageContext';

// Couleurs par catégorie (harmonisées avec Projects.tsx)
const categoryColors: Record<string, { text: string; border: string; bar: string }> = {
  languages: { text: 'text-cyan-400', border: 'border-cyan-500/20', bar: 'from-cyan-500 to-blue-500' },
  systems: { text: 'text-emerald-400', border: 'border-emerald-500/20', bar: 'from-emerald-500 to-green-500' },
  backend: { text: 'text-blue-400', border: 'border-blue-500/20', bar: 'from-blue-500 to-cyan-500' },
  devops: { text: 'text-slate-400', border: 'border-slate-500/20', bar: 'from-slate-500 to-gray-500' },
  security: { text: 'text-red-400', border: 'border-red-500/20', bar: 'from-red-500 to-orange-500' },
  ai: { text: 'text-purple-400', border: 'border-purple-500/20', bar: 'from-purple-500 to-pink-500' },
};

export default function Skills() {
  const { t, language } = useLanguage();
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  return (
    <section id="skills" className="py-24 bg-grid">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('skills.title')}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
          <p className="text-gray-500 text-sm mt-2 italic">
            {language === 'fr'
              ? "Les pourcentages reflètent la fréquence d'utilisation dans mes projets"
              : "Percentages reflect usage frequency in my projects"}
          </p>
        </motion.div>

        {/* Skills - Accordion */}
        <div className="max-w-3xl mx-auto space-y-3 mb-12">
          {skillCategories.map((category, categoryIndex) => {
            const colors = categoryColors[category.id];
            const isOpen = openCategory === category.id;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: categoryIndex * 0.05 }}
                viewport={{ once: true }}
                className={`glass rounded-xl border ${colors.border} overflow-hidden`}
              >
                {/* Category header - clickable */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{category.icon}</span>
                    <h3 className={`font-semibold ${colors.text}`}>
                      {language === 'fr' ? category.name.fr : category.name.en}
                    </h3>
                    <span className="text-gray-500 text-sm italic">
                      ({category.skills.length})
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="text-gray-400" size={20} />
                  </motion.div>
                </button>

                {/* Skills content - collapsible */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-3">
                        {category.skills.map((skill) => (
                          <div key={skill.name}>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-300 text-sm">{skill.name}</span>
                              <span className={`text-sm italic ${colors.text}`}>{skill.level}%</span>
                            </div>
                            <div className="h-2 bg-dark-300 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                                className={`h-full rounded-full bg-gradient-to-r ${colors.bar}`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* GitHub Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-center text-gray-400 mb-8">{t('skills.githubStats')}</h3>
          {/* Streak Stats - Full width on top */}
          <div className="flex justify-center mb-6">
            <motion.img
              src="https://streak-stats.demolab.com?user=AlexRLG98&theme=tokyonight&hide_border=true&background=0D1117"
              alt="GitHub Streak"
              className="rounded-lg"
              whileHover={{ scale: 1.02 }}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {/* Contributions */}
            <motion.img
              src="https://alexrlg98-stats.vercel.app/api?username=AlexRLG98&show_icons=true&theme=tokyonight&hide_border=true&count_private=true&bg_color=0d1117&include_all_commits=true"
              alt="GitHub Stats"
              className="rounded-lg"
              style={{ height: '180px' }}
              whileHover={{ scale: 1.02 }}
            />
            {/* Top Languages */}
            <motion.img
              src="https://alexrlg98-stats.vercel.app/api/top-langs/?username=AlexRLG98&layout=compact&theme=tokyonight&hide_border=true&hide=html,css,makefile,cmake,smali,cython"
              alt="Top Languages"
              className="rounded-lg"
              style={{ height: '180px' }}
              whileHover={{ scale: 1.02 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
