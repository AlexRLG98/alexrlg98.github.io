type BilingualText = { fr: string; en: string };

export interface Project {
  id: string;
  title: string;
  description: string | BilingualText;
  longDescription: string | BilingualText;
  technologies: string[];
  category: 'ai' | 'security' | 'fullstack' | 'systems' | 'fintech' | 'tools';
  type: 'personal' | 'academic';
  image?: string;
  highlights: (string | BilingualText)[];
  year: number;
  github?: string;
}

export const projects: Project[] = [
  {
    id: 'autostrike',
    title: 'AutoStrike',
    description: {
      fr: 'Plateforme de Breach and Attack Simulation (BAS) pour valider les défenses de sécurité via le framework MITRE ATT&CK Enterprise.',
      en: 'Breach and Attack Simulation (BAS) platform to validate security defenses using the MITRE ATT&CK Enterprise framework.'
    },
    longDescription: {
      fr: "Projet EIP Epitech 2028. Plateforme permettant de simuler des attaques réelles en production, valider l'efficacité des contrôles de sécurité (EDR, SIEM, Firewall), visualiser la couverture MITRE ATT&CK et automatiser les tests de sécurité de manière continue.",
      en: "Epitech EIP 2028 project. Platform for simulating real attacks in production, validating security control effectiveness (EDR, SIEM, Firewall), visualizing MITRE ATT&CK coverage and automating continuous security testing."
    },
    technologies: ['Go', 'Rust', 'React', 'TypeScript', 'D3.js', 'TailwindCSS', 'SQLite', 'PostgreSQL', 'Docker', 'mTLS', 'WebSocket', 'MITRE ATT&CK'],
    category: 'security',
    type: 'academic',
    highlights: [
      { fr: '[EN COURS] Projet EIP Epitech - Promotion 2028', en: '[ONGOING] Epitech EIP Project - Class of 2028' },
      { fr: 'Architecture hexagonale : Server Go + Agent Rust + Dashboard React', en: 'Hexagonal architecture: Go Server + Rust Agent + React Dashboard' },
      { fr: 'Agent Rust multi-plateforme (Windows + Linux) avec évasion AV', en: 'Multi-platform Rust agent (Windows + Linux) with AV evasion' },
      { fr: '48 techniques MITRE ATT&CK couvrant 13 tactiques sur 14 (de Reconnaissance à Impact)', en: '48 MITRE ATT&CK techniques covering 13 out of 14 tactics (from Reconnaissance to Impact)' },
      { fr: 'Authentification complète : JWT, 5 rôles (admin/rssi/operator/analyst/viewer), 28 permissions RBAC', en: 'Full authentication: JWT, 5 roles (admin/rssi/operator/analyst/viewer), 28 RBAC permissions' },
      { fr: 'Matrice ATT&CK interactive avec Security Score, analytics et comparaison de périodes', en: 'Interactive ATT&CK matrix with Security Score, analytics and period comparison' },
      { fr: 'Communication sécurisée mTLS + WebSocket temps réel', en: 'Secure mTLS communication + real-time WebSocket' },
      { fr: 'Scheduling automatisé (cron/daily/weekly/monthly) + notifications email/webhook', en: 'Automated scheduling (cron/daily/weekly/monthly) + email/webhook notifications' },
      { fr: '780+ tests (95%+ coverage) - ~18,000 lignes de code', en: '780+ tests (95%+ coverage) - ~18,000 lines of code' },
      { fr: 'CI/CD complet (GitHub Actions, SonarCloud, Docker multi-stage)', en: 'Full CI/CD (GitHub Actions, SonarCloud, Docker multi-stage)' },
      { fr: 'Alternative open-source aux solutions BAS enterprise (Pentera, AttackIQ, SafeBreach), comparable à MITRE Caldera avec scoring, analytics et RBAC en plus', en: 'Open-source alternative to enterprise BAS solutions (Pentera, AttackIQ, SafeBreach), comparable to MITRE Caldera with scoring, analytics and RBAC on top' }
    ],
    year: 2028,
    github: 'https://github.com/AlexRLG98/AutoStrike'
  },
  {
    id: 'living-world',
    title: 'Living World Ecosystem',
    description: {
      fr: "Simulateur d'écosystème avancé avec IA, génétique mendélienne et réseaux de neurones individuels pour chaque créature.",
      en: "Advanced ecosystem simulator with AI, Mendelian genetics and individual neural networks for each creature."
    },
    longDescription: {
      fr: "Un simulateur d'écosystème où des créatures évoluent, apprennent et survivent grâce à l'IA et la sélection naturelle. Chaque créature possède son propre réseau de neurones et un ADN diploïde avec allèles dominants/récessifs.",
      en: "An ecosystem simulator where creatures evolve, learn and survive through AI and natural selection. Each creature has its own neural network and diploid DNA with dominant/recessive alleles."
    },
    technologies: ['Python', 'Pygame', 'NumPy', 'Neural Networks', 'Genetic Algorithms'],
    category: 'ai',
    type: 'personal',
    highlights: [
      { fr: 'Génétique mendélienne réaliste (ADN diploïde)', en: 'Realistic Mendelian genetics (diploid DNA)' },
      { fr: 'Réseaux de neurones individuels (8 inputs, 4 outputs)', en: 'Individual neural networks (8 inputs, 4 outputs)' },
      { fr: 'Génération procédurale de terrain (Perlin noise)', en: 'Procedural terrain generation (Perlin noise)' },
      { fr: 'Système climatique dynamique avec saisons', en: 'Dynamic climate system with seasons' },
      { fr: 'Coordination de chasse en meute (3-8 créatures)', en: 'Pack hunting coordination (3-8 creatures)' },
      { fr: 'Simulation de maladies et parasites', en: 'Disease and parasite simulation' },
      { fr: '45/45 tests unitaires passés', en: '45/45 unit tests passed' }
    ],
    year: 2025
  },
  {
    id: 'osint-tool',
    title: 'OSINT Investigation Platform',
    description: {
      fr: "Plateforme d'investigation automatisée pour due diligence, conformité AML/CFT et analyse de réputation.",
      en: "Automated investigation platform for due diligence, AML/CFT compliance and reputation analysis."
    },
    longDescription: {
      fr: "Outil professionnel combinant scraping LinkedIn, recherche multi-sources et analyse IA avec génération de rapports Word automatique.",
      en: "Professional tool combining LinkedIn scraping, multi-source research and AI analysis with automatic Word report generation."
    },
    technologies: ['Python', 'FastAPI', 'Selenium', 'Ollama/LLM', 'SQLite', 'WebSocket'],
    category: 'security',
    type: 'personal',
    highlights: [
      { fr: '[EN COURS] API REST FastAPI avec WebSocket temps réel', en: '[ONGOING] FastAPI REST API with real-time WebSocket' },
      { fr: 'Scraping LinkedIn (expériences, éducation, compétences)', en: 'LinkedIn scraping (experience, education, skills)' },
      { fr: 'Algorithme Map-Reduce pour contextes larges', en: 'Map-Reduce algorithm for large contexts' },
      { fr: "5 types d'investigation (AML, Réputation, Background...)", en: '5 investigation types (AML, Reputation, Background...)' },
      { fr: 'Génération automatique de rapports Word', en: 'Automatic Word report generation' },
      { fr: 'Interface web interactive', en: 'Interactive web interface' },
      { fr: 'Intégration LLM local (Ollama)', en: 'Local LLM integration (Ollama)' }
    ],
    year: 2026
  },
  {
    id: 'my-ctf',
    title: 'My CTF',
    description: {
      fr: '61 challenges de sécurité couvrant 7 catégories : Web, Crypto, PWN, Reverse, Forensics, Misc et Stéganographie.',
      en: '61 security challenges covering 7 categories: Web, Crypto, PWN, Reverse, Forensics, Misc and Steganography.'
    },
    longDescription: {
      fr: 'Plateforme CTF complète avec scoring dynamique, ~45,000 points totaux, conçue pour des joueurs avancés.',
      en: 'Complete CTF platform with dynamic scoring, ~45,000 total points, designed for advanced players.'
    },
    technologies: ['Python', 'C', 'Docker', 'CTFd', 'Rust', '.NET'],
    category: 'security',
    type: 'personal',
    highlights: [
      { fr: '[EN COURS] 61 challenges uniques', en: '[ONGOING] 61 unique challenges' },
      { fr: '7 catégories de sécurité', en: '7 security categories' },
      { fr: 'Challenges Web : SQLi, SSTI, SSRF, JWT, Prototype Pollution', en: 'Web Challenges: SQLi, SSTI, SSRF, JWT, Prototype Pollution' },
      { fr: 'Challenges Crypto : RSA, ECC, Lattice attacks', en: 'Crypto Challenges: RSA, ECC, Lattice attacks' },
      { fr: 'Challenges PWN : Buffer overflow, ROP, Heap exploitation', en: 'PWN Challenges: Buffer overflow, ROP, Heap exploitation' },
      { fr: 'Infrastructure Docker complète', en: 'Complete Docker infrastructure' },
      { fr: 'Scoring dynamique', en: 'Dynamic scoring' }
    ],
    year: 2026
  },
  {
    id: 'cryptobot',
    title: 'CryptoBot Trading',
    description: {
      fr: 'Bot de trading crypto automatisé avec stratégie RSI + MACD et dashboard temps réel interactif.',
      en: 'Automated crypto trading bot with RSI + MACD strategy and interactive real-time dashboard.'
    },
    longDescription: {
      fr: 'Bot de trading pour Binance avec interface terminal et dashboard web, incluant paper trading et backtesting.',
      en: 'Trading bot for Binance with terminal interface and web dashboard, including paper trading and backtesting.'
    },
    technologies: ['Python', 'Dash', 'Plotly', 'Pandas', 'Binance API', 'SQLAlchemy'],
    category: 'fintech',
    type: 'personal',
    highlights: [
      { fr: 'Dashboard temps réel interactif', en: 'Interactive real-time dashboard' },
      { fr: 'Indicateurs RSI + MACD', en: 'RSI + MACD indicators' },
      { fr: 'Gestion de portfolio et risque', en: 'Portfolio and risk management' },
      { fr: 'Mode paper trading (simulation)', en: 'Paper trading mode (simulation)' },
      { fr: 'Capacités de backtesting', en: 'Backtesting capabilities' },
      { fr: 'Notifications Telegram', en: 'Telegram notifications' },
      { fr: 'Support multi-paires', en: 'Multi-pair support' }
    ],
    year: 2025
  },
  {
    id: 'sports-betting',
    title: 'Sports Betting Bot',
    description: {
      fr: 'Bot de paris sportifs avec scraping Flashscore/Sofascore en temps réel via Playwright.',
      en: 'Sports betting bot with real-time Flashscore/Sofascore scraping via Playwright.'
    },
    longDescription: {
      fr: 'Système automatisé de collecte de données sportives live avec analyse des cotes et affichage console.',
      en: 'Automated live sports data collection system with odds analysis and console display.'
    },
    technologies: ['Python', 'Playwright', 'Docker', 'GitHub Actions', 'Poetry', 'Typer'],
    category: 'tools',
    type: 'personal',
    highlights: [
      { fr: 'Scraping multi-sources (Flashscore, Sofascore)', en: 'Multi-source scraping (Flashscore, Sofascore)' },
      { fr: 'Extraction scores et stats live', en: 'Live scores and stats extraction' },
      { fr: 'CLI avec commandes multiples', en: 'CLI with multiple commands' },
      { fr: 'Conteneurisation Docker', en: 'Docker containerization' },
      'Pipeline CI/CD GitHub Actions',
      'Build system Makefile'
    ],
    year: 2025
  },
  {
    id: 'rtype',
    title: 'R-Type Game Engine',
    description: {
      fr: 'Jeu multijoueur C++23 (33k+ lignes) avec architecture hexagonale, système graphique multi-backend SDL2/SFML et voice chat temps réel.',
      en: 'Multiplayer C++23 game (33k+ lines) with hexagonal architecture, multi-backend SDL2/SFML graphics system and real-time voice chat.'
    },
    longDescription: {
      fr: "Clone du jeu R-Type avec architecture hexagonale (ports & adapters), serveur multi-protocole (TCP:4125 auth TLS + UDP:4124 gameplay 20Hz + UDP:4126 voice chat Opus), plugins graphiques dynamiques (dlopen) et accessibilité (modes daltonien, remapping clavier). CI/CD Jenkins et documentation MkDocs 42 pages.",
      en: "R-Type game clone with hexagonal architecture (ports & adapters), multi-protocol server (TCP:4125 TLS auth + UDP:4124 gameplay 20Hz + UDP:4126 Opus voice chat), dynamic graphics plugins (dlopen) and accessibility (colorblind modes, key remapping). Jenkins CI/CD and 42-page MkDocs documentation."
    },
    technologies: ['C++23', 'Boost.Asio', 'OpenSSL', 'SFML', 'SDL2', 'PortAudio', 'Opus', 'CMake', 'vcpkg', 'Docker', 'Jenkins', 'MkDocs', 'Google Test', 'spdlog'],
    category: 'systems',
    type: 'academic',
    highlights: [
      { fr: 'Architecture Hexagonale (Domain/Application/Infrastructure) avec ports & adapters', en: 'Hexagonal Architecture (Domain/Application/Infrastructure) with ports & adapters' },
      { fr: 'Serveur multi-protocole : TCP:4125 (auth TLS) + UDP:4124 (gameplay 20Hz) + UDP:4126 (voice)', en: 'Multi-protocol server: TCP:4125 (TLS auth) + UDP:4124 (gameplay 20Hz) + UDP:4126 (voice)' },
      { fr: 'Plugins graphiques dynamiques SDL2/SFML via dlopen/LoadLibrary', en: 'Dynamic SDL2/SFML graphics plugins via dlopen/LoadLibrary' },
      { fr: 'Voice chat temps réel avec PortAudio + codec Opus (32kbps)', en: 'Real-time voice chat with PortAudio + Opus codec (32kbps)' },
      { fr: 'Accessibilité : modes daltonien (protanopie, deutéranopie, tritanopie), remapping clavier', en: 'Accessibility: colorblind modes (protanopia, deuteranopia, tritanopia), key remapping' },
      { fr: 'Client-Side Prediction pour mouvement fluide malgré la latence', en: 'Client-Side Prediction for smooth movement despite latency' },
      'Value Objects DDD : Health, Position, Email, Password',
      { fr: '12 loggers spdlog (6 client + 6 serveur) avec rotation automatique', en: '12 spdlog loggers (6 client + 6 server) with automatic rotation' },
      { fr: 'CI/CD Jenkins avec artifacts cross-platform (Linux/Windows/macOS)', en: 'Jenkins CI/CD with cross-platform artifacts (Linux/Windows/macOS)' },
      { fr: 'Documentation MkDocs Material (42 pages)', en: 'MkDocs Material documentation (42 pages)' },
      { fr: '[BONUS] Nix Flake pour environnement reproductible', en: '[BONUS] Nix Flake for reproducible environment' }
    ],
    year: 2026,
    github: 'https://github.com/AlexRLG98/rtype'
  },
  {
    id: 'gomoku-ai',
    title: 'Gomoku AI',
    description: {
      fr: 'Bot Gomoku compétitif (~2600 Elo) : PVS/NegaScout, Threat Space Search, table de transposition et Discord Bot.',
      en: 'Competitive Gomoku bot (~2600 Elo): PVS/NegaScout, Threat Space Search, transposition table and Discord Bot.'
    },
    longDescription: {
      fr: "Bot Gomoku compatible Piskvork avec Minimax Alpha-Beta, PVS/NegaScout, Iterative Deepening adaptatif (depth 4→6), table de transposition, bitboards et ThreatBoard. 6 phases d'optimisation (~2450-2700 Elo). Bonus : Discord Bot 1v1 avec ranking et Brawl Toolkit CLI.",
      en: "Piskvork-compatible Gomoku bot with Minimax Alpha-Beta, PVS/NegaScout, adaptive Iterative Deepening (depth 4→6), transposition table, bitboards and ThreatBoard. 6 optimization phases (~2450-2700 Elo). Bonus: Discord Bot 1v1 with ranking and Brawl Toolkit CLI."
    },
    technologies: ['C++17', 'Minimax', 'Alpha-Beta', 'NNUE', 'Bitboards', 'Zobrist Hashing', 'Transposition Table', 'Piskvork Protocol'],
    category: 'ai',
    type: 'academic',
    highlights: [
      { fr: 'PVS/NegaScout avec Iterative Deepening adaptatif (depth 4→6)', en: 'PVS/NegaScout with adaptive Iterative Deepening (depth 4→6)' },
      { fr: 'Threat Space Search : VCF/VCT pour séquences forcées 25-40 coups', en: 'Threat Space Search: VCF/VCT for 25-40 move forced sequences' },
      { fr: 'Table de transposition 2M entrées (~40MB) avec aging', en: 'Transposition table 2M entries (~40MB) with aging' },
      'Bitboards 4 rotations : win detection O(4) vs O(400)',
      { fr: '65 patterns de menaces (FIVE, OPEN_FOUR, FOUR, OPEN_THREE...)', en: '65 threat patterns (FIVE, OPEN_FOUR, FOUR, OPEN_THREE...)' },
      { fr: 'Move ordering avancé : History Heuristic, Killer Moves, Countermove', en: 'Advanced move ordering: History Heuristic, Killer Moves, Countermove' },
      { fr: 'Pruning : Null Move, Futility, Razoring, LMR logarithmique', en: 'Pruning: Null Move, Futility, Razoring, logarithmic LMR' },
      { fr: 'Threat Board : évaluation O(1) vs O(1600)', en: 'Threat Board: O(1) evaluation vs O(1600)' },
      { fr: 'Zobrist Hashing O(1) incrémental pour TT', en: 'Incremental O(1) Zobrist Hashing for TT' },
      { fr: '[BONUS] NNUE Neural Network (128→32→1) quantifié int16/int8', en: '[BONUS] NNUE Neural Network (128→32→1) quantized int16/int8' },
      { fr: '[BONUS] Proof-Number Search pour prouver positions', en: '[BONUS] Proof-Number Search to prove positions' },
      { fr: '[BONUS] Opening Book 1000+ positions avec 8 symétries', en: '[BONUS] Opening Book 1000+ positions with 8 symmetries' },
      '[BONUS] Discord Bot : 1v1, ranking, replays',
      '[BONUS] Brawl Toolkit : stats, leaderboard, replay, spy, watch',
      { fr: 'Tests complets : unitaires C++, tactiques Python, stress, tournois', en: 'Complete tests: C++ unit, Python tactical, stress, tournaments' }
    ],
    year: 2026
  },
  {
    id: 'zappy',
    title: 'Zappy',
    description: {
      fr: 'Jeu réseau multijoueur complet : serveur C avec poll(), GUI 2D SFML en C++ et IA autonome en Python.',
      en: 'Complete multiplayer network game: C server with poll(), SFML 2D GUI in C++ and autonomous AI in Python.'
    },
    longDescription: {
      fr: "Simulation du monde Trantor où des équipes s'affrontent pour atteindre le niveau 8 via des rituels d'élévation. Architecture 3 binaires : serveur C single-thread avec multiplexage poll(), client graphique C++/SFML avec sprites animés, et IA Python avec machine à états.",
      en: "Trantor world simulation where teams compete to reach level 8 through elevation rituals. 3-binary architecture: single-thread C server with poll() multiplexing, C++/SFML graphics client with animated sprites, and Python AI with state machine."
    },
    technologies: ['C', 'C++17', 'Python', 'SFML', 'TCP Sockets', 'poll()', 'FSM'],
    category: 'systems',
    type: 'academic',
    highlights: [
      { fr: 'Serveur C single-thread avec poll() (socket multiplexing)', en: 'Single-thread C server with poll() (socket multiplexing)' },
      { fr: 'Protocole GUI complet (msz, bct, pnw, ppo, plv, pin, pbc, pic, pie...)', en: 'Complete GUI protocol (msz, bct, pnw, ppo, plv, pin, pbc, pic, pie...)' },
      { fr: 'Toutes les commandes AI : Forward, Look, Inventory, Take, Set, Broadcast, Fork, Eject, Incantation', en: 'All AI commands: Forward, Look, Inventory, Take, Set, Broadcast, Fork, Eject, Incantation' },
      { fr: 'GUI SFML 2D avec 4 skins de personnages animés', en: 'SFML 2D GUI with 4 animated character skins' },
      { fr: '[BONUS] Fond animé dynamique (tempête, 100+ frames)', en: '[BONUS] Dynamic animated background (storm, 100+ frames)' },
      { fr: '[BONUS] Curseur custom, scoreboard équipes, panel inventaire', en: '[BONUS] Custom cursor, team scoreboard, inventory panel' },
      { fr: '[BONUS] Suivi de joueur (lock camera), bulles de broadcast', en: '[BONUS] Player tracking (lock camera), broadcast bubbles' },
      { fr: 'IA Python avec machine à états (FSM)', en: 'Python AI with state machine (FSM)' },
      { fr: 'Algorithme BFS pour pathfinding vers ressources', en: 'BFS algorithm for resource pathfinding' },
      { fr: 'Gestion des 7 ressources', en: 'Management of 7 resources' },
      { fr: "Système d'élévation complet (niveau 1→8 avec prérequis)", en: 'Complete elevation system (level 1→8 with prerequisites)' },
      { fr: 'Gestion des oeufs (Fork, éclosion, mort)', en: 'Egg management (Fork, hatching, death)' }
    ],
    year: 2025
  },
  {
    id: 'raytracer',
    title: 'Raytracer',
    description: {
      fr: 'Moteur de ray tracing C++ avec éclairage Phong, ombres portées et support multi-lumières.',
      en: 'C++ ray tracing engine with Phong lighting, cast shadows and multi-light support.'
    },
    longDescription: {
      fr: "Implémentation d'un moteur de rendu par lancer de rayons avec interface IPrimitive, parser libconfig++ et système d'éclairage complet incluant des bonus comme le modèle Phong et les point lights.",
      en: "Implementation of a ray casting render engine with IPrimitive interface, libconfig++ parser and complete lighting system including bonuses like Phong model and point lights."
    },
    technologies: ['C++17', 'libconfig++', 'PPM', 'OOP', 'Makefile'],
    category: 'systems',
    type: 'academic',
    highlights: [
      { fr: 'Interface IPrimitive polymorphique', en: 'Polymorphic IPrimitive interface' },
      { fr: 'Primitives : Sphere, Plane, Cylinder (limité avec yMin/yMax)', en: 'Primitives: Sphere, Plane, Cylinder (limited with yMin/yMax)' },
      { fr: 'Transformation : Translation sur tous les objets', en: 'Transformation: Translation on all objects' },
      { fr: 'Lumière directionnelle + ambiante', en: 'Directional + ambient light' },
      { fr: '[BONUS] Point lights multiples', en: '[BONUS] Multiple point lights' },
      { fr: '[BONUS] Modèle de réflexion Phong (spéculaire)', en: '[BONUS] Phong reflection model (specular)' },
      { fr: 'Ombres portées (shadow rays)', en: 'Cast shadows (shadow rays)' },
      { fr: 'Parser libconfig++ pour scènes .cfg', en: 'libconfig++ parser for .cfg scenes' },
      { fr: 'Export PPM (P6 binaire)', en: 'PPM export (P6 binary)' },
      { fr: 'Fond dégradé ciel dynamique', en: 'Dynamic sky gradient background' }
    ],
    year: 2025
  },
  {
    id: 'plazza',
    title: 'The Plazza',
    description: {
      fr: 'Simulation de pizzeria multi-process/thread avec load balancing, IPC, Thread Pool et interface graphique SFML.',
      en: 'Pizzeria simulation with multi-process/thread, load balancing, IPC, Thread Pool and SFML GUI.'
    },
    longDescription: {
      fr: 'Simulation complète de pizzeria : réception des commandes, cuisines (processus fils), cuisiniers (threads) et gestion des stocks. Architecture avancée de concurrence avec bonus GUI.',
      en: 'Complete pizzeria simulation: order reception, kitchens (child processes), cooks (threads) and stock management. Advanced concurrency architecture with GUI bonus.'
    },
    technologies: ['C++17', 'Fork/Processes', 'Thread Pool', 'IPC/Pipes', 'SFML', 'Mutex/CondVar'],
    category: 'systems',
    type: 'academic',
    highlights: [
      { fr: 'Cuisines = processus fils (fork dynamique)', en: 'Kitchens = child processes (dynamic fork)' },
      { fr: 'Cuisiniers = threads avec Thread Pool générique', en: 'Cooks = threads with generic Thread Pool' },
      { fr: 'Load balancing des commandes entre cuisines', en: 'Order load balancing between kitchens' },
      { fr: 'IPC pipes pour communication réception/cuisines', en: 'IPC pipes for reception/kitchen communication' },
      { fr: 'Encapsulation objets : MyMutex, MyLockGuard, MyCondVar', en: 'Object encapsulation: MyMutex, MyLockGuard, MyCondVar' },
      { fr: 'Sérialisation pack/unpack des messages pizza', en: 'Pizza message pack/unpack serialization' },
      { fr: "Stock d'ingrédients avec régénération automatique", en: 'Ingredient stock with automatic regeneration' },
      { fr: 'Fermeture automatique cuisine inactive (5s)', en: 'Auto-close inactive kitchen (5s)' },
      { fr: '[BONUS] Interface graphique SFML complète', en: '[BONUS] Complete SFML GUI' },
      { fr: '[BONUS] Système de logging coloré', en: '[BONUS] Colored logging system' }
    ],
    year: 2024
  },
  {
    id: 'solarx',
    title: 'SolarX Monitor',
    description: {
      fr: 'Système de monitoring solaire avec collecte de données onduleur et dashboard Streamlit.',
      en: 'Solar monitoring system with inverter data collection and Streamlit dashboard.'
    },
    longDescription: {
      fr: 'Application IoT de suivi de production solaire avec automatisation cron et visualisation.',
      en: 'IoT application for solar production tracking with cron automation and visualization.'
    },
    technologies: ['Python', 'Streamlit', 'SQLite', 'Cron', 'IoT'],
    category: 'tools',
    type: 'personal',
    highlights: [
      { fr: 'Collecte automatisée de données', en: 'Automated data collection' },
      { fr: 'Dashboard de visualisation', en: 'Visualization dashboard' },
      { fr: 'Planification cron', en: 'Cron scheduling' },
      { fr: 'Historique de production', en: 'Production history' },
      { fr: 'Intégration onduleur', en: 'Inverter integration' }
    ],
    year: 2025
  },
  {
    id: 'whanos',
    title: 'Whanos CI/CD Platform',
    description: {
      fr: 'Infrastructure DevOps automatisée : détection de langage, containerisation et déploiement Kubernetes en une commande.',
      en: 'Automated DevOps infrastructure: language detection, containerization and Kubernetes deployment in one command.'
    },
    longDescription: {
      fr: 'Plateforme CI/CD complète combinant Docker, Jenkins, Ansible et Kubernetes. Détecte automatiquement le langage (C, Java, JS, Python, Befunge), génère les Dockerfiles, push vers un registry privé et déploie sur cluster K8s.',
      en: 'Complete CI/CD platform combining Docker, Jenkins, Ansible and Kubernetes. Automatically detects language (C, Java, JS, Python, Befunge), generates Dockerfiles, pushes to private registry and deploys to K8s cluster.'
    },
    technologies: ['Docker', 'Kubernetes', 'Jenkins', 'Ansible', 'Shell', 'k3d'],
    category: 'tools',
    type: 'academic',
    highlights: [
      { fr: 'Détection automatique du langage (5 langages)', en: 'Automatic language detection (5 languages)' },
      { fr: 'Génération dynamique de Dockerfiles', en: 'Dynamic Dockerfile generation' },
      { fr: 'Registry Docker privé intégré', en: 'Integrated private Docker registry' },
      { fr: 'Déploiement Kubernetes automatisé', en: 'Automated Kubernetes deployment' },
      { fr: 'Cluster multi-nœuds (k3d)', en: 'Multi-node cluster (k3d)' },
      'Jenkins Configuration as Code',
      { fr: 'Déploiement one-command avec Ansible', en: 'One-command deployment with Ansible' }
    ],
    year: 2025
  },
  {
    id: 'area',
    title: 'AREA Platform',
    description: {
      fr: "Plateforme d'automatisation IFTTT/Zapier-like : serveur Node.js/Express, client web React + visual flow builder, app mobile Expo.",
      en: "IFTTT/Zapier-like automation platform: Node.js/Express server, React web client + visual flow builder, Expo mobile app."
    },
    longDescription: {
      fr: "Plateforme d'automatisation connectant 8 services (GitHub, Gmail, Outlook, Slack, Spotify, Twitch, Timer, Weather) via 29 actions et 19 réactions. Architecture 3-tiers.",
      en: "Automation platform connecting 8 services (GitHub, Gmail, Outlook, Slack, Spotify, Twitch, Timer, Weather) via 29 actions and 19 reactions. 3-tier architecture."
    },
    technologies: ['TypeScript', 'React', 'Expo', 'Node.js', 'Express', 'PostgreSQL', 'Docker', 'OAuth2', 'ReactFlow', 'Zustand', 'Tailwind'],
    category: 'fullstack',
    type: 'academic',
    highlights: [
      { fr: '8 services intégrés : GitHub, Gmail, Microsoft/Outlook, Slack, Spotify, Twitch, Timer, Weather', en: '8 integrated services: GitHub, Gmail, Microsoft/Outlook, Slack, Spotify, Twitch, Timer, Weather' },
      { fr: '29 actions (triggers) + 19 réactions implémentées', en: '29 actions (triggers) + 19 reactions implemented' },
      '[BONUS] Visual Flow Builder avec @xyflow/react (drag-and-drop, MiniMap, routing)',
      { fr: '[BONUS] Mode Flow v2 : chaînage de plusieurs actions/réactions', en: '[BONUS] Flow v2 mode: chaining multiple actions/reactions' },
      { fr: '[BONUS] Encryption AES-256-CBC des tokens OAuth en BDD', en: '[BONUS] AES-256-CBC encryption of OAuth tokens in DB' },
      'OAuth2 pour 7 providers (Google, GitHub, Slack, Discord, Microsoft, Twitch, Spotify)',
      { fr: 'HookManager : polling automatique des actions avec déduplication', en: 'HookManager: automatic action polling with deduplication' },
      { fr: 'App mobile React Native/Expo avec expo-router et APK pré-compilé', en: 'React Native/Expo mobile app with expo-router and pre-compiled APK' },
      { fr: 'Email verification avec tokens sécurisés (bcrypt + JWT)', en: 'Email verification with secure tokens (bcrypt + JWT)' },
      'Docker Compose : server:8080, client_web:8081, client_mobile (APK), PostgreSQL, Ngrok',
      { fr: 'Endpoint /about.json conforme au PDF du projet', en: 'PDF-compliant /about.json endpoint' },
      { fr: 'Multi-language (i18n) sur le client web', en: 'Multi-language (i18n) on web client' }
    ],
    year: 2025
  },
  {
    id: 'arcade',
    title: 'Arcade Gaming Platform',
    description: {
      fr: 'Plateforme de jeux rétro modulaire avec chargement dynamique (dlopen/dlclose) de bibliothèques graphiques et de jeux.',
      en: 'Modular retro gaming platform with dynamic loading (dlopen/dlclose) of graphics libraries and games.'
    },
    longDescription: {
      fr: "Plateforme de gaming extensible permettant de charger dynamiquement des bibliothèques graphiques (SFML, SDL2, Ncurses) et des jeux sans recompilation.",
      en: "Extensible gaming platform allowing dynamic loading of graphics libraries (SFML, SDL2, Ncurses) and games without recompilation."
    },
    technologies: ['C++17', 'SFML', 'SDL2', 'NCurses', 'dlopen/dlclose', 'CMake', 'Makefile'],
    category: 'systems',
    type: 'academic',
    highlights: [
      { fr: 'Encapsulation libdl (DynamicLibLoader)', en: 'libdl encapsulation (DynamicLibLoader)' },
      { fr: '3 bibliothèques graphiques : NCurses, SDL2, SFML', en: '3 graphics libraries: NCurses, SDL2, SFML' },
      { fr: '2 jeux : Snake et Minesweeper', en: '2 games: Snake and Minesweeper' },
      { fr: 'Interfaces IGraphicLib et IGameLib partagées', en: 'Shared IGraphicLib and IGameLib interfaces' },
      { fr: 'Hot-swap des libs graphiques à la volée', en: 'Hot-swap graphics libs on the fly' },
      { fr: 'Système de scores persistant (ScoreManager)', en: 'Persistent score system (ScoreManager)' },
      { fr: "Sauvegarde/restauration d'état de partie", en: 'Game state save/restore' },
      { fr: 'Menu interactif avec saisie nom joueur', en: 'Interactive menu with player name input' },
      { fr: 'Sprites SDL2/SFML avec fallback NCurses', en: 'SDL2/SFML sprites with NCurses fallback' },
      { fr: 'Collaboration inter-groupes (interfaces compatibles)', en: 'Inter-group collaboration (compatible interfaces)' }
    ],
    year: 2025
  },
  {
    id: 'nanotekspice',
    title: 'NanoTekSpice',
    description: {
      fr: 'Simulateur de circuits logiques numériques avec état Tristate, parsing de fichiers .nts et shell interactif.',
      en: 'Digital logic circuit simulator with Tristate state, .nts file parsing and interactive shell.'
    },
    longDescription: {
      fr: 'Simulateur de circuits électroniques digitaux basé sur la logique booléenne à 3 états (True, False, Undefined). Parsing de circuits depuis fichiers .nts et simulation tick par tick.',
      en: 'Digital electronic circuit simulator based on 3-state Boolean logic (True, False, Undefined). Circuit parsing from .nts files and tick-by-tick simulation.'
    },
    technologies: ['C++17', 'OOP', 'Factory Pattern', 'CMake', 'Makefile'],
    category: 'systems',
    type: 'academic',
    highlights: [
      { fr: 'Interface nts::IComponent polymorphique', en: 'Polymorphic nts::IComponent interface' },
      'Tristate logic (TRUE/FALSE/UNDEFINED)',
      'Factory pattern avec std::map<string, lambda>',
      { fr: 'AbstractChipset avec gestion automatique des pins', en: 'AbstractChipset with automatic pin management' },
      'LogicGates helpers (applyAnd, applyOr, applyNand, applyNor)',
      { fr: 'Composants spéciaux : input, output, clock, true, false', en: 'Special components: input, output, clock, true, false' },
      { fr: 'Gates élémentaires : and, or, xor, not', en: 'Elementary gates: and, or, xor, not' },
      'Chipsets 40xx : 4001 (NOR), 4011 (NAND), 4030 (XOR), 4069 (NOT), 4071 (OR), 4081 (AND)',
      { fr: 'Additionneur 4 bits : 4008', en: '4-bit adder: 4008' },
      { fr: "Parser robuste avec gestion d'erreurs complète", en: 'Robust parser with complete error handling' },
      { fr: 'Shell interactif avec gestion SIGINT pour loop', en: 'Interactive shell with SIGINT handling for loop' },
      { fr: '43 dossiers de tests (gates, chipsets, erreurs)', en: '43 test folders (gates, chipsets, errors)' }
    ],
    year: 2025
  },
  {
    id: 'panoramix',
    title: 'Panoramix',
    description: {
      fr: 'Simulation multithreadée du village gaulois avec sémaphores, mutex et problème producteur-consommateur.',
      en: 'Multithreaded Gallic village simulation with semaphores, mutex and producer-consumer problem.'
    },
    longDescription: {
      fr: "Simulation inspirée d'Astérix : villageois (threads) combattent des romains après avoir bu la potion magique préparée par le druide. Problème classique de synchronisation.",
      en: "Asterix-inspired simulation: villagers (threads) fight Romans after drinking the magic potion prepared by the druid. Classic synchronization problem."
    },
    technologies: ['C', 'Pthreads', 'Semaphores', 'Mutex', 'Makefile'],
    category: 'systems',
    type: 'academic',
    highlights: [
      { fr: 'Chaque villageois = 1 thread indépendant', en: 'Each villager = 1 independent thread' },
      { fr: 'Druide = 1 thread producteur', en: 'Druid = 1 producer thread' },
      { fr: 'Villageois = threads consommateurs', en: 'Villagers = consumer threads' },
      'POSIX semaphores (sem_wait/sem_post)',
      { fr: 'Mutex pthread pour accès concurrent au pot', en: 'Pthread mutex for concurrent pot access' },
      { fr: 'Gestion propre de fin (villagers_finished counter)', en: 'Clean exit handling (villagers_finished counter)' },
      { fr: 'Script de tests automatisés (625 combinaisons)', en: 'Automated test script (625 combinations)' },
      { fr: 'Tests valgrind et couverture de code', en: 'Valgrind tests and code coverage' }
    ],
    year: 2024
  },
  {
    id: 'minilibc',
    title: 'MinilibC',
    description: {
      fr: 'Bibliothèque dynamique ELF remplaçant la libc via LD_PRELOAD, entièrement en assembleur x86-64 (NASM).',
      en: 'ELF dynamic library replacing libc via LD_PRELOAD, entirely in x86-64 assembly (NASM).'
    },
    longDescription: {
      fr: "Réimplémentation de fonctions string/memory de la libc standard en assembleur x86-64. Assemblage NASM, linkage ld, utilisable via weak binding avec LD_PRELOAD.",
      en: "Reimplementation of standard libc string/memory functions in x86-64 assembly. NASM assembly, ld linking, usable via weak binding with LD_PRELOAD."
    },
    technologies: ['x86-64 Assembly', 'NASM', 'ld', 'ELF', 'Makefile'],
    category: 'systems',
    type: 'academic',
    highlights: [
      { fr: 'strlen : boucle optimisée sur registres', en: 'strlen: register-optimized loop' },
      { fr: 'strchr / strrchr : recherche avant/arrière', en: 'strchr / strrchr: forward/backward search' },
      { fr: 'memset / memcpy : opérations mémoire', en: 'memset / memcpy: memory operations' },
      { fr: 'strcmp / strncmp : comparaison lexicographique', en: 'strcmp / strncmp: lexicographic comparison' },
      { fr: 'strcasecmp : comparaison case-insensitive (conversion A-Z → a-z)', en: 'strcasecmp: case-insensitive comparison (A-Z → a-z conversion)' },
      { fr: "Conventions d'appel System V AMD64 ABI", en: 'System V AMD64 ABI calling conventions' },
      { fr: 'Génération libasm.so dynamique', en: 'Dynamic libasm.so generation' },
      { fr: 'Tests de validation fournis', en: 'Provided validation tests' },
      { fr: 'Compatible LD_PRELOAD pour substitution', en: 'LD_PRELOAD compatible for substitution' }
    ],
    year: 2025
  },
  {
    id: 'myhunter',
    title: 'My Hunter',
    description: {
      fr: 'Jeu de tir Duck Hunt complet avec CSFML : menu interactif, système de pause, highscore persistant et ambiance sonore.',
      en: 'Complete Duck Hunt shooting game with CSFML: interactive menu, pause system, persistent highscore and sound ambiance.'
    },
    longDescription: {
      fr: "Premier jeu vidéo complet en C avec CSFML. Reproduction du classique Duck Hunt avec de nombreuses fonctionnalités bonus.",
      en: "First complete video game in C with CSFML. Reproduction of the classic Duck Hunt with many bonus features."
    },
    technologies: ['C', 'CSFML', 'Makefile', 'Sprite Sheets', 'File I/O'],
    category: 'systems',
    type: 'academic',
    highlights: [
      { fr: 'Menu principal interactif (Play/Quit)', en: 'Interactive main menu (Play/Quit)' },
      { fr: 'Système de pause avec reprise', en: 'Pause system with resume' },
      { fr: 'Écran Game Over avec Retry/Quit', en: 'Game Over screen with Retry/Quit' },
      { fr: 'Highscore persistant (sauvegarde fichier)', en: 'Persistent highscore (file save)' },
      { fr: 'Musique de fond + effets sonores (click)', en: 'Background music + sound effects (click)' },
      { fr: 'Curseur crosshair personnalisé', en: 'Custom crosshair cursor' },
      'Police custom (Minecraft.ttf)',
      { fr: 'Sprites animés via sprite sheets', en: 'Animated sprites via sprite sheets' },
      'Game loop framerate-independent (sfClock)'
    ],
    year: 2023
  },
  {
    id: 'myradar',
    title: 'My Radar',
    description: {
      fr: 'Simulateur de contrôle aérien 2D avec QuadTree, placement de tours dynamique et optimisation de collisions.',
      en: '2D air traffic control simulator with QuadTree, dynamic tower placement and collision optimization.'
    },
    longDescription: {
      fr: 'Simulation de trafic aérien avancée en C avec CSFML. Optimisation des collisions via QuadTree, placement interactif de tours de contrôle et nombreux bonus.',
      en: 'Advanced air traffic simulation in C with CSFML. Collision optimization via QuadTree, interactive control tower placement and many bonuses.'
    },
    technologies: ['C', 'CSFML', 'Makefile', 'QuadTree', 'File Parsing'],
    category: 'systems',
    type: 'academic',
    highlights: [
      { fr: 'QuadTree pour optimisation des collisions O(n log n)', en: 'QuadTree for collision optimization O(n log n)' },
      { fr: 'Affichage FPS temps réel', en: 'Real-time FPS display' },
      { fr: 'Timer de simulation en haut à droite', en: 'Simulation timer in top right' },
      { fr: 'Système de pause (touche P)', en: 'Pause system (P key)' },
      { fr: '[BONUS] Placement de tours à la souris', en: '[BONUS] Mouse tower placement' },
      { fr: '[BONUS] Modification/suppression de tours', en: '[BONUS] Tower modification/deletion' },
      { fr: 'Zones de contrôle circulaires', en: 'Circular control zones' },
      'Toggle hitboxes/sprites (L/S keys)',
      { fr: 'Parsing de scripts .rdr', en: '.rdr script parsing' },
      { fr: "Gestion de centaines d'entités simultanées", en: 'Handling hundreds of simultaneous entities' }
    ],
    year: 2023
  }
];

export const categories = [
  { id: 'all', label: { fr: 'Tous', en: 'All' }, icon: '🎯' },
  { id: 'ai', label: { fr: 'IA / ML', en: 'AI / ML' }, icon: '🧠' },
  { id: 'security', label: { fr: 'Sécurité', en: 'Security' }, icon: '🔐' },
  { id: 'fullstack', label: { fr: 'Full-Stack', en: 'Full-Stack' }, icon: '🌐' },
  { id: 'systems', label: { fr: 'Systèmes', en: 'Systems' }, icon: '⚙️' },
  { id: 'fintech', label: { fr: 'FinTech', en: 'FinTech' }, icon: '💹' },
  { id: 'tools', label: { fr: 'Outils', en: 'Tools' }, icon: '🛠️' },
];
