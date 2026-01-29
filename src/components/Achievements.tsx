import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Flag, Terminal, Calendar, Clock, ExternalLink, ChevronRight } from 'lucide-react';
import { ctfCompetitions, bootToRoot, htbProfile, getComputedStatus } from '../data/achievements';
import type { Competition } from '../data/achievements';
import { useLanguage } from '../contexts/LanguageContext';

function CompetitionCard({ competition, index, type }: { competition: Competition; index: number; type: 'ctf' | 'boot2root' }) {
  const { t, language } = useLanguage();

  const getRank = () => {
    if (typeof competition.rank === 'object') {
      return language === 'fr' ? competition.rank.fr : competition.rank.en;
    }
    return competition.rank;
  };

  const rankText = getRank();
  const isFirst = rankText.includes('1er') || rankText.includes('1st');
  const computedStatus = getComputedStatus(competition);
  const isUpcoming = computedStatus === 'upcoming';
  const isOngoing = computedStatus === 'ongoing';

  const getStatusBadge = () => {
    if (isUpcoming) return { text: t('achievements.upcoming'), class: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
    if (isOngoing) return { text: t('achievements.ongoing'), class: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
    return { text: rankText, class: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
  };

  const getDescription = () => {
    if (typeof competition.description === 'object') {
      return language === 'fr' ? competition.description.fr : competition.description.en;
    }
    return competition.description;
  };

  const getHighlights = () => {
    return competition.highlights.map(h => {
      if (typeof h === 'object') {
        return language === 'fr' ? h.fr : h.en;
      }
      return h;
    });
  };

  const status = getStatusBadge();

  return (
    <Link to={`/${type}/${competition.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        viewport={{ once: true }}
        className={`glass rounded-xl p-5 card-hover cursor-pointer group ${isFirst ? 'ring-1 ring-yellow-500/40' : ''} ${isUpcoming ? 'border border-blue-500/20' : ''}`}
      >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            {isFirst && <Trophy className="w-4 h-4 text-yellow-500 flex-shrink-0" />}
            <span className={`px-2 py-0.5 rounded text-xs font-medium border ${status.class}`}>
              {status.text}
            </span>
            <span className="text-gray-500 text-xs">{competition.platform}</span>
          </div>
          <h3 className="text-lg font-semibold text-white truncate">{competition.title}</h3>
        </div>
        {competition.points && (
          <div className="text-right flex-shrink-0">
            <div className="text-xl font-bold text-primary-400">{competition.points}</div>
            <div className="text-gray-500 text-xs">pts</div>
          </div>
        )}
      </div>

      {/* Date */}
      {competition.date && (
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <span>{competition.date}</span>
        </div>
      )}

      {/* Team */}
      {competition.team && (
        <div className="mb-3 px-2.5 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-lg inline-block">
          <span className="text-yellow-400 text-sm">Team {competition.team}</span>
        </div>
      )}

      {/* Description */}
      <p className="text-gray-400 text-sm mb-4">{getDescription()}</p>

      {/* Highlights */}
      <div className="space-y-1.5 mb-4">
        {getHighlights().slice(0, 4).map((highlight) => (
          <div key={highlight} className="flex items-start gap-2 text-sm">
            <span className="text-primary-400 mt-0.5 text-xs">&#9656;</span>
            <span className="text-gray-300">{highlight}</span>
          </div>
        ))}
      </div>

      {/* Technologies */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {competition.technologies.slice(0, 5).map((tech) => (
          <span key={tech} className="px-2 py-0.5 bg-dark-200 rounded text-xs text-gray-500">
            {tech}
          </span>
        ))}
      </div>

      {/* View more */}
      <div className="flex items-center gap-1 text-primary-400 text-sm font-medium group-hover:gap-2 transition-all">
        <span>{t('achievements.viewDetails')}</span>
        <ChevronRight size={16} />
      </div>
      </motion.div>
    </Link>
  );
}

// Trie les compétitions : ongoing/upcoming en haut, completed en bas
// Ongoing/Upcoming triés par date de début (plus proche en premier)
// Completed triés par date de fin (plus récent en premier)
function sortByDate(competitions: Competition[]): Competition[] {
  return [...competitions].sort((a, b) => {
    const statusA = getComputedStatus(a);
    const statusB = getComputedStatus(b);

    // Priorité : ongoing > upcoming > completed
    const priority = { ongoing: 0, upcoming: 1, completed: 2 };
    if (priority[statusA] !== priority[statusB]) {
      return priority[statusA] - priority[statusB];
    }

    // Dans la même catégorie de status
    if (statusA === 'completed') {
      // Completed : plus récent en premier (desc par endDate)
      if (!a.endDate && !b.endDate) return 0;
      if (!a.endDate) return 1;
      if (!b.endDate) return -1;
      return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
    } else {
      // Ongoing/Upcoming : plus proche en premier (asc par startDate)
      if (!a.startDate && !b.startDate) return 0;
      if (!a.startDate) return 1;
      if (!b.startDate) return -1;
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    }
  });
}

export default function Achievements() {
  const { t } = useLanguage();

  // Trier les CTF par date
  const sortedCtfCompetitions = sortByDate(ctfCompetitions);

  // Calcul dynamique des CTF actifs
  const allCompetitions = [...ctfCompetitions, ...bootToRoot];
  const activeCtfCount = allCompetitions.filter(c => getComputedStatus(c) === 'ongoing').length;

  return (
    <section id="achievements" className="py-24 bg-grid">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('achievements.title')}</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            {t('achievements.subtitle')}
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <div className="flex items-center gap-2.5 px-4 py-2.5 glass rounded-lg">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-white font-medium">1/114</span>
            <span className="text-gray-500 text-sm">Chisel</span>
          </div>
          <div className="flex items-center gap-2.5 px-4 py-2.5 glass rounded-lg">
            <Trophy className="w-5 h-5 text-cyan-500" />
            <span className="text-white font-medium">3ème 🇫🇷 · 11/1014 🌍</span>
            <span className="text-gray-500 text-sm">University CTF</span>
          </div>
          <div className="flex items-center gap-2.5 px-4 py-2.5 glass rounded-lg">
            <Terminal className="w-5 h-5 text-green-500" />
            <span className="text-white font-medium">10</span>
            <span className="text-gray-500 text-sm">{t('achievements.stats.machines')}</span>
          </div>
          <div className="flex items-center gap-2.5 px-4 py-2.5 glass rounded-lg">
            <Flag className="w-5 h-5 text-red-500" />
            <span className="text-white font-medium">75</span>
            <span className="text-gray-500 text-sm">{t('achievements.stats.flags')}</span>
          </div>
          <div className="flex items-center gap-2.5 px-4 py-2.5 glass rounded-lg">
            <Clock className="w-5 h-5 text-blue-500" />
            <span className="text-white font-medium">{activeCtfCount}</span>
            <span className="text-gray-500 text-sm">{t('achievements.stats.active')}</span>
          </div>
        </motion.div>

        {/* Boot2Root Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-green-500" />
            Boot2Root
          </h3>
          <div className="grid grid-cols-1 gap-5">
            {bootToRoot.map((comp, i) => (
              <CompetitionCard key={comp.id} competition={comp} index={i} type="boot2root" />
            ))}
          </div>
        </motion.div>

        {/* CTF Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Flag className="w-5 h-5 text-red-500" />
            CTF Jeopardy
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {sortedCtfCompetitions.map((comp, i) => (
              <CompetitionCard key={comp.id} competition={comp} index={i} type="ctf" />
            ))}
          </div>
        </motion.div>

        {/* HackTheBox Profile */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <a
            href={htbProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-4 py-2 glass rounded-lg hover:bg-dark-200/50 transition-all group"
          >
            <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.996 0a1.119 1.119 0 00-.057.003c-.236.018-.468.122-.644.283L4.136 5.86a.905.905 0 00-.244.317c-.067.141-.098.3-.087.459l.001.013v10.703c-.01.158.02.318.088.46a.905.905 0 00.244.316l7.159 5.574a1.12 1.12 0 001.406 0l7.159-5.574a.904.904 0 00.244-.317c.068-.141.099-.301.088-.46V6.65c.01-.159-.02-.318-.088-.46a.904.904 0 00-.244-.316L12.703.299A1.12 1.12 0 0011.996 0zm.003 2.395l5.466 4.253-2.548 1.983-2.92-2.273-2.919 2.273-2.549-1.983 5.47-4.253zM6.003 8.498l2.405 1.872v4.604l-2.406 1.873V8.498zm11.994 0v8.349l-2.405-1.873V10.37l2.405-1.872zm-7.5 1.377l2.502 1.947v5.783l-2.502-1.948v-5.782zm5.003 0v5.782l-2.501 1.948v-5.783l2.501-1.947z"/>
            </svg>
            <span className="text-gray-300 group-hover:text-white transition-colors text-sm">
              {t('achievements.htbProfile')}
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-primary-400 transition-colors" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
