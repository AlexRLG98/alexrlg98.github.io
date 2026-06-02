// Constantes centralisées du portfolio
export const CONTACT = {
  linkedin: 'https://www.linkedin.com/in/alexandre-raconnat-le-goff/',
  github: 'https://github.com/AlexRLG98',
  location: 'Monaco (Epitech Nice)',
  name: 'Alexandre Raconnat-Le Goff',
} as const;

export const STATS = {
  projects: 20,
  ctfChallenges: 85,
  languages: 9,
} as const;

// Date générée automatiquement au build
export const LAST_UPDATE = __BUILD_TIME__;
