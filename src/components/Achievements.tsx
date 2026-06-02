import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Flag, Terminal, Calendar, Clock, ExternalLink, ChevronRight } from 'lucide-react';
import { ctfCompetitions, bootToRoot, htbProfile, getComputedStatus } from '../data/achievements';
import type { Competition } from '../data/achievements';
import { useLanguage } from '../contexts/LanguageContext';
import SectionHeader from './SectionHeader';

function getLocalizedText(value: string | { fr: string; en: string }, language: string): string {
  if (typeof value === 'object') {
    return language === 'fr' ? value.fr : value.en;
  }
  return value;
}

function getCardTier(rankText: string): 'gold' | 'silver' | 'top10' | 'standard' {
  if (rankText.includes('1er') || rankText.includes('1st') || rankText.startsWith('1/')) return 'gold';
  if (rankText.includes('3ème') || rankText.includes('3rd') || rankText.includes('2ème') || rankText.includes('2nd')) return 'silver';
  if (/^[4-9]\/|^[4-9]ème|^[4-9]th|^10\/|^10ème|^10th|^11\/|^11ème|^11th/.test(rankText)) return 'top10';
  return 'standard';
}

const tierStyles = {
  gold: 'border-accent-400/40 bg-accent-400/[0.03]',
  silver: 'border-primary-500/40',
  top10: '',
  standard: '',
};

function CompetitionCard({ competition, index, type }: { competition: Competition; index: number; type: 'ctf' | 'boot2root' }) {
  const { t, language } = useLanguage();

  const rankText = getLocalizedText(competition.rank, language);
  const computedStatus = getComputedStatus(competition);
  const isUpcoming = computedStatus === 'upcoming';
  const isOngoing = computedStatus === 'ongoing';
  const tier = (!isUpcoming && !isOngoing) ? getCardTier(rankText) : 'standard';

  const getStatusBadge = () => {
    if (isUpcoming) return { text: t('achievements.upcoming'), class: 'badge-primary' };
    if (isOngoing) return { text: t('achievements.ongoing'), class: 'badge-accent' };
    return null;
  };

  const status = getStatusBadge();

  return (
    <Link to={`/${type}/${competition.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        viewport={{ once: true }}
        className={`card-surface overflow-hidden cursor-pointer group hover:border-primary-500/30 ${tierStyles[tier]}`}
      >
        {/* Gold tier gets accent top stripe */}
        {tier === 'gold' && <div className="h-0.5 bg-gradient-to-r from-accent-400 to-accent-600" />}
        {tier === 'silver' && <div className="h-0.5 bg-gradient-to-r from-primary-400 to-primary-600" />}

        <div className="p-5">
          {/* Header row: rank/status + title + points */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                {tier === 'gold' && <Trophy className="w-4 h-4 text-accent-400 flex-shrink-0" />}
                {status ? (
                  <span className={`badge ${status.class}`}>
                    {isOngoing && <Clock size={10} />}
                    {status.text}
                  </span>
                ) : (
                  <span className="text-sm font-semibold text-white">{rankText}</span>
                )}
                <span className="text-caption text-gray-500">{competition.platform}</span>
              </div>
              <h3 className="text-lg font-semibold text-white truncate">{competition.title}</h3>
            </div>
            {competition.points && (
              <div className="text-right flex-shrink-0">
                <div className="text-xl font-bold text-primary-400">{competition.points.toLocaleString()}</div>
                <div className="text-gray-500 text-caption">pts</div>
              </div>
            )}
          </div>

          {/* Meta row: date + team */}
          <div className="flex flex-wrap items-center gap-3 text-caption text-gray-500 mb-3">
            {competition.date && (
              <span className="flex items-center gap-1.5">
                <Calendar size={12} />
                {competition.date}
              </span>
            )}
            {competition.team && (
              <span className="text-accent-400">
                {language === 'fr' ? 'Équipe' : 'Team'} {competition.team}{competition.teamSize ? ` (${competition.teamSize})` : ''}
              </span>
            )}
            {competition.challenges && (
              <span>{competition.challenges} challenges</span>
            )}
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {competition.technologies.slice(0, 5).map(tech => (
              <span key={tech} className="badge badge-primary">{tech}</span>
            ))}
            {competition.technologies.length > 5 && (
              <span className="badge bg-surface-200 text-gray-400 border-surface-300">
                +{competition.technologies.length - 5}
              </span>
            )}
          </div>

          {/* View details link */}
          <div className="flex items-center gap-1 text-primary-400 text-sm font-medium group-hover:gap-2 transition-all">
            <span>{t('achievements.viewDetails')}</span>
            <ChevronRight size={14} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// Sort: ongoing/upcoming first, then completed by most recent
function sortByDate(competitions: Competition[]): Competition[] {
  return [...competitions].sort((a, b) => {
    const statusA = getComputedStatus(a);
    const statusB = getComputedStatus(b);
    const priority = { ongoing: 0, upcoming: 1, completed: 2 };
    if (priority[statusA] !== priority[statusB]) return priority[statusA] - priority[statusB];

    if (statusA === 'completed') {
      if (!a.endDate && !b.endDate) return 0;
      if (!a.endDate) return 1;
      if (!b.endDate) return -1;
      return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
    }
    if (!a.startDate && !b.startDate) return 0;
    if (!a.startDate) return 1;
    if (!b.startDate) return -1;
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });
}

export default function Achievements() {
  const { t } = useLanguage();

  const sortedCtfCompetitions = sortByDate(ctfCompetitions);
  const allCompetitions = [...ctfCompetitions, ...bootToRoot];
  const activeCtfCount = allCompetitions.filter(c => getComputedStatus(c) === 'ongoing').length;

  return (
    <section id="achievements" className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader title={t('achievements.title')} subtitle={t('achievements.subtitle')} />

        {/* Stats banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
          className="card-elevated p-6 mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <Trophy className="mx-auto mb-1.5 text-accent-400" size={20} />
              <div className="text-xl font-bold text-accent-400">1/114</div>
              <div className="text-caption text-gray-500">Chisel</div>
            </div>
            <div className="text-center">
              <Trophy className="mx-auto mb-1.5 text-primary-400" size={20} />
              <div className="text-xl font-bold text-primary-400">11/1014</div>
              <div className="text-caption text-gray-500">University CTF</div>
            </div>
            <div className="text-center">
              <Terminal className="mx-auto mb-1.5 text-cyber-400" size={20} />
              <div className="text-xl font-bold text-cyber-400">10</div>
              <div className="text-caption text-gray-500">{t('achievements.stats.machines')}</div>
            </div>
            <div className="text-center">
              <Flag className="mx-auto mb-1.5 text-danger-400" size={20} />
              <div className="text-xl font-bold text-danger-400">75+</div>
              <div className="text-caption text-gray-500">{t('achievements.stats.flags')}</div>
            </div>
            <div className="text-center col-span-2 md:col-span-1">
              <Clock className="mx-auto mb-1.5 text-primary-300" size={20} />
              <div className="text-xl font-bold text-primary-300">{activeCtfCount}</div>
              <div className="text-caption text-gray-500">{t('achievements.stats.active')}</div>
            </div>
          </div>
        </motion.div>

        {/* Security Challenges Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyber-400" />
            Security Challenges
          </h3>
          <div className="grid grid-cols-1 gap-4">
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
            <Flag className="w-5 h-5 text-danger-400" />
            CTF Jeopardy
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            className="inline-flex items-center gap-2.5 px-4 py-2 card-surface hover:border-surface-400 transition-colors group"
          >
            <svg className="w-5 h-5 text-cyber-400" viewBox="0 0 24 24" fill="currentColor">
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
