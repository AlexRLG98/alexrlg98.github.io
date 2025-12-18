import { motion } from 'framer-motion';
import { Linkedin, Heart, Github, Clock } from 'lucide-react';
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
    <footer className="py-8 px-4 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold gradient-text"
          >
            {'<Alexandre />'}
          </motion.div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <motion.a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -2 }}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label={t('nav.linkedinProfile')}
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -2 }}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label={t('nav.githubProfile')}
            >
              <Github size={20} />
            </motion.a>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <span>{language === 'fr' ? 'Fait avec' : 'Made with'}</span>
            <Heart className="text-red-500" size={14} fill="currentColor" />
            <span>{language === 'fr' ? 'par Alexandre' : 'by Alexandre'} - {currentYear}</span>
          </div>
        </div>

        {/* Last update */}
        <div className="flex justify-center mt-4 pt-4 border-t border-gray-800/50">
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <Clock size={12} />
            <span>{t('footer.lastUpdate')} {formatLastUpdate()} (UTC+1 Paris/Monaco)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
