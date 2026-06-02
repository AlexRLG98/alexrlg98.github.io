import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

const BASE_URL = 'https://alexandre-mc.fr';

const defaultSEO = {
  fr: {
    title: 'Alexandre | Portfolio',
    description: 'Développeur Full-Stack. Étudiant TEK3 à Epitech Nice, passionné par l\'IA et les systèmes.',
    keywords: ['développeur', 'full-stack', 'python', 'react', 'epitech', 'portfolio', 'monaco', 'nice'],
  },
  en: {
    title: 'Alexandre | Portfolio',
    description: 'Full-Stack Developer. TEK3 student at Epitech Nice, passionate about AI and systems.',
    keywords: ['developer', 'full-stack', 'python', 'react', 'epitech', 'portfolio', 'monaco', 'nice'],
  },
};

export function useSEO(props: SEOProps = {}) {
  const { language } = useLanguage();
  const defaults = defaultSEO[language];

  useEffect(() => {
    const {
      title = defaults.title,
      description = defaults.description,
      keywords = defaults.keywords,
      image,
      url = BASE_URL,
      type = 'website',
      noIndex = false,
    } = props;

    // Update document title
    document.title = title;

    // Helper to update or create meta tag
    const updateMeta = (selector: string, content: string, attribute = 'content') => {
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (element) {
        element.setAttribute(attribute, content);
      } else {
        element = document.createElement('meta');
        const [attr, value] = selector.replace(/[[\]"']/g, '').split('=');
        if (attr === 'name' || attr === 'property') {
          element.setAttribute(attr, value);
        }
        element.setAttribute(attribute, content);
        document.head.appendChild(element);
      }
    };

    // Basic meta tags
    updateMeta('meta[name="description"]', description);
    updateMeta('meta[name="keywords"]', keywords.join(', '));

    // Open Graph tags
    updateMeta('meta[property="og:title"]', title);
    updateMeta('meta[property="og:description"]', description);
    if (image) {
      updateMeta('meta[property="og:image"]', image);
    }
    updateMeta('meta[property="og:url"]', url);
    updateMeta('meta[property="og:type"]', type);
    updateMeta('meta[property="og:site_name"]', 'Alexandre Portfolio');
    updateMeta('meta[property="og:locale"]', language === 'fr' ? 'fr_FR' : 'en_US');

    // Twitter Card tags
    updateMeta('meta[name="twitter:card"]', image ? 'summary_large_image' : 'summary');
    updateMeta('meta[name="twitter:title"]', title);
    updateMeta('meta[name="twitter:description"]', description);
    if (image) {
      updateMeta('meta[name="twitter:image"]', image);
    }

    // Robots
    if (noIndex) {
      updateMeta('meta[name="robots"]', 'noindex, nofollow');
    } else {
      updateMeta('meta[name="robots"]', 'index, follow');
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      canonical.href = url;
    } else {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = url;
      document.head.appendChild(canonical);
    }

    // Update html lang attribute
    document.documentElement.lang = language;

  }, [props, language, defaults]);
}

// Pre-built SEO configs for different pages
export const seoConfigs = {
  home: (lang: 'fr' | 'en') => ({
    title: lang === 'fr'
      ? 'Alexandre | Développeur Full-Stack'
      : 'Alexandre | Full-Stack Developer',
    description: lang === 'fr'
      ? 'Portfolio d\'Alexandre - Développeur Full-Stack. Étudiant TEK3 à Epitech Nice. React, Python, systèmes.'
      : 'Alexandre\'s Portfolio - Full-Stack Developer. TEK3 student at Epitech Nice. React, Python, systems.',
    keywords: lang === 'fr'
      ? ['développeur full-stack', 'epitech', 'react', 'python', 'monaco', 'nice', 'portfolio']
      : ['full-stack developer', 'epitech', 'react', 'python', 'monaco', 'nice', 'portfolio'],
    url: BASE_URL,
  }),

  competition: (competition: { title: string; description: string | { fr: string; en: string }; platform: string; id: string }, lang: 'fr' | 'en') => {
    const desc = typeof competition.description === 'object'
      ? competition.description[lang]
      : competition.description;

    return {
      title: `${competition.title} | Alexandre CTF`,
      description: desc,
      keywords: lang === 'fr'
        ? ['CTF', 'writeup', competition.platform, 'cybersécurité', competition.title]
        : ['CTF', 'writeup', competition.platform, 'cybersecurity', competition.title],
      url: `${BASE_URL}/ctf/${competition.id}`,
      type: 'article' as const,
    };
  },

  challenge: (challenge: { name: string; category: string; techniques: string[] }, competitionTitle: string, competitionId: string, challengeId: string, lang: 'fr' | 'en') => ({
    title: `${challenge.name} - ${competitionTitle} | Alexandre CTF`,
    description: lang === 'fr'
      ? `Writeup du challenge ${challenge.name} (${challenge.category}). Techniques: ${challenge.techniques.join(', ')}.`
      : `Writeup for ${challenge.name} challenge (${challenge.category}). Techniques: ${challenge.techniques.join(', ')}.`,
    keywords: ['CTF writeup', challenge.category, ...challenge.techniques, competitionTitle],
    url: `${BASE_URL}/ctf/${competitionId}/${challengeId}`,
    type: 'article' as const,
  }),

  machine: (machine: { name: string; difficulty: string; techniques: string[]; os: string }, competitionTitle: string, competitionId: string, machineId: string, lang: 'fr' | 'en') => ({
    title: `${machine.name} - ${competitionTitle} | Alexandre Security Challenges`,
    description: lang === 'fr'
      ? `Writeup de la machine ${machine.name} (${machine.difficulty}). OS: ${machine.os}. Techniques: ${machine.techniques.slice(0, 5).join(', ')}.`
      : `Writeup for ${machine.name} machine (${machine.difficulty}). OS: ${machine.os}. Techniques: ${machine.techniques.slice(0, 5).join(', ')}.`,
    keywords: ['Security Challenges', 'writeup', machine.difficulty, machine.os, ...machine.techniques.slice(0, 5), competitionTitle],
    url: `${BASE_URL}/security-challenges/${competitionId}/${machineId}`,
    type: 'article' as const,
  }),
};
