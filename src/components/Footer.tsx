import { Linkedin, Github, Clock } from 'lucide-react';
import { CONTACT, LAST_UPDATE } from '../data/constants';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const formatLastUpdate = () => {
    const date = new Date(LAST_UPDATE);
    return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Paris'
    });
  };

  return (
    <footer className="py-8 px-4 border-t border-surface-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <span className="text-lg font-bold">
            <span className="text-white">A</span>
            <span className="text-primary-400">.</span>
          </span>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
              aria-label={t('nav.linkedinProfile')}
            >
              <Linkedin size={18} />
            </a>
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
              aria-label={t('nav.githubProfile')}
            >
              <Github size={18} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-caption">
            &copy; {currentYear} Alexandre
          </p>
        </div>

        {/* Last update */}
        <div className="flex justify-center mt-4 pt-4 border-t border-surface-300/50">
          <div className="flex items-center gap-2 text-gray-500 text-caption">
            <Clock size={12} />
            <span>{t('footer.lastUpdate')} {formatLastUpdate()} (UTC+1)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
