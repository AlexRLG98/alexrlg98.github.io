import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Clock, MapPin } from 'lucide-react';
import { timeline, getEducationStatus, getWorkStatus } from '../data/skills';
import { useLanguage } from '../contexts/LanguageContext';
import SectionHeader from './SectionHeader';

export default function Timeline() {
  const { t, language } = useLanguage();

  return (
    <section id="timeline" className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader title={t('timeline.title')} subtitle={t('timeline.subtitle')} />

        {/* Timeline - single column */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-[7px] md:left-[23px] top-0 w-px h-full bg-surface-300" />

          {timeline.map((entry, index) => (
            <motion.div
              key={entry.year}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="relative mb-10 last:mb-0"
            >
              {/* Dot on line */}
              <div className="absolute left-0 md:left-4 z-10 w-[15px] h-[15px] rounded-full bg-primary-500 border-2 border-surface-0" />

              {/* Content */}
              <div className="ml-8 md:ml-14">
                {/* Year label */}
                <span className="text-sm font-bold text-primary-400 mb-3 block">
                  {entry.year}
                </span>

                {/* Cards stacked */}
                <div className="space-y-3">
                  {/* Education card */}
                  {entry.education && (() => {
                    const eduStatus = getEducationStatus(entry.education);
                    const isUpcoming = eduStatus === 'upcoming';
                    const isOngoing = eduStatus === 'ongoing';

                    return (
                      <div className={`card-surface p-5 ${
                        isUpcoming ? 'border-accent-400/30' : isOngoing ? 'border-cyber-400/30' : ''
                      }`}>
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isUpcoming ? 'bg-accent-500' : isOngoing ? 'bg-cyber-500' : 'bg-primary-500'
                          }`}>
                            {isUpcoming ? <Clock size={16} className="text-white" /> : <GraduationCap size={16} className="text-white" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-lg font-bold text-white">{entry.education.title}</h3>
                              {isUpcoming && <span className="badge badge-accent">{language === 'fr' ? 'À venir' : 'Upcoming'}</span>}
                              {isOngoing && <span className="badge badge-cyber">{language === 'fr' ? 'En cours' : 'Current'}</span>}
                            </div>
                            <p className="text-caption text-gray-500">{entry.education.subtitle}</p>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">
                          {language === 'fr' ? entry.education.description.fr : entry.education.description.en}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {entry.education.highlights.map(h => (
                            <span key={h} className="badge badge-primary">{h}</span>
                          ))}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Work cards */}
                  {entry.work?.map((job, jobIndex) => {
                    const jobStatus = getWorkStatus(job);
                    const isOngoing = jobStatus === 'ongoing';
                    const isUpcoming = jobStatus === 'upcoming';

                    return (
                      <div
                        key={jobIndex}
                        className={`card-surface p-5 ${
                          isUpcoming ? 'border-accent-400/30' : isOngoing ? 'border-cyber-400/30' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3 mb-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isUpcoming ? 'bg-accent-500' : isOngoing ? 'bg-cyber-500' : 'bg-danger-500'
                          }`}>
                            {isUpcoming ? <Clock size={16} className="text-white" /> : <Briefcase size={16} className="text-white" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-lg font-bold text-white">
                                {language === 'fr' ? job.title.fr : job.title.en}
                              </h3>
                              <span className={`badge ${job.type === 'internship' ? 'badge-primary' : 'badge-cyber'}`}>
                                {job.type === 'internship'
                                  ? (job.partTime
                                      ? (language === 'fr' ? 'Temps partiel' : 'Part-time')
                                      : (language === 'fr' ? 'Stage' : 'Internship'))
                                  : (language === 'fr' ? 'Travail' : 'Job')}
                              </span>
                              {isOngoing && <span className="badge badge-cyber">{language === 'fr' ? 'En cours' : 'Current'}</span>}
                              {isUpcoming && <span className="badge badge-accent">{language === 'fr' ? 'À venir' : 'Upcoming'}</span>}
                            </div>
                            <p className="text-caption text-gray-500">
                              {typeof job.company === 'string' ? job.company : (language === 'fr' ? job.company.fr : job.company.en)}
                              {job.department && <span> — {job.department}</span>}
                            </p>
                          </div>
                        </div>
                        <div className="text-caption text-gray-500 mb-3 ml-11 flex items-center gap-1 flex-wrap">
                          <span>{language === 'fr' ? job.period.fr : job.period.en}</span>
                          <span className="mx-1">·</span>
                          <span>{language === 'fr' ? job.duration.fr : job.duration.en}</span>
                          {job.location && (
                            <>
                              <span className="mx-1">·</span>
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
                        {job.highlights.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {job.highlights.map(h => (
                              <span key={h} className="badge badge-danger">{h}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
