import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Terminal } from 'lucide-react';
import { STATS } from '../data/constants';
import { useLanguage } from '../contexts/LanguageContext';

// Generate particle positions once
const generateParticles = (count: number) => {
  return Array.from({ length: count }, () => ({
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    targetX: Math.random() * 100,
    targetY: Math.random() * 100,
    duration: Math.random() * 20 + 10,
  }));
};

export default function Hero() {
  const { t } = useLanguage();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = useMemo(() => [
    t('hero.roles.security'),
    t('hero.roles.fullstack'),
  ], [t]);

  // Memoize particles to avoid re-renders
  const particles = useMemo(() => generateParticles(20), []);

  const handleScrollTo = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Typing animation effect - setState is intentional for animation state machine
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && displayedText === currentRole) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }

    if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedText((prev) =>
        isDeleting
          ? prev.slice(0, -1)
          : currentRole.slice(0, prev.length + 1)
      );
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex, roles]);

  // Reset typing animation when language changes
  useEffect(() => {
    setDisplayedText('');
    setIsDeleting(false);
    setRoleIndex(0);
  }, [t]);

  return (
    <section
      id="hero"
      className="flex items-center justify-center relative overflow-hidden bg-grid"
      style={{ minHeight: '100vh', paddingTop: '80px' }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-500/30 rounded-full"
            style={{
              left: `${particle.initialX}%`,
              top: `${particle.initialY}%`,
            }}
            animate={{
              left: `${particle.targetX}%`,
              top: `${particle.targetY}%`,
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />

      <div className="relative z-10 text-center px-6 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Terminal-style intro */}
          <div className="terminal max-w-2xl mx-auto mb-8">
            <div className="terminal-header">
              <span className="terminal-dot red"></span>
              <span className="terminal-dot yellow"></span>
              <span className="terminal-dot green"></span>
            </div>
            <div className="p-4 text-left font-mono text-sm">
              <p className="text-green-400">$ whoami</p>
              <p className="text-gray-300 mt-1">alexandre@epitech</p>
              <p className="text-green-400 mt-2">$ cat skills.txt</p>
              <p className="text-gray-300 mt-1">Python, C/C++, TypeScript, React, FastAPI, Docker...</p>
              <p className="text-green-400 mt-2">$ ./launch_portfolio.sh</p>
              <p className="text-primary-400 mt-1">{t('hero.terminal')} <span className="typing-cursor"></span></p>
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="text-white">{t('hero.greeting')} </span>
            <span className="gradient-text">Alexandre</span>
          </h1>

          {/* Animated role */}
          <div className="h-12 flex items-center justify-center">
            <Terminal className="text-primary-400 mr-2" size={24} />
            <span className="text-2xl md:text-3xl text-gray-300">
              {displayedText}
              <span className="typing-cursor"></span>
            </span>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto mt-6"
          >
            {t('hero.description')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <a
              href="#projects"
              onClick={handleScrollTo('projects')}
              className="px-8 py-3 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 hover:scale-105"
            >
              {t('hero.viewProjects')}
            </a>
            <a
              href="#contact"
              onClick={handleScrollTo('contact')}
              className="px-8 py-3 glass rounded-lg font-semibold text-white hover:bg-white/10 transition-all duration-300"
            >
              {t('hero.contactMe')}
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {[
              { value: `${STATS.projects}`, label: t('hero.stats.projects') },
              { value: `${STATS.ctfChallenges}`, label: t('hero.stats.ctf') },
              { value: `${STATS.yearsEpitech}`, label: t('hero.stats.years') },
              { value: `${STATS.languages}+`, label: t('hero.stats.languages') },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="text-gray-500" size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
