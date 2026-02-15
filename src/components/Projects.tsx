import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Clock, Github, Star, User, GraduationCap } from 'lucide-react';
import { projects, categories } from '../data/projects';
import type { Project } from '../data/projects';
import { useLanguage } from '../contexts/LanguageContext';
import SectionHeader from './SectionHeader';

const categoryColors: Record<string, string> = {
  ai: 'from-purple-500 to-pink-500',
  security: 'from-red-500 to-orange-500',
  fullstack: 'from-blue-500 to-cyan-500',
  systems: 'from-green-500 to-emerald-500',
  fintech: 'from-yellow-500 to-amber-500',
  tools: 'from-gray-500 to-slate-500',
};

function getLocalizedText(value: string | { fr: string; en: string }, language: string): string {
  if (typeof value === 'object') {
    return language === 'fr' ? value.fr : value.en;
  }
  return value;
}

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const { t, language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const isOngoing = project.highlights.some(h => {
    const text = typeof h === 'string' ? h : `${h.fr} ${h.en}`;
    return text.includes('[EN COURS]') || text.includes('[ONGOING]');
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div
        id={`project-${project.id}`}
        className={`card-elevated overflow-hidden cursor-pointer transition-colors ${
          isExpanded ? 'border-primary-500' : 'hover:border-primary-500/30'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Top gradient bar */}
        <div className={`h-1 bg-gradient-to-r ${categoryColors[project.category]}`} />

        <div className="p-6 md:p-8">
          <div className="space-y-5">
            {/* Content */}
            <div>
              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="badge badge-primary">
                  <Star size={12} />
                  {t('projects.featured')}
                </span>
                <span className={`badge bg-gradient-to-r ${categoryColors[project.category]} text-white border-0`}>
                  {categories.find(c => c.id === project.category)?.label[language]}
                </span>
                <span className="badge bg-surface-200 text-gray-400 border-surface-300">
                  {project.type === 'personal' ? <User size={12} /> : <GraduationCap size={12} />}
                  {project.type === 'personal' ? t('projects.personal') : t('projects.academic')}
                </span>
                {isOngoing && (
                  <span className="badge badge-accent">
                    <Clock size={12} />
                    {t('achievements.ongoing')}
                  </span>
                )}
                <span className="text-caption text-gray-500">{project.year}</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>

              {/* Description */}
              <p className="text-gray-400 text-body mb-4 max-w-2xl">
                {getLocalizedText(project.description, language)}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 6).map(tech => (
                  <span key={tech} className="badge badge-primary">{tech}</span>
                ))}
                {project.technologies.length > 6 && (
                  <span className="badge bg-surface-200 text-gray-400 border-surface-300">
                    +{project.technologies.length - 6}
                  </span>
                )}
              </div>
            </div>

            {/* Metrics */}
            {project.metrics && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.metrics.map((metric, i) => (
                  <div key={i} className="card-surface p-3 text-center">
                    <div className="text-xl font-bold text-primary-400">{metric.value}</div>
                    <div className="text-caption text-gray-500">
                      {getLocalizedText(metric.label, language)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Expand indicator */}
          <div className="flex items-center text-primary-400 text-sm mt-4">
            <span>{t('projects.viewDetails')}</span>
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight size={16} className="ml-1" />
            </motion.div>
          </div>

          {/* Expanded content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-surface-300">
                  <p className="text-gray-300 text-body mb-4">
                    {getLocalizedText(project.longDescription, language)}
                  </p>

                  <h4 className="text-white font-semibold mb-2">{t('projects.keyPoints')}</h4>
                  <ul className="space-y-1 mb-4">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="text-gray-400 text-sm flex items-start">
                        <span className="text-primary-400 mr-2 mt-0.5">▹</span>
                        {getLocalizedText(highlight, language)}
                      </li>
                    ))}
                  </ul>

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-surface-200 hover:bg-surface-300 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      <Github size={18} />
                      {t('projects.viewCode')}
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t, language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const isOngoing = project.highlights.some(h => {
    const text = typeof h === 'string' ? h : `${h.fr} ${h.en}`;
    return text.includes('[EN COURS]') || text.includes('[ONGOING]');
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      layout
    >
      <div
        id={`project-${project.id}`}
        className={`card-surface overflow-hidden cursor-pointer h-full transition-colors ${
          isExpanded ? 'border-primary-500' : 'hover:border-primary-500/30'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Top gradient bar */}
        <div className={`h-0.5 bg-gradient-to-r ${categoryColors[project.category]}`} />

        <div className="p-5">
          {/* Category + year + status */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className={`badge bg-gradient-to-r ${categoryColors[project.category]} text-white border-0`}>
                {categories.find(c => c.id === project.category)?.label[language]}
              </span>
              <span className="badge bg-surface-200 text-gray-400 border-surface-300">
                {project.type === 'personal' ? <User size={10} /> : <GraduationCap size={10} />}
                {project.type === 'personal' ? t('projects.personal') : t('projects.academic')}
              </span>
              {isOngoing && (
                <span className="badge badge-accent">
                  <Clock size={10} />
                  {t('achievements.ongoing')}
                </span>
              )}
            </div>
            <span className="text-caption text-gray-500">{project.year}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {getLocalizedText(project.description, language)}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.technologies.slice(0, 4).map(tech => (
              <span key={tech} className="badge badge-primary">{tech}</span>
            ))}
            {project.technologies.length > 4 && (
              <span className="badge bg-surface-200 text-gray-400 border-surface-300">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Expand indicator */}
          <div className="flex items-center text-primary-400 text-sm">
            <span>{t('projects.viewDetails')}</span>
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight size={16} className="ml-1" />
            </motion.div>
          </div>

          {/* Expanded content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-surface-300">
                  <p className="text-gray-300 text-sm mb-4">
                    {getLocalizedText(project.longDescription, language)}
                  </p>

                  <h4 className="text-white font-semibold text-sm mb-2">{t('projects.keyPoints')}</h4>
                  <ul className="space-y-1 mb-4">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="text-gray-400 text-sm flex items-start">
                        <span className="text-primary-400 mr-2 mt-0.5">▹</span>
                        {getLocalizedText(highlight, language)}
                      </li>
                    ))}
                  </ul>

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-surface-200 hover:bg-surface-300 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      <Github size={18} />
                      {t('projects.viewCode')}
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// Sort all non-featured projects by year descending
const featuredProjects = projects.filter(p => p.featured);
const standardProjects = projects.filter(p => !p.featured).sort((a, b) => b.year - a.year);

export default function Projects() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredFeatured =
    activeCategory === 'all'
      ? featuredProjects
      : featuredProjects.filter(p => p.category === activeCategory);

  const filteredStandard =
    activeCategory === 'all'
      ? standardProjects
      : standardProjects.filter(p => p.category === activeCategory);

  const totalCount = filteredFeatured.length + filteredStandard.length;

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader title={t('projects.title')} subtitle={t('projects.subtitle')} />

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-primary-500/15 text-primary-300 border border-primary-500/30'
                  : 'bg-surface-100 text-gray-400 border border-surface-300 hover:text-white hover:border-surface-400'
              }`}
            >
              <span className="mr-1.5">{category.icon}</span>
              {category.label[language]}
            </button>
          ))}
        </motion.div>

        {/* Featured projects */}
        {filteredFeatured.length > 0 && (
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-6"
            >
              <Star className="text-accent-400" size={20} />
              <h3 className="text-xl font-bold text-white">{t('projects.featured')}</h3>
            </motion.div>
            <div className="space-y-6">
              {filteredFeatured.map((project, index) => (
                <FeaturedCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Standard projects grid */}
        {filteredStandard.length > 0 && (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredStandard.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty state */}
        {totalCount === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">{t('projects.noProjects')}</p>
          </div>
        )}
      </div>
    </section>
  );
}
