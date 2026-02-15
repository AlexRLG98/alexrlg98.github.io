import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Linkedin, Mail, Github, Globe } from 'lucide-react';
import { CONTACT } from '../data/constants';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
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

  // Scroll spy — highlight active section
  useEffect(() => {
    if (!isHomePage) return;
    const sectionIds = ['hero', 'projects', 'achievements', 'skills', 'timeline', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHomePage]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface-0/80 backdrop-blur-md border-b border-surface-300 py-3'
          : 'py-4'
      }`}
      style={{ minHeight: '64px' }}
      role="banner"
    >
      <nav aria-label={language === 'fr' ? 'Navigation principale' : 'Main navigation'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('hero')}
            className="text-xl font-bold cursor-pointer"
          >
            <span className="text-white">A</span>
            <span className="text-primary-400">.</span>
          </button>

          {/* Desktop Navigation — truly centered */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => handleNavClick(item.section)}
                className={`hover:text-white transition-colors cursor-pointer text-sm ${activeSection === item.section ? 'text-white' : 'text-gray-400'}`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Social Links + Language */}
          <div className="hidden md:flex items-center justify-end space-x-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-surface-100 border border-surface-300 text-gray-400 hover:text-white hover:border-surface-400 transition-colors"
              aria-label={language === 'fr' ? 'Changer de langue' : 'Change language'}
            >
              <Globe size={14} />
              <span className="text-xs font-medium uppercase">{language}</span>
            </button>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label={t('nav.linkedinProfile')}
            >
              <Linkedin size={18} />
            </a>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label={t('nav.contactForm')}
            >
              <Mail size={18} />
            </button>
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label={t('nav.githubProfile')}
            >
              <Github size={18} />
            </a>
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
            className="md:hidden mt-4 bg-surface-100 border border-surface-300 rounded-lg p-4"
          >
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => handleNavClick(item.section)}
                className={`block w-full text-left py-2 hover:text-white cursor-pointer text-sm ${activeSection === item.section ? 'text-white' : 'text-gray-400'}`}
              >
                {item.name}
              </button>
            ))}
            <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-surface-300">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-surface-200 border border-surface-300 text-gray-400"
                aria-label={language === 'fr' ? 'Changer de langue' : 'Change language'}
              >
                <Globe size={14} />
                <span className="text-xs font-medium uppercase">{language}</span>
              </button>
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400"
                aria-label={t('nav.linkedinProfile')}
              >
                <Linkedin size={18} />
              </a>
              <button
                onClick={() => handleNavClick('contact')}
                className="text-gray-400"
                aria-label={t('nav.contactForm')}
              >
                <Mail size={18} />
              </button>
              <a
                href={CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400"
                aria-label={t('nav.githubProfile')}
              >
                <Github size={18} />
              </a>
            </div>
          </motion.div>
        )}
      </div>
      </nav>
    </motion.header>
  );
}
