import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Calendar, Briefcase, GraduationCap, Clock, Github } from 'lucide-react';
import { projects, categories } from '../data/projects';
import type { Project } from '../data/projects';
import { useLanguage } from '../contexts/LanguageContext';

const categoryColors: Record<string, string> = {
  ai: 'from-purple-500 to-pink-500',
  security: 'from-red-500 to-orange-500',
  fullstack: 'from-blue-500 to-cyan-500',
  systems: 'from-green-500 to-emerald-500',
  fintech: 'from-yellow-500 to-amber-500',
  tools: 'from-gray-500 to-slate-500',
};

// Group projects by year (descending), then by type
const years = [...new Set(projects.map(p => p.year))].sort((a, b) => b - a);
const projectsByYear = years.map(year => ({
  year,
  personal: projects.filter(p => p.year === year && p.type === 'personal'),
  academic: projects.filter(p => p.year === year && p.type === 'academic')
}));

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t, language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const isOngoing = project.highlights.some(h => {
    const text = typeof h === 'string' ? h : `${h.fr} ${h.en}`;
    return text.includes('[EN COURS]') || text.includes('[ONGOING]');
  });

  const getDescription = () => {
    if (typeof project.description === 'object') {
      return language === 'fr' ? project.description.fr : project.description.en;
    }
    return project.description;
  };

  const getLongDescription = () => {
    if (typeof project.longDescription === 'object') {
      return language === 'fr' ? project.longDescription.fr : project.longDescription.en;
    }
    return project.longDescription;
  };

  const getHighlights = () => {
    return project.highlights.map(h => {
      if (typeof h === 'object') {
        return language === 'fr' ? h.fr : h.en;
      }
      return h;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div
        className={`glass rounded-xl overflow-hidden card-hover cursor-pointer ${
          isExpanded ? 'ring-2 ring-primary-500' : ''
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Header gradient bar */}
        <div className={`h-1 bg-gradient-to-r ${categoryColors[project.category]}`} />

        <div className="p-6">
          {/* Category badge + Ongoing badge */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${categoryColors[project.category]} text-white`}>
                {categories.find((c) => c.id === project.category)?.label[language]}
              </span>
              {isOngoing && (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                  <Clock size={12} />
                  {t('achievements.ongoing')}
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4">{getDescription()}</p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded-full bg-primary-500/20 text-primary-300 border border-primary-500/30"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-400">
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
                <div className="pt-4 mt-4 border-t border-gray-700">
                  <p className="text-gray-300 text-sm mb-4">
                    {getLongDescription()}
                  </p>

                  <h4 className="text-white font-semibold mb-2">{t('projects.keyPoints')}</h4>
                  <ul className="space-y-1 mb-4">
                    {getHighlights().map((highlight, i) => (
                      <li key={i} className="text-gray-400 text-sm flex items-start">
                        <span className="text-primary-400 mr-2">▹</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm font-medium"
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

function TypeSubSection({
  title,
  icon: Icon,
  projects: typeProjects,
  activeCategory,
  bgColor,
  borderColor,
  iconColor
}: {
  title: string;
  icon: React.ElementType;
  projects: Project[];
  activeCategory: string;
  bgColor: string;
  borderColor: string;
  iconColor: string;
}) {
  const { language } = useLanguage();
  const filteredProjects =
    activeCategory === 'all'
      ? typeProjects
      : typeProjects.filter((p) => p.category === activeCategory);

  if (filteredProjects.length === 0) return null;

  const projectLabel = language === 'fr'
    ? `${filteredProjects.length} projet${filteredProjects.length > 1 ? 's' : ''}`
    : `${filteredProjects.length} project${filteredProjects.length > 1 ? 's' : ''}`;

  return (
    <div className={`mb-10 p-6 rounded-2xl ${bgColor} border ${borderColor}`}>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-6"
      >
        <div className={`p-2 rounded-lg ${iconColor}`}>
          <Icon className="text-white" size={20} />
        </div>
        <h4 className="text-xl font-bold text-white">{title}</h4>
        <span className="px-3 py-1 rounded-full text-sm bg-white/10 text-gray-300">
          {projectLabel}
        </span>
      </motion.div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function YearSection({
  year,
  personal,
  academic,
  activeCategory
}: {
  year: number;
  personal: Project[];
  academic: Project[];
  activeCategory: string;
}) {
  const { t, language } = useLanguage();
  const filteredPersonal = activeCategory === 'all' ? personal : personal.filter(p => p.category === activeCategory);
  const filteredAcademic = activeCategory === 'all' ? academic : academic.filter(p => p.category === activeCategory);
  const totalFiltered = filteredPersonal.length + filteredAcademic.length;

  if (totalFiltered === 0) return null;

  const projectLabel = language === 'fr'
    ? `${totalFiltered} projet${totalFiltered > 1 ? 's' : ''}`
    : `${totalFiltered} project${totalFiltered > 1 ? 's' : ''}`;

  return (
    <div className="mb-16">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="p-2 rounded-lg bg-primary-500/20">
          <Calendar className="text-primary-400" size={24} />
        </div>
        <h3 className="text-3xl font-bold text-white">{year}</h3>
        <span className="px-3 py-1 rounded-full text-sm bg-gray-700 text-gray-300">
          {projectLabel}
        </span>
      </motion.div>

      <TypeSubSection
        title={t('projects.personal')}
        icon={Briefcase}
        projects={personal}
        activeCategory={activeCategory}
        bgColor="bg-cyan-500/5"
        borderColor="border-cyan-500/20"
        iconColor="bg-cyan-500"
      />

      <TypeSubSection
        title={t('projects.academic')}
        icon={GraduationCap}
        projects={academic}
        activeCategory={activeCategory}
        bgColor="bg-purple-500/5"
        borderColor="border-purple-500/20"
        iconColor="bg-purple-500"
      />
    </div>
  );
}

export default function Projects() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <section id="projects" className="py-24 bg-grid">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('projects.title')}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-primary-500 to-cyan-500 text-white'
                  : 'glass text-gray-300 hover:text-white'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label[language]}
            </button>
          ))}
        </motion.div>

        {/* Projects by Year */}
        {projectsByYear.map(({ year, personal, academic }) => (
          <YearSection
            key={year}
            year={year}
            personal={personal}
            academic={academic}
            activeCategory={activeCategory}
          />
        ))}

        {/* Empty state */}
        {projects.filter(p => activeCategory === 'all' || p.category === activeCategory).length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">{t('projects.noProjects')}</p>
          </div>
        )}
      </div>
    </section>
  );
}
