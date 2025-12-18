export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface SkillCategory {
  id: string;
  name: { fr: string; en: string };
  icon: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    name: { fr: 'Langages', en: 'Languages' },
    icon: '💻',
    skills: [
      { name: 'C/C++', level: 90, category: 'lang' },
      { name: 'Python', level: 75, category: 'lang' },
      { name: 'JavaScript', level: 70, category: 'lang' },
      { name: 'Shell/Bash', level: 65, category: 'lang' },
      { name: 'TypeScript', level: 60, category: 'lang' },
      { name: 'SQL', level: 65, category: 'lang' },
    ]
  },
  {
    id: 'systems',
    name: { fr: 'Systèmes', en: 'Systems' },
    icon: '⚙️',
    skills: [
      { name: 'Linux/Unix', level: 85, category: 'systems' },
      { name: 'Network Programming', level: 75, category: 'systems' },
      { name: 'Multi-threading/IPC', level: 75, category: 'systems' },
      { name: 'Graphics (SFML)', level: 70, category: 'systems' },
    ]
  },
  {
    id: 'backend',
    name: { fr: 'Backend', en: 'Backend' },
    icon: '🔧',
    skills: [
      { name: 'FastAPI', level: 75, category: 'backend' },
      { name: 'Node.js/Express', level: 65, category: 'backend' },
      { name: 'PostgreSQL/SQLite', level: 70, category: 'backend' },
      { name: 'WebSocket', level: 65, category: 'backend' },
    ]
  },
  {
    id: 'devops',
    name: { fr: 'DevOps', en: 'DevOps' },
    icon: '🚀',
    skills: [
      { name: 'Git', level: 85, category: 'devops' },
      { name: 'Docker', level: 70, category: 'devops' },
      { name: 'CMake/Makefile', level: 80, category: 'devops' },
      { name: 'CI/CD', level: 60, category: 'devops' },
    ]
  },
  {
    id: 'security',
    name: { fr: 'Sécurité', en: 'Security' },
    icon: '🔐',
    skills: [
      { name: 'CTF (Web/Crypto/PWN)', level: 70, category: 'security' },
      { name: 'OSINT', level: 65, category: 'security' },
      { name: 'Reverse Engineering', level: 55, category: 'security' },
    ]
  },
  {
    id: 'ai',
    name: { fr: 'IA / Algorithmes', en: 'AI / Algorithms' },
    icon: '🧠',
    skills: [
      { name: 'Algorithms (Min-Max, A*)', level: 70, category: 'ai' },
      { name: 'Pandas/NumPy', level: 65, category: 'ai' },
      { name: 'Neural Networks', level: 55, category: 'ai' },
    ]
  },
];

export interface TimelineEntry {
  year: string;
  education?: {
    title: string;
    subtitle: string;
    description: { fr: string; en: string };
    highlights: string[];
    upcoming?: boolean;
  };
  work?: {
    title: { fr: string; en: string };
    company: string;
    department?: string;
    location?: string;
    type: 'internship' | 'job';
    partTime?: boolean;
    period: { fr: string; en: string };
    duration: { fr: string; en: string };
    description: { fr: string; en: string };
    highlights: string[];
    upcoming?: boolean;
    current?: boolean;
  }[];
}

