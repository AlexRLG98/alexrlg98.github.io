import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Detect browser language
const detectLanguage = (): Language => {
  const stored = localStorage.getItem('portfolio-language') as Language;
  if (stored && (stored === 'fr' || stored === 'en')) {
    return stored;
  }

  const browserLang = navigator.language.split('-')[0];
  return browserLang === 'fr' ? 'fr' : 'en';
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(detectLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('portfolio-language', lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        console.warn(`Translation missing: ${key}`);
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Translations
const translations: Record<Language, Record<string, unknown>> = {
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      ctf: 'CTF',
      skills: 'Skills',
      timeline: 'Journey',
      contact: 'Contact',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      linkedinProfile: 'LinkedIn Profile',
      githubProfile: 'GitHub Profile',
      contactForm: 'Contact form',
    },
    hero: {
      roles: {
        security: 'Cybersecurity Enthusiast',
        fullstack: 'Full-Stack Developer',
      },
      greeting: "Hi, I'm",
      description: 'TEK3 student at Epitech Nice, passionate about cybersecurity and full-stack development.',
      viewProjects: 'View my projects',
      contactMe: 'Contact me',
      stats: {
        projects: 'Major projects',
        ctf: 'CTF challenges',
        languages: 'Languages mastered',
      },
    },
    projects: {
      title: 'My Projects',
      subtitle: 'A selection of my personal and academic projects, from full-stack development to cybersecurity.',
      featured: 'Featured',
      personal: 'Personal',
      academic: 'Academic',
      viewDetails: 'View details',
      keyPoints: 'Key points:',
      viewCode: 'View code',
      noProjects: 'No projects in this category.',
    },
    achievements: {
      title: 'CTF & Challenges',
      subtitle: 'Cybersecurity competitions and security challenges',
      upcoming: 'Upcoming',
      ongoing: 'Ongoing',
      viewDetails: 'View details',
      stats: {
        machines: 'Rooted machines',
        flags: 'Flags',
        active: 'Active CTFs',
      },
      htbProfile: 'HackTheBox Profile',
    },
    skills: {
      title: 'Skills',
      subtitle: 'Technologies and tools I use daily to create robust and secure solutions.',
      githubStats: 'GitHub Statistics',
    },
    timeline: {
      title: 'My Journey',
      subtitle: 'Three years of intensive study at Epitech, hundreds of projects, and a growing passion for tech.',
    },
    contact: {
      title: 'Contact Me',
      subtitle: "Interested in my profile? Don't hesitate to reach out to discuss opportunities or projects.",
      letsTalk: "Let's talk",
      availability: "Currently finishing my TEK3 at Epitech Nice. Starting a cybersecurity internship at Monaco Telecom in March 2026. Feel free to reach out for collaborations or opportunities.",
      location: 'Location',
      status: {
        title: 'Upcoming internship',
        security: 'Cybersecurity · SSI',
        period: 'March - July 2026',
        detail: 'Automating the processing of reported phishing emails. Solution study, POC and architecture recommendation.',
      },
      form: {
        name: 'Name',
        namePlaceholder: 'Your name',
        email: 'Email',
        emailPlaceholder: 'your@email.com',
        message: 'Message',
        messagePlaceholder: 'Your message...',
        send: 'Send message',
        sending: 'Sending...',
        success: 'Message sent successfully!',
        captchaError: 'Please complete the captcha',
        networkError: 'Network error. Please try again.',
        error: 'An error occurred',
      },
    },
    footer: {
      lastUpdate: 'Last update:',
    },
    challenge: {
      notFound: 'Challenge not found',
      backTo: 'Back to',
      backToAchievements: 'Back to achievements',
      unlockWriteup: 'Unlock the writeup to see the flag',
      writeup: 'Writeup',
      summary: 'Summary',
      previous: 'Previous',
      next: 'Next',
      teamFirstBlood: 'Team First Blood',
      day: 'Day',
    },
    machine: {
      solvedByMe: 'Solved by me',
    },
    competition: {
      notFound: 'Competition not found',
      backToHome: 'Back to home',
      backToCTF: 'Back to CTF',
      upcoming: 'Upcoming',
      ongoing: 'Ongoing',
      keyPoints: 'Key Points',
      technologies: 'Technologies & Tools',
      machines: 'Machines',
      unlocked: 'unlocked',
      lockAll: 'Lock all',
      lock: 'Lock',
      viewWriteup: 'View writeup',
      challenges: 'Challenges',
      protectedWriteups: 'Protected writeups',
      enterPassword: 'Enter password to access writeups',
      passwordPlaceholder: 'Password...',
      unlock: 'Unlock',
      wrongPassword: 'Wrong password',
      unsolved: 'Unsolved',
      unlockToView: 'Unlock to view writeup',
      writeupComing: 'Writeup coming soon...',
      personal: 'personal',
      team: 'Team',
    },
    encrypted: {
      protectedWriteup: 'Protected writeup',
      protectedMessage: 'This writeup is protected. Enter the password to access the content.',
      passwordPlaceholder: 'Password...',
      wrongPassword: 'Wrong password',
      unlock: 'Unlock',
      lock: 'Lock',
    },
    vault: {
      title: 'Password Vault',
      locked: 'Locked',
      unlocked: 'Unlocked',
      enterMasterPassword: 'Enter the master password to unlock all writeups.',
      passwordPlaceholder: 'Master password...',
      wrongPassword: 'Wrong password',
      unlock: 'Unlock',
      lockAll: 'Lock all',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      projects: 'Projets',
      ctf: 'CTF',
      skills: 'Compétences',
      timeline: 'Parcours',
      contact: 'Contact',
      openMenu: 'Ouvrir le menu',
      closeMenu: 'Fermer le menu',
      linkedinProfile: 'Profil LinkedIn',
      githubProfile: 'Profil GitHub',
      contactForm: 'Formulaire de contact',
    },
    hero: {
      roles: {
        security: 'Passionné Cybersécurité',
        fullstack: 'Développeur Full-Stack',
      },
      greeting: 'Salut, je suis',
      description: "Étudiant TEK3 à Epitech Nice, passionné par la cybersécurité et le développement full-stack.",
      viewProjects: 'Voir mes projets',
      contactMe: 'Me contacter',
      stats: {
        projects: 'Projets majeurs',
        ctf: 'Challenges CTF',
        languages: 'Langages maîtrisés',
      },
    },
    projects: {
      title: 'Mes Projets',
      subtitle: 'Une sélection de mes projets personnels et académiques, du développement full-stack à la sécurité informatique.',
      featured: 'Projet phare',
      personal: 'Perso',
      academic: 'Académique',
      viewDetails: 'Voir les détails',
      keyPoints: 'Points clés :',
      viewCode: 'Voir le code',
      noProjects: 'Aucun projet dans cette catégorie.',
    },
    achievements: {
      title: 'CTF & Challenges',
      subtitle: 'Compétitions de cybersécurité et challenges de sécurité',
      upcoming: 'À venir',
      ongoing: 'En cours',
      viewDetails: 'Voir les détails',
      stats: {
        machines: 'Machines root',
        flags: 'Flags',
        active: 'CTF actifs',
      },
      htbProfile: 'Profil HackTheBox',
    },
    skills: {
      title: 'Compétences',
      subtitle: "Technologies et outils que j'utilise quotidiennement pour créer des solutions robustes et sécurisées.",
      githubStats: 'Statistiques GitHub',
    },
    timeline: {
      title: 'Mon Parcours',
      subtitle: "Trois années d'études intensives à Epitech, des centaines de projets, et une passion grandissante pour la tech.",
    },
    contact: {
      title: 'Me Contacter',
      subtitle: "Intéressé par mon profil ? N'hésitez pas à me contacter pour discuter d'opportunités ou de projets.",
      letsTalk: 'Discutons ensemble',
      availability: "Actuellement en fin de TEK3 à Epitech Nice. Je débute un stage cybersécurité chez Monaco Telecom en mars 2026. N'hésitez pas à me contacter pour des collaborations ou opportunités.",
      location: 'Localisation',
      status: {
        title: 'Prochain stage',
        security: 'Cybersécurité · SSI',
        period: 'Mars - Juillet 2026',
        detail: "Automatisation du traitement des emails de phishing signalés. Étude de solutions, POC et recommandation d'architecture.",
      },
      form: {
        name: 'Nom',
        namePlaceholder: 'Votre nom',
        email: 'Email',
        emailPlaceholder: 'votre@email.com',
        message: 'Message',
        messagePlaceholder: 'Votre message...',
        send: 'Envoyer le message',
        sending: 'Envoi en cours...',
        success: 'Message envoyé avec succès !',
        captchaError: 'Veuillez compléter le captcha',
        networkError: 'Erreur réseau. Veuillez réessayer.',
        error: 'Une erreur est survenue',
      },
    },
    footer: {
      lastUpdate: 'Dernière mise à jour :',
    },
    challenge: {
      notFound: 'Challenge non trouvé',
      backTo: 'Retour à',
      backToAchievements: 'Retour aux achievements',
      unlockWriteup: 'Déverrouillez le writeup pour voir le flag',
      writeup: 'Writeup',
      summary: 'Résumé',
      previous: 'Précédent',
      next: 'Suivant',
      teamFirstBlood: 'Premier de l\'équipe',
      day: 'Jour',
    },
    machine: {
      solvedByMe: 'Résolu par moi',
    },
    competition: {
      notFound: 'Compétition non trouvée',
      backToHome: "Retour à l'accueil",
      backToCTF: 'Retour aux CTF',
      upcoming: 'À venir',
      ongoing: 'En cours',
      keyPoints: 'Points clés',
      technologies: 'Technologies & Outils',
      machines: 'Machines',
      unlocked: 'déverrouillée(s)',
      lockAll: 'Tout verrouiller',
      lock: 'Verrouiller',
      viewWriteup: 'Voir le writeup',
      challenges: 'Challenges',
      protectedWriteups: 'Writeups protégés',
      enterPassword: 'Entrez le mot de passe pour accéder aux writeups',
      passwordPlaceholder: 'Mot de passe...',
      unlock: 'Déverrouiller',
      wrongPassword: 'Mot de passe incorrect',
      unsolved: 'Non résolu',
      unlockToView: 'Déverrouillez pour voir le writeup',
      writeupComing: 'Writeup à venir...',
      personal: 'perso',
      team: 'Équipe',
    },
    encrypted: {
      protectedWriteup: 'Writeup protégé',
      protectedMessage: 'Ce writeup est protégé. Entrez le mot de passe pour accéder au contenu.',
      passwordPlaceholder: 'Mot de passe...',
      wrongPassword: 'Mot de passe incorrect',
      unlock: 'Déverrouiller',
      lock: 'Verrouiller',
    },
    vault: {
      title: 'Coffre-fort',
      locked: 'Verrouillé',
      unlocked: 'Déverrouillé',
      enterMasterPassword: 'Entrez le mot de passe principal pour déverrouiller tous les writeups.',
      passwordPlaceholder: 'Mot de passe principal...',
      wrongPassword: 'Mot de passe incorrect',
      unlock: 'Déverrouiller',
      lockAll: 'Tout verrouiller',
    },
  },
};
