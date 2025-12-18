type BilingualText = { fr: string; en: string };

export interface Competition {
  id: string;
  title: string;
  platform: string;
  description: string | BilingualText;
  rank: string | BilingualText;
  points?: number;
  personalPoints?: number;
  year: number;
  period: 'TEK1' | 'TEK2' | 'TEK3';
  highlights: (string | BilingualText)[];
  technologies: string[];
  team?: string;
  teamSize?: number;
  challenges?: string;
  flags?: string;
  status: 'completed' | 'ongoing' | 'upcoming';
  date?: string;
  startDate?: string; // Format: YYYY-MM-DD ou YYYY-MM-DDTHH:mm
  endDate?: string;   // Format: YYYY-MM-DD ou YYYY-MM-DDTHH:mm
  content?: string;
}

// Calcule le status automatiquement basé sur les dates
export function getComputedStatus(competition: Competition): 'completed' | 'ongoing' | 'upcoming' {
  if (!competition.startDate || !competition.endDate) {
    return competition.status; // Fallback au status manuel
  }

  const now = new Date();
  const start = new Date(competition.startDate);
  const end = new Date(competition.endDate);

  if (now < start) return 'upcoming';
  if (now > end) return 'completed';
  return 'ongoing';
}

export const htbProfile = 'https://app.hackthebox.com/users/1370190';