export const timeline: TimelineEntry[] = [
  {
    year: '2026-2027',
    education: {
      title: 'TEK 4',
      subtitle: 'International Year',
      description: {
        fr: "Année internationale à l'étranger. Immersion professionnelle et culturelle. Destination à définir.",
        en: 'International year abroad. Professional and cultural immersion. Destination to be defined.'
      },
      highlights: ['International', 'Immersion', 'English'],
      upcoming: true
    }
  },
  {
    year: '2025-2026',
    education: {
      title: 'TEK 3',
      subtitle: 'Epitech Nice',
      description: {
        fr: "Lancement de l'EIP (Epitech Innovative Project). Projets : R-Type (C++ multijoueur), Area (automatisation). Piscine Moonshot et développement MVP.",
        en: 'EIP (Epitech Innovative Project) launch. Projects: R-Type (C++ multiplayer), Area (automation). Moonshot Pool and MVP development.'
      },
      highlights: ['EIP', 'R-Type', 'C++', 'Moonshot']
    },
    work: [
      {
        title: { fr: 'Stage Cybersécurité', en: 'Cybersecurity Internship' },
        company: 'À définir',
        type: 'internship',
        period: { fr: 'Mars - Juil. 2026', en: 'March - July 2026' },
        duration: { fr: '~5 mois', en: '~5 months' },
        description: {
          fr: 'Stage de fin de TEK3 (à définir).',
          en: 'End of TEK3 internship (to be defined).'
        },
        highlights: [],
        upcoming: true
      },
      {
        title: { fr: 'Stagiaire Cybersécurité', en: 'Cybersecurity Intern' },
        company: 'CHPG (Centre Hospitalier Princesse Grace)',
        department: 'DSIO',
        location: 'Monaco',
        type: 'internship',
        partTime: true,
        period: { fr: '15 Sept. 2025 - 27 Fév. 2026', en: 'Sept. 15, 2025 - Feb. 27, 2026' },
        duration: { fr: '~6 mois (Jeu/Ven)', en: '~6 months (Thu/Fri)' },
        description: {
          fr: 'Modélisation des chaînes d\'attaque cyber sur composants hospitaliers (MITRE ATT&CK, EBIOS RM, Egérie). Développement d\'outils PCA (supervision et provisionnement sécurisé).',
          en: 'Cyber attack chain modeling on hospital components (MITRE ATT&CK, EBIOS RM, Egérie). PCA tools development (monitoring and secure provisioning).'
        },
        highlights: ['MITRE ATT&CK', 'EBIOS RM', 'PCA'],
        current: true
      }
    ]
  },
  {
    year: '2024-2025',
    education: {
      title: 'TEK 2',
      subtitle: 'Epitech Nice',
      description: {
        fr: 'Projets avancés : Zappy, Raytracer, The Plazza, Arcade. Programmation orientée objet, graphisme 3D, multithreading.',
        en: 'Advanced projects: Zappy, Raytracer, The Plazza, Arcade. Object-oriented programming, 3D graphics, multithreading.'
      },
      highlights: ['C++', 'OOP', '3D Graphics', 'Concurrency']
    },
    work: [
      {
        title: { fr: 'Analyste SOC', en: 'SOC Analyst' },
        company: 'Monaco Cyber Sécurité',
        department: 'Monaco Digital SAM',
        location: 'Monaco',
        type: 'internship',
        period: { fr: 'Sept. - Déc. 2024', en: 'Sept. - Dec. 2024' },
        duration: { fr: '4 mois', en: '4 months' },
        description: {
          fr: "Analyse d'alertes au sein du SOC. Participation aux procédures de réponse aux incidents.",
          en: 'Alert analysis within the SOC. Participation in incident response procedures.'
        },
        highlights: ['SOC', 'CTI', 'Incident Response', 'SIEM']
      }
    ]
  },
  {
    year: '2023-2024',
    education: {
      title: 'TEK 1',
      subtitle: 'Epitech Nice',
      description: {
        fr: "Piscine C intensive (5 semaines). Projets : 42sh, my_printf, my_rpg, my_runner. Bases de l'algorithmie et du développement.",
        en: 'Intensive C Pool (5 weeks). Projects: 42sh, my_printf, my_rpg, my_runner. Fundamentals of algorithms and development.'
      },
      highlights: ['C', 'Unix', 'Algorithms', 'Shell']
    },
    work: [
      {
        title: { fr: 'Assistant Logistique', en: 'Logistics Assistant' },
        company: 'Catalano Shipping Services Mediterranean',
        location: 'Monaco',
        type: 'job',
        period: { fr: 'Juil. - Août 2023', en: 'July - Aug. 2023' },
        duration: { fr: '2 mois', en: '2 months' },
        description: {
          fr: 'Assistant logistique et informatique. Gestion de la chaîne logistique.',
          en: 'Logistics and IT assistant. Supply chain management.'
        },
        highlights: ['Logistics', 'Supply Chain']
      }
    ]
  },
  {
    year: '2022-2023',
    education: {
      title: 'BAC PRO MELEC',
      subtitle: 'Lycée Rainier III, Monaco',
      description: {
        fr: 'Baccalauréat Professionnel en Électrotechnique. Mention Bien.',
        en: 'Professional Baccalaureate in Electrical Engineering. With Honors.'
      },
      highlights: ['Electronics', 'Electricity', 'Automation']
    },
    work: [
      {
        title: { fr: 'Technicien Réseaux', en: 'Network Technician' },
        company: 'TELIS',
        location: 'Monaco',
        type: 'internship',
        period: { fr: 'Nov. - Déc. 2022', en: 'Nov. - Dec. 2022' },
        duration: { fr: '2 mois', en: '2 months' },
        description: {
          fr: 'Configuration de serveurs et des machines virtuelles. Services réseau.',
          en: 'Server and virtual machine configuration. Network services.'
        },
        highlights: ['System Config', 'Network Services', 'VMs']
      }
    ]
  }
];
