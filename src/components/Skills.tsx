import { motion } from 'framer-motion';
import { skillCategories } from '../data/skills';
import { useLanguage } from '../contexts/LanguageContext';
import SectionHeader from './SectionHeader';

function getSkillStyle(level: number): string {
  if (level >= 80) return 'bg-primary-500/15 text-primary-300 border border-primary-500/25';
  if (level >= 60) return 'bg-surface-200 text-gray-300 border border-surface-300';
  return 'bg-surface-100 text-gray-500 border border-surface-300/50';
}

export default function Skills() {
  const { t, language } = useLanguage();

  return (
    <section id="skills" className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader title={t('skills.title')} subtitle={t('skills.subtitle')} />

        {/* Skills grid - all categories visible */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="card-surface p-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl">{category.icon}</span>
                <h3 className="font-semibold text-white">
                  {language === 'fr' ? category.name.fr : category.name.en}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map(skill => (
                  <span
                    key={skill.name}
                    className={`px-2.5 py-1 text-sm rounded-md ${getSkillStyle(skill.level)}`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-center text-gray-400 mb-6">{t('skills.githubStats')}</h3>
          <div className="card-surface p-6">
            {/* Streak Stats */}
            <div className="flex justify-center mb-6">
              <img
                src="https://streak-stats.demolab.com?user=AlexRLG98&theme=tokyonight&hide_border=true&background=131318"
                alt="GitHub Streak"
                className="rounded-lg"
                loading="lazy"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <img
                src="https://alexrlg98-stats.vercel.app/api?username=AlexRLG98&show_icons=true&theme=tokyonight&hide_border=true&count_private=true&bg_color=131318&include_all_commits=true"
                alt="GitHub Stats"
                className="rounded-lg"
                style={{ height: '180px' }}
                loading="lazy"
              />
              <img
                src="https://alexrlg98-stats.vercel.app/api/top-langs/?username=AlexRLG98&layout=compact&theme=tokyonight&hide_border=true&hide=html,css,makefile,cmake,smali,cython"
                alt="Top Languages"
                className="rounded-lg"
                style={{ height: '180px' }}
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
