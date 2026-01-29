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

export interface TimelineEducation {
  title: string;
  subtitle: string;
  description: { fr: string; en: string };
  highlights: string[];
  startDate?: string; // Format: 'YYYY-MM-DD'
  endDate?: string;   // Format: 'YYYY-MM-DD'
  upcoming?: boolean; // Fallback si pas de dates
}

export interface TimelineWork {
  title: { fr: string; en: string };
  company: string | { fr: string; en: string };
  department?: string;
  location?: string;
  type: 'internship' | 'job';
  partTime?: boolean;
  period: { fr: string; en: string };
  duration: { fr: string; en: string };
  description: { fr: string; en: string };
  highlights: string[];
  startDate?: string; // Format: 'YYYY-MM-DD'
  endDate?: string;   // Format: 'YYYY-MM-DD'
  upcoming?: boolean; // Fallback si pas de dates
  current?: boolean;  // Fallback si pas de dates
}

export interface TimelineEntry {
  year: string;
  education?: TimelineEducation;
  work?: TimelineWork[];
}

// Calcule le status automatiquement en fonction des dates
export function getEducationStatus(education: TimelineEducation): 'completed' | 'ongoing' | 'upcoming' {
  if (!education.startDate || !education.endDate) {
    // Fallback au flag statique
    return education.upcoming ? 'upcoming' : 'completed';
  }

  const now = new Date();
  const start = new Date(education.startDate);
  const end = new Date(education.endDate);

  if (now < start) return 'upcoming';
  if (now > end) return 'completed';
  return 'ongoing';
}

export function getWorkStatus(work: TimelineWork): 'completed' | 'ongoing' | 'upcoming' {
  if (!work.startDate || !work.endDate) {
    // Fallback aux flags statiques
    if (work.upcoming) return 'upcoming';
    if (work.current) return 'ongoing';
    return 'completed';
  }

  const now = new Date();
  const start = new Date(work.startDate);
  const end = new Date(work.endDate);

  if (now < start) return 'upcoming';
  if (now > end) return 'completed';
  return 'ongoing';
}

export const timeline: TimelineEntry[] = [
  {
    year: '2026-2027',
    education: {
      title: 'UCLA Extension',
      subtitle: 'Los Angeles, California',
      description: {
        fr: "Année internationale à UCLA Extension. Double certification en Data Analytics et Cybersecurity. Python, R, Tableau, Big Data, Hadoop, sécurité des infrastructures.",
        en: 'International year at UCLA Extension. Dual certification in Data Analytics and Cybersecurity. Python, R, Tableau, Big Data, Hadoop, infrastructure security.'
      },
      highlights: ['Data Analytics', 'Cybersecurity', 'Python', 'Big Data', 'UCLA'],
      startDate: '2026-09-15',
      endDate: '2027-06-15'
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
      highlights: ['EIP', 'R-Type', 'C++', 'Moonshot'],
      startDate: '2025-09-01',
      endDate: '2026-08-31'
    },
    work: [
      {
        title: { fr: 'Stage Cybersécurité', en: 'Cybersecurity Internship' },
        company: { fr: 'En recherche', en: 'Searching' },
        type: 'internship',
        period: { fr: '23 Mars - 23 Juil. 2026', en: 'March 23 - July 23, 2026' },
        duration: { fr: '4 mois', en: '4 months' },
        description: {
          fr: 'Stage de fin de TEK3 en cybersécurité (pentest, SOC, GRC...).',
          en: 'End of TEK3 cybersecurity internship (pentest, SOC, GRC...).'
        },
        highlights: [],
        startDate: '2026-03-23',
        endDate: '2026-07-23'
      },
      {
        title: { fr: 'Stagiaire Cybersécurité', en: 'Cybersecurity Intern' },
        company: { fr: 'CHPG (Centre Hospitalier Princesse Grace)', en: 'CHPG (Princess Grace Hospital Center)' },
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
        startDate: '2025-09-15',
        endDate: '2026-02-27'
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
      highlights: ['C++', 'OOP', '3D Graphics', 'Concurrency'],
      startDate: '2024-09-01',
      endDate: '2025-08-31'
    },
    work: [
      {
        title: { fr: 'Analyste SOC', en: 'SOC Analyst' },
        company: { fr: 'Monaco Cyber Sécurité', en: 'Monaco Cyber Security' },
        department: 'Monaco Digital SAM',
        location: 'Monaco',
        type: 'internship',
        period: { fr: 'Sept. - Déc. 2024', en: 'Sept. - Dec. 2024' },
        duration: { fr: '4 mois', en: '4 months' },
        description: {
          fr: "Analyse d'alertes au sein du SOC. Participation aux procédures de réponse aux incidents.",
          en: 'Alert analysis within the SOC. Participation in incident response procedures.'
        },
        highlights: ['SOC', 'CTI', 'Incident Response', 'SIEM'],
        startDate: '2024-09-01',
        endDate: '2024-12-31'
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
      highlights: ['C', 'Unix', 'Algorithms', 'Shell'],
      startDate: '2023-09-01',
      endDate: '2024-08-31'
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
        highlights: ['Logistics', 'Supply Chain'],
        startDate: '2023-07-01',
        endDate: '2023-08-31'
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
      highlights: ['Electronics', 'Electricity', 'Automation'],
      startDate: '2022-09-01',
      endDate: '2023-06-30'
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
        highlights: ['System Config', 'Network Services', 'VMs'],
        startDate: '2022-11-01',
        endDate: '2022-12-31'
      }
    ]
  }
];
