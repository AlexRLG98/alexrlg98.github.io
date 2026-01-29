import { useEffect } from 'react';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Achievements from '../components/Achievements';
import Skills from '../components/Skills';
import Timeline from '../components/Timeline';
import Contact from '../components/Contact';
import { useSEO, seoConfigs } from '../hooks/useSEO';
import { useLanguage } from '../contexts/LanguageContext';

const sections = ['hero', 'projects', 'achievements', 'skills', 'timeline', 'contact'];

export default function HomePage() {
  const { language } = useLanguage();
  useSEO(seoConfigs.home(language));
  // Handle initial scroll on page load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && sections.includes(hash)) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  // Update URL based on visible section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            // Update URL without triggering scroll
            const newHash = sectionId === 'hero' ? '/' : `/#${sectionId}`;
            const currentPath = window.location.pathname + window.location.hash;
            if (currentPath !== newHash) {
              window.history.replaceState(null, '', newHash);
            }
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in middle of viewport
        threshold: 0,
      }
    );

    // Observe all sections
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Hero />
      <Projects />
      <Achievements />
      <Skills />
      <Timeline />
      <Contact />
    </>
  );
}