// CTF Jeopardy style competitions
export const ctfCompetitions: Competition[] = [
  {
    id: 'hackday-2026-qualifications',
    title: 'HackDay 2026 - Qualifications',
    platform: 'HackDayCTF',
    description: {
      fr: 'Compétition française de cybersécurité pour étudiants. Les 25 meilleures équipes des qualifications sont invitées à la finale on-site à l\'ESIEE Paris.',
      en: 'French cybersecurity competition for students. Top 25 teams from qualifications are invited to the on-site final at ESIEE Paris.'
    },
    rank: { fr: 'À venir', en: 'Upcoming' },
    year: 2026,
    period: 'TEK3',
    status: 'upcoming',
    date: '23-25 Jan 2026',
    startDate: '2026-01-23T19:00',
    endDate: '2026-01-25T19:00',
    team: 'SimianSec',
    teamSize: 6,
    highlights: [
      {
        fr: 'Qualifications online - Top 25 → Finale ESIEE Paris',
        en: 'Online qualifications - Top 25 → Final at ESIEE Paris'
      },
      {
        fr: 'Prix : 500€ + goodies sponsors pour les 3 gagnants',
        en: 'Prizes: 500€ + sponsor goodies for top 3'
      }
    ],
    technologies: ['Crypto', 'Forensic', 'Hardware', 'Web', 'Stegano', 'Reverse', 'Pwn']
  },
  {
    id: 'jeanne-dhack-ctf',
    title: "Jeanne d'Hack CTF 2026",
    platform: 'CTFd',
    description: {
      fr: "3ème édition du CTF Jeanne d'Hack. Compétition française sponsorisée par PentesterLab, Quarkslab, XMCO et Torii Security.",
      en: "3rd edition of Jeanne d'Hack CTF. French competition sponsored by PentesterLab, Quarkslab, XMCO and Torii Security."
    },
    rank: { fr: 'À venir', en: 'Upcoming' },
    year: 2026,
    period: 'TEK3',
    status: 'upcoming',
    date: '30 Jan - 1 Feb 2026',
    startDate: '2026-01-30T10:00',
    endDate: '2026-02-01T23:59',
    team: 'SimianSec',
    highlights: [
      {
        fr: 'CTF français - 3ème édition',
        en: 'French CTF - 3rd edition'
      },
      {
        fr: 'Sponsors : PentesterLab, Quarkslab, XMCO, Torii Security',
        en: 'Sponsors: PentesterLab, Quarkslab, XMCO, Torii Security'
      }
    ],
    technologies: ['Web', 'Pwn', 'Forensics', 'Crypto', 'Reverse', 'Misc']
  },
  {
    id: 'scarlet-ctf',
    title: 'Scarlet CTF 2026',
    platform: 'rCTF (Rutgers University)',
    description: {
      fr: 'CTF organisé par le Rutgers University Cybersecurity Club (RUSEC). Compétition beginner-friendly avec des challenges pour tous les niveaux.',
      en: 'CTF organized by Rutgers University Cybersecurity Club (RUSEC). Beginner-friendly competition with challenges for all skill levels.'
    },
    rank: { fr: '3ème Open · 6/762 🌍', en: '3rd Open · 6/762 🌍' },
    points: 10148,
    personalPoints: 2011,
    team: 'SimianSec',
    teamSize: 16,
    challenges: '27/31',
    flags: '5/27',
    year: 2026,
    period: 'TEK3',
    status: 'completed',
    date: '9-12 Jan 2026',
    startDate: '2026-01-09T18:00',
    endDate: '2026-01-12T06:00',
    highlights: [
      {
        fr: '3ème place Open Division · 6ème place mondiale 🌍 sur 762 équipes · $10 prize',
        en: '3rd place Open Division · 6th place worldwide 🌍 out of 762 teams · $10 prize'
      },
      {
        fr: '10148 points (2011 perso) - 27/31 challenges résolus',
        en: '10148 points (2011 personal) - 27/31 challenges solved'
      },
      {
        fr: 'Équipe SimianSec (16 membres)',
        en: 'Team SimianSec (16 members)'
      },
      {
        fr: 'Catégories complétées : Web 5/5, Forensics 4/4, Crypto 2/2, Binex 2/2',
        en: 'Completed categories: Web 5/5, Forensics 4/4, Crypto 2/2, Binex 2/2'
      }
    ],
    technologies: ['Web', 'Pwn', 'Forensics', 'Crypto', 'OSINT', 'Misc', 'Reverse']
  },
  {
    id: 'htb-university-ctf',
    title: 'University CTF 2025: Tinsel Trouble',
    platform: 'HackTheBox',
    description: {
      fr: 'Competition internationale universitaire HackTheBox. Jeopardy CTF avec challenges web, pwn, crypto, reversing et forensics.',
      en: 'HackTheBox international university competition. Jeopardy CTF with web, pwn, crypto, reversing and forensics challenges.'
    },
    rank: { fr: '3ème 🇫🇷 · 11/1014 🌍', en: '3rd 🇫🇷 · 11/1014 🌍' },
    points: 15475,
    personalPoints: 2150,
    team: 'SimianSec',
    teamSize: 30,
    challenges: '21/21',
    flags: '3/34',
    year: 2025,
    period: 'TEK3',
    status: 'completed',
    date: '19-21 Dec 2025',
    startDate: '2025-12-19T14:00',
    endDate: '2025-12-21T20:00',
    highlights: [
      {
        fr: '3ème place France 🇫🇷 · 11ème place mondiale 🌍 sur 1014 équipes',
        en: '3rd place France 🇫🇷 · 11th place worldwide 🌍 out of 1014 teams'
      },
      {
        fr: 'Tous les challenges complétés en 8h40 (jour 1)',
        en: 'All challenges completed in 8h40 (day 1)'
      },
      {
        fr: '15475 points - Tous les challenges (21/21) et flags (34/34) complétés',
        en: '15475 points - All challenges (21/21) and flags (34/34) completed'
      },
      {
        fr: 'Équipe SimianSec (30 membres)',
        en: 'Team SimianSec (30 members)'
      },
      {
        fr: 'Format Jeopardy : Web, Pwn, Crypto, Reversing, Forensics',
        en: 'Jeopardy format: Web, Pwn, Crypto, Reversing, Forensics'
      }
    ],
    technologies: ['Web', 'Pwn', 'Crypto', 'Reverse', 'Forensics']
  },
  {
    id: 'advent-of-cyber',
    title: 'Defis de Noel 2025',
    platform: 'CTFd Epitech',
    description: {
      fr: 'Calendrier de l\'avent CTF. Un challenge par jour couvrant reverse, stegano, forensique, crypto et programmation.',
      en: 'CTF advent calendar. One challenge per day covering reverse engineering, steganography, forensics, cryptography and programming.'
    },
    rank: '4/87',
    points: 182132,
    year: 2025,
    period: 'TEK3',
    status: 'completed',
    date: '1-24 Dec 2025',
    startDate: '2025-12-01T00:00',
    endDate: '2025-12-24T23:59',
    highlights: [
      {
        fr: '4ème place sur 87 participants - 182132 points',
        en: '4th place out of 87 participants - 182132 points'
      },
      {
        fr: 'Reverse : ROT13, ELF analysis, T9/XOR decoding, UPX unpacking',
        en: 'Reverse: ROT13, ELF analysis, T9/XOR decoding, UPX unpacking'
      },
      {
        fr: 'Stegano : EXIF, steghide, spectrogramme audio, PNG EOF',
        en: 'Stegano: EXIF, steghide, audio spectrogram, PNG EOF'
      },
      {
        fr: 'Forensique : ICMP exfiltration, FAT12 recovery, FSK decoding, Docker layers',
        en: 'Forensics: ICMP exfiltration, FAT12 recovery, FSK decoding, Docker layers'
      },
      {
        fr: 'Crypto : Mersenne Twister prediction, positional cipher',
        en: 'Crypto: Mersenne Twister prediction, positional cipher'
      }
    ],
    technologies: ['Python', 'Steghide', 'Sleuthkit', 'Wireshark', 'scipy', 'randcrack', 'UPX', 'Docker']
  },
  {
    id: 'htb-ctf-tryout',
    title: 'HTB CTF Try Out',
    platform: 'HackTheBox',
    description: {
      fr: 'Arena permanente HackTheBox pour s\'entrainer aux CTF. 37 challenges couvrant Web, Pwn, Reverse, Forensics, Crypto, Hardware, Blockchain et plus.',
      en: 'Permanent HackTheBox arena for CTF training. 37 challenges covering Web, Pwn, Reverse, Forensics, Crypto, Hardware, Blockchain and more.'
    },
    rank: '31/37',
    year: 2024,
    period: 'TEK3',
    status: 'ongoing',
    date: 'Jan 2024 - Dec 2026',
    startDate: '2024-01-01T00:00',
    endDate: '2026-12-31T23:59',
    highlights: [
      {
        fr: 'Web : SSTI, XXE, Command Injection, API exploitation',
        en: 'Web: SSTI, XXE, Command Injection, API exploitation'
      },
      {
        fr: 'Pwn : Buffer overflow, ret2win, ret2csu, ret2dlresolve',
        en: 'Pwn: Buffer overflow, ret2win, ret2csu, ret2dlresolve'
      },
      {
        fr: 'Reverse : Rust, PRNG prediction, 3D maze solving',
        en: 'Reverse: Rust, PRNG prediction, 3D maze solving'
      },
      {
        fr: 'Blockchain : Smart contract hash collision',
        en: 'Blockchain: Smart contract hash collision'
      }
    ],
    technologies: ['pwntools', 'Burp Suite', 'Ghidra', 'web3.py', 'Python']
  }
];

