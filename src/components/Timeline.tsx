import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Clock, Play, MapPin } from 'lucide-react';
import { timeline, getEducationStatus, getWorkStatus } from '../data/skills';
import { useLanguage } from '../contexts/LanguageContext';

export default function Timeline() {
  const { t, language } = useLanguage();

  return (
    <section id="timeline" className="py-24 bg-grid">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('timeline.title')}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('timeline.subtitle')}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-8 w-0.5 h-full bg-gradient-to-b from-primary-500 via-cyan-500 to-purple-500 rounded-full" />

          {timeline.map((entry, index) => (
            <motion.div
              key={entry.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative mb-12 last:mb-0"
            >
              {/* Year badge on line */}
              <div className="absolute left-0 md:left-4 z-10 w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-cyan-500 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">
                  {entry.year.slice(-2)}
                </span>
              </div>

              {/* Content */}
              <div className="ml-12 md:ml-20">
                {/* Year header */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-bold bg-primary-500/20 text-primary-400">
                    {entry.year}
                  </span>
                </div>

                {/* Cards grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Education card */}
                  {entry.education && (() => {
                    const eduStatus = getEducationStatus(entry.education);
                    const isUpcoming = eduStatus === 'upcoming';
                    const isOngoing = eduStatus === 'ongoing';

                    return (
                    <div className={`glass rounded-xl p-5 border card-hover ${
                      isUpcoming
                        ? 'border-amber-500/30 bg-amber-500/5'
                        : isOngoing
                          ? 'border-emerald-500/30 bg-emerald-500/5'
                          : 'border-primary-500/20'
                    }`}>
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isUpcoming
                            ? 'bg-gradient-to-r from-amber-500 to-yellow-500'
                            : isOngoing
                              ? 'bg-gradient-to-r from-emerald-500 to-green-500'
                              : 'bg-gradient-to-r from-primary-500 to-cyan-500'
                        }`}>
                          {isUpcoming ? (
                            <Clock size={16} className="text-white" />
                          ) : isOngoing ? (
                            <Play size={16} className="text-white" />
                          ) : (
                            <GraduationCap size={16} className="text-white" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-lg font-bold text-white">
                              {entry.education.title}
                            </h3>
                            {isUpcoming && (
                              <span className="px-2 py-0.5 text-xs rounded-full bg-amber-500/20 text-amber-400 font-medium">
                                {language === 'fr' ? 'À venir' : 'Upcoming'}
                              </span>
                            )}
                            {isOngoing && (
                              <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/20 text-emerald-400 font-medium">
                                {language === 'fr' ? 'En cours' : 'Current'}
                              </span>
                            )}
                          </div>
                          <p className={`text-sm ${
                            isUpcoming ? 'text-amber-400' : isOngoing ? 'text-emerald-400' : 'text-primary-400'
                          }`}>
                            {entry.education.subtitle}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">
                        {language === 'fr' ? entry.education.description.fr : entry.education.description.en}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {entry.education.highlights.map((h) => (
                          <span key={h} className="px-2 py-0.5 text-xs rounded-full bg-primary-500/10 text-primary-300">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                    );
                  })()}

                  {/* Work cards */}
                  {entry.work && entry.work.length > 0 && (
                    <div className="space-y-4">
                      {entry.work.map((job, jobIndex) => {
                        const jobStatus = getWorkStatus(job);
                        const isOngoing = jobStatus === 'ongoing';
                        const isUpcoming = jobStatus === 'upcoming';

                        const getJobStyle = () => {
                          if (isOngoing) return {
                            border: 'border-emerald-500/30 bg-emerald-500/5',
                            icon: 'bg-gradient-to-r from-emerald-500 to-green-500',
                            text: 'text-emerald-400',
                            tag: 'bg-emerald-500/10 text-emerald-300'
                          };
                          if (isUpcoming) return {
                            border: 'border-amber-500/30 bg-amber-500/5',
                            icon: 'bg-gradient-to-r from-amber-500 to-yellow-500',
                            text: 'text-amber-400',
                            tag: 'bg-amber-500/10 text-amber-300'
                          };
                          return {
                            border: 'border-red-500/20',
                            icon: 'bg-gradient-to-r from-red-500 to-orange-500',
                            text: 'text-red-400',
                            tag: 'bg-red-500/10 text-red-300'
                          };
                        };
                        const style = getJobStyle();

                        return (
                          <div
                            key={jobIndex}
                            className={`glass rounded-xl p-5 border card-hover ${style.border}`}
                          >
                            <div className="flex items-start gap-3 mb-2">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${style.icon}`}>
                                {isOngoing ? (
                                  <Play size={16} className="text-white" />
                                ) : isUpcoming ? (
                                  <Clock size={16} className="text-white" />
                                ) : (
                                  <Briefcase size={16} className="text-white" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="text-lg font-bold text-white">
                                    {language === 'fr' ? job.title.fr : job.title.en}
                                  </h3>
                                  <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                                    job.type === 'internship'
                                      ? 'bg-purple-500/20 text-purple-400'
                                      : 'bg-blue-500/20 text-blue-400'
                                  }`}>
                                    {job.type === 'internship'
                                      ? (job.partTime
                                          ? (language === 'fr' ? 'Temps partiel' : 'Part-time')
                                          : (language === 'fr' ? 'Stage' : 'Internship'))
                                      : (language === 'fr' ? 'Travail' : 'Job')}
                                  </span>
                                  {isOngoing && (
                                    <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/20 text-emerald-400 font-medium">
                                      {language === 'fr' ? 'En cours' : 'Current'}
                                    </span>
                                  )}
                                  {isUpcoming && (
                                    <span className="px-2 py-0.5 text-xs rounded-full bg-amber-500/20 text-amber-400 font-medium">
                                      {language === 'fr' ? 'À venir' : 'Upcoming'}
                                    </span>
                                  )}
                                </div>
                                <p className={`text-sm ${style.text}`}>
                                  {typeof job.company === 'string' ? job.company : (language === 'fr' ? job.company.fr : job.company.en)}
                                  {job.department && (
                                    <span className="text-gray-500"> — {job.department}</span>
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 mb-3 ml-11 flex items-center gap-1 flex-wrap">
                              <span>{language === 'fr' ? job.period.fr : job.period.en}</span>
                              <span className="mx-1">•</span>
                              <span>{language === 'fr' ? job.duration.fr : job.duration.en}</span>
                              {job.location && (
                                <>
                                  <span className="mx-1">•</span>
                                  <span className="flex items-center gap-0.5">
                                    <MapPin size={10} />
                                    {job.location}
                                  </span>
                                </>
                              )}
                            </div>
                            <p className="text-gray-400 text-sm mb-3">
                              {language === 'fr' ? job.description.fr : job.description.en}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {job.highlights.map((h) => (
                                <span
                                  key={h}
                                  className={`px-2 py-0.5 text-xs rounded-full ${style.tag}`}
                                >
                                  {h}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Empty placeholder if no work */}
                  {(!entry.work || entry.work.length === 0) && entry.education && (
                    <div className="hidden md:block" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
