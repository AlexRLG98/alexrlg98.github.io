import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Linkedin, Mail, Github, Globe } from 'lucide-react';
import { CONTACT } from '../data/constants';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { name: t('nav.home'), section: 'hero' },
    { name: t('nav.projects'), section: 'projects' },
    { name: t('nav.ctf'), section: 'achievements' },
    { name: t('nav.skills'), section: 'skills' },
    { name: t('nav.timeline'), section: 'timeline' },
    { name: t('nav.contact'), section: 'contact' },
  ];

  const isHomePage = location.pathname === '/';

  const handleNavClick = (section: string) => {
    if (isHomePage) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollTo: section } });
    }
    setIsOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-3' : 'py-4'
      }`}
      style={{ minHeight: '64px' }}
      role="banner"
    >
      <nav aria-label="Navigation principale">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => handleNavClick('hero')}
            className="text-2xl font-bold gradient-text cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            {'<Alexandre />'}
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => handleNavClick(item.section)}
                className="nav-link text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Social Links + Language */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.2 }}
              className="text-gray-400 hover:text-white flex items-center gap-1"
              aria-label="Change language"
            >
              <Globe size={18} />
              <span className="text-xs font-medium uppercase">{language}</span>
            </motion.button>
            <motion.a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: '#00d9f5' }}
              className="text-gray-400 hover:text-white"
              aria-label={t('nav.linkedinProfile')}
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.button
              onClick={() => handleNavClick('contact')}
              whileHover={{ scale: 1.2, color: '#667eea' }}
              className="text-gray-400 hover:text-white"
              aria-label={t('nav.contactForm')}
            >
              <Mail size={20} />
            </motion.button>
            <motion.a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: '#00d9f5' }}
              className="text-gray-400 hover:text-white"
              aria-label={t('nav.githubProfile')}
            >
              <Github size={20} />
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300"
            aria-label={isOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 glass rounded-lg p-4"
          >
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => handleNavClick(item.section)}
                className="block w-full text-left py-2 text-gray-300 hover:text-white cursor-pointer"
              >
                {item.name}
              </button>
            ))}
            <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-700">
              <button
                onClick={toggleLanguage}
                className="text-gray-400 flex items-center gap-1"
                aria-label="Change language"
              >
                <Globe size={18} />
                <span className="text-xs font-medium uppercase">{language}</span>
              </button>
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400"
                aria-label={t('nav.linkedinProfile')}
              >
                <Linkedin size={20} />
              </a>
              <button
                onClick={() => handleNavClick('contact')}
                className="text-gray-400"
                aria-label={t('nav.contactForm')}
              >
                <Mail size={20} />
              </button>
              <a
                href={CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400"
                aria-label={t('nav.githubProfile')}
              >
                <Github size={20} />
              </a>
            </div>
          </motion.div>
        )}
      </div>
      </nav>
    </motion.header>
  );
}