// Boot2Root / Machine challenges
export const bootToRoot: Competition[] = [
  {
    id: 'chisel',
    title: 'Chisel - Advanced Security',
    platform: 'CTFd Epitech / TryHackMe',
    description: {
      fr: '1ere place nationale Epitech. CTF organise sur CTFd avec machines boot2root hebergees sur TryHackMe. Exploitation de CVEs, pivoting reseau et privilege escalation.',
      en: '1st place nationally at Epitech. CTF organized on CTFd with boot2root machines hosted on TryHackMe. CVE exploitation, network pivoting and privilege escalation.'
    },
    rank: '1/114',
    points: 3600,
    personalPoints: 1850,
    year: 2025,
    period: 'TEK3',
    status: 'completed',
    date: '17 Nov - 7 Dec 2025',
    team: 'First Blood',
    teamSize: 2,
    challenges: '10/10',
    flags: '27/27',
    highlights: [
      {
        fr: '1ère place sur 114 équipes nationales',
        en: '1st place out of 114 national teams'
      },
      {
        fr: 'Tout complété en moins de 36h',
        en: 'All completed in less than 36h'
      },
      {
        fr: '3600 points (1850 personnels) - Toutes les machines (10/10) et flags (27/27) complétés',
        en: '3600 points (1850 personal) - All machines (10/10) and flags (27/27) completed'
      },
      {
        fr: 'Équipe First Blood (2 membres)',
        en: 'Team First Blood (2 members)'
      }
    ],
    technologies: ['Chisel', 'SSH Tunneling', 'PwnKit', 'MongoDB', 'TeamCity', 'Burp Suite', 'nmap']
  }
];
