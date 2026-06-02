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
  featured?: boolean;
  metrics?: { label: string | BilingualText; value: string }[];
}

export const projects: Project[] = [
  {
    id: 'erpio',
    title: 'Erpio',
    description: {
      fr: "ERP modulaire pour TPE/PME avec copilote IA prévu. Backend Laravel 12 en architecture hexagonale DDD, multi-tenant PostgreSQL avec Row Level Security. Projet EIP Epitech (équipe de 6).",
      en: "Modular ERP for small businesses with planned AI copilot. Laravel 12 backend with hexagonal DDD architecture, multi-tenant PostgreSQL with Row Level Security. Epitech EIP project (team of 6)."
    },
    longDescription: {
      fr: "Projet EIP Epitech en cours de développement. Backend Laravel 12 / PHP 8.3 structuré en architecture hexagonale (Domain/Application/Infrastructure) avec DDD : Value Objects validés (SIRET avec algorithme de Luhn, Email), entités immuables, Repository Pattern. Multi-tenant PostgreSQL 16 avec Row Level Security et isolation par tenant. Infrastructure Docker complète (PostgreSQL, Redis, Ollama pour futur SLM). Module Tenant implémenté, 5 modules métier (CRM, Factures, Planning, Stocks, Tickets) et copilote IA (Mistral AI, architecture SLM/LLM) en cours de développement.",
      en: "Epitech EIP project under active development. Laravel 12 / PHP 8.3 backend structured with hexagonal architecture (Domain/Application/Infrastructure) and DDD: validated Value Objects (SIRET with Luhn algorithm, Email), immutable entities, Repository Pattern. Multi-tenant PostgreSQL 16 with Row Level Security and per-tenant isolation. Complete Docker infrastructure (PostgreSQL, Redis, Ollama for future SLM). Tenant module implemented, 5 business modules (CRM, Invoices, Planning, Inventory, Tickets) and AI copilot (Mistral AI, SLM/LLM architecture) under development."
    },
    technologies: ['Laravel 12', 'PHP 8.3', 'PostgreSQL', 'Redis', 'Docker', 'DDD', 'Hexagonal'],
    category: 'fullstack',
    type: 'academic',
    featured: true,
    metrics: [
      { label: { fr: 'Modules prévus', en: 'Planned modules' }, value: '6' },
      { label: 'Architecture', value: 'DDD' },
      { label: 'PostgreSQL', value: 'RLS' },
      { label: { fr: 'Équipe', en: 'Team' }, value: '6 devs' },
    ],
    highlights: [
      { fr: '[EN COURS] Projet EIP Epitech - Équipe de 6 développeurs', en: '[ONGOING] Epitech EIP Project - Team of 6 developers' },
      { fr: 'Architecture hexagonale (Domain/Application/Infrastructure) avec DDD strict', en: 'Hexagonal architecture (Domain/Application/Infrastructure) with strict DDD' },
      { fr: 'Value Objects validés : SIRET (algorithme de Luhn), Email, TenantId (UUID)', en: 'Validated Value Objects: SIRET (Luhn algorithm), Email, TenantId (UUID)' },
      { fr: 'Multi-tenant PostgreSQL 16 avec Row Level Security et isolation par tenant', en: 'Multi-tenant PostgreSQL 16 with Row Level Security and per-tenant isolation' },
      { fr: 'Infrastructure Docker : PHP 8.3 FPM, PostgreSQL, Redis, Ollama (Mistral 7B)', en: 'Docker infrastructure: PHP 8.3 FPM, PostgreSQL, Redis, Ollama (Mistral 7B)' },
      { fr: 'CI/CD Jenkins avec Gitleaks (secret scanning) et SonarCloud', en: 'Jenkins CI/CD with Gitleaks (secret scanning) and SonarCloud' },
      { fr: 'Module Tenant implémenté avec Repository Pattern et entités immuables', en: 'Tenant module implemented with Repository Pattern and immutable entities' },
      { fr: '[PRÉVU] Copilote IA : architecture "Sandwich" SLM/LLM avec sécurité MCP', en: '[PLANNED] AI copilot: "Sandwich" SLM/LLM architecture with MCP security' },
      { fr: '[PRÉVU] 5 modules métier : CRM, Factures (OCR), Planning, Stocks, Tickets', en: '[PLANNED] 5 business modules: CRM, Invoices (OCR), Planning, Inventory, Tickets' }
    ],
    year: 2028
  },
  {
    id: 'living-world',
    title: 'Living World Ecosystem',
    description: {
      fr: "Simulateur d'écosystème où chaque créature possède son propre réseau de neurones (8→4) et un ADN diploïde avec allèles dominants/récessifs, le tout soumis à la sélection naturelle.",
      en: "Ecosystem simulator where each creature has its own neural network (8→4) and diploid DNA with dominant/recessive alleles, all subject to natural selection."
    },
    longDescription: {
      fr: "Simulation multi-agents en Python/Pygame où des créatures naissent, chassent, se reproduisent et meurent dans un monde généré par bruit de Perlin. Chaque individu est doté d'un réseau de neurones personnel (8 capteurs en entrée, 4 sorties comportementales) qui évolue par mutations génétiques. Système climatique avec saisons, coordination de chasse en meute (3-8 créatures) et propagation de maladies/parasites.",
      en: "Multi-agent simulation in Python/Pygame where creatures are born, hunt, reproduce and die in a Perlin noise-generated world. Each individual has a personal neural network (8 sensor inputs, 4 behavioral outputs) that evolves through genetic mutations. Climate system with seasons, pack hunting coordination (3-8 creatures) and disease/parasite propagation."
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
      fr: "API REST FastAPI avec WebSocket temps réel pour le suivi d'avancement. Scraping LinkedIn via Selenium (expériences, éducation, compétences), analyse par LLM local (Ollama) avec algorithme Map-Reduce pour traiter les contextes larges. 5 types d'investigation (AML/CFT, Réputation, Background, Due Diligence, Concurrence) avec génération automatique de rapports Word structurés.",
      en: "FastAPI REST API with real-time WebSocket for progress tracking. LinkedIn scraping via Selenium (experience, education, skills), analysis by local LLM (Ollama) with Map-Reduce algorithm for large contexts. 5 investigation types (AML/CFT, Reputation, Background, Due Diligence, Competition) with automatic structured Word report generation."
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
      fr: "Plateforme CTF auto-hébergée sur CTFd avec 61 challenges répartis en 7 catégories (Web, Crypto, PWN, Reverse, Forensics, Misc, Stéganographie). Scoring dynamique ajusté au nombre de solves, ~45,000 points totaux. Challenges Web avancés (SQLi, SSTI, SSRF, JWT, Prototype Pollution), crypto (RSA, ECC, attaques lattice) et PWN (buffer overflow, ROP, heap exploitation). Infrastructure Docker complète pour l'isolation des challenges.",
      en: "Self-hosted CTF platform on CTFd with 61 challenges across 7 categories (Web, Crypto, PWN, Reverse, Forensics, Misc, Steganography). Dynamic scoring adjusted by solve count, ~45,000 total points. Advanced Web challenges (SQLi, SSTI, SSRF, JWT, Prototype Pollution), crypto (RSA, ECC, lattice attacks) and PWN (buffer overflow, ROP, heap exploitation). Complete Docker infrastructure for challenge isolation."
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
      fr: 'Bot de trading crypto connecté à l\'API Binance avec stratégie RSI + MACD, dashboard Dash/Plotly temps réel, paper trading et backtesting.',
      en: 'Crypto trading bot connected to the Binance API with RSI + MACD strategy, real-time Dash/Plotly dashboard, paper trading and backtesting.'
    },
    longDescription: {
      fr: "Bot Python automatisant l'analyse et l'exécution d'ordres sur Binance. Stratégie basée sur les indicateurs RSI et MACD avec gestion du risque (stop-loss, take-profit, sizing). Dashboard interactif Dash/Plotly avec graphiques candlestick temps réel et suivi de portfolio. Mode paper trading pour tester sans risque, backtesting sur données historiques via Pandas, et notifications Telegram pour les signaux de trading.",
      en: "Python bot automating analysis and order execution on Binance. Strategy based on RSI and MACD indicators with risk management (stop-loss, take-profit, sizing). Interactive Dash/Plotly dashboard with real-time candlestick charts and portfolio tracking. Paper trading mode for risk-free testing, historical data backtesting via Pandas, and Telegram notifications for trading signals."
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
      fr: 'Collecteur de données sportives live via Playwright (Flashscore, Sofascore) avec CLI Typer, conteneurisé Docker et CI/CD GitHub Actions.',
      en: 'Live sports data collector via Playwright (Flashscore, Sofascore) with Typer CLI, Docker containerization and GitHub Actions CI/CD.'
    },
    longDescription: {
      fr: "Outil CLI Python scrappant en temps réel les scores, statistiques et cotes depuis Flashscore et Sofascore via Playwright (browser headless). Architecture modulaire avec Typer pour les commandes CLI, Poetry pour la gestion des dépendances, Docker pour le déploiement et GitHub Actions pour la CI/CD. Extraction automatisée de données live utilisables pour l'analyse de paris.",
      en: "Python CLI tool scraping real-time scores, statistics and odds from Flashscore and Sofascore via Playwright (headless browser). Modular architecture with Typer for CLI commands, Poetry for dependency management, Docker for deployment and GitHub Actions for CI/CD. Automated extraction of live data usable for betting analysis."
    },
    technologies: ['Python', 'Playwright', 'Docker', 'GitHub Actions', 'Poetry', 'Typer'],
    category: 'tools',
    type: 'personal',
    highlights: [
      { fr: 'Scraping multi-sources (Flashscore, Sofascore)', en: 'Multi-source scraping (Flashscore, Sofascore)' },
      { fr: 'Extraction scores et stats live', en: 'Live scores and stats extraction' },
      { fr: 'CLI avec commandes multiples', en: 'CLI with multiple commands' },
      { fr: 'Conteneurisation Docker', en: 'Docker containerization' },
      { fr: 'Pipeline CI/CD GitHub Actions', en: 'GitHub Actions CI/CD pipeline' },
      { fr: 'Build system Makefile', en: 'Makefile build system' }
    ],
    year: 2025
  },
  {
    id: 'rtype',
    title: 'R-Type Game Engine',
    description: {
      fr: 'Jeu multijoueur C++23 (81k+ lignes) avec architecture hexagonale, système graphique multi-backend SDL2/SFML et voice chat temps réel.',
      en: 'Multiplayer C++23 game (81k+ lines) with hexagonal architecture, multi-backend SDL2/SFML graphics system and real-time voice chat.'
    },
    longDescription: {
      fr: "Clone du jeu R-Type avec architecture hexagonale (ports & adapters), serveur multi-protocole (TCP:4125 auth TLS + UDP:4124 gameplay 20Hz + UDP:4126 voice chat Opus), plugins graphiques dynamiques (dlopen) et accessibilité (modes daltonien, remapping clavier). Système social complet (lobby, friends, messaging, leaderboard, achievements) avec MongoDB. CI/CD Jenkins et documentation MkDocs (109 fichiers).",
      en: "R-Type game clone with hexagonal architecture (ports & adapters), multi-protocol server (TCP:4125 TLS auth + UDP:4124 gameplay 20Hz + UDP:4126 Opus voice chat), dynamic graphics plugins (dlopen) and accessibility (colorblind modes, key remapping). Full social system (lobby, friends, messaging, leaderboard, achievements) with MongoDB. Jenkins CI/CD and MkDocs documentation (109 files)."
    },
    technologies: ['C++23', 'Boost.Asio', 'OpenSSL', 'SFML', 'SDL2', 'PortAudio', 'Opus', 'MongoDB', 'CMake', 'vcpkg', 'Docker', 'Jenkins', 'MkDocs', 'Google Test', 'spdlog'],
    category: 'systems',
    type: 'academic',
    featured: true,
    metrics: [
      { label: { fr: 'Lignes de code', en: 'Lines of code' }, value: '81k+' },
      { label: { fr: 'Protocoles', en: 'Protocols' }, value: '3' },
      { label: { fr: 'Fichiers doc', en: 'Doc files' }, value: '109' },
      { label: { fr: 'Plateformes', en: 'Platforms' }, value: '3' },
    ],
    highlights: [
      { fr: 'Architecture Hexagonale (Domain/Application/Infrastructure) avec ports & adapters', en: 'Hexagonal Architecture (Domain/Application/Infrastructure) with ports & adapters' },
      { fr: 'Serveur multi-protocole : TCP:4125 (auth TLS) + UDP:4124 (gameplay 20Hz) + UDP:4126 (voice)', en: 'Multi-protocol server: TCP:4125 (TLS auth) + UDP:4124 (gameplay 20Hz) + UDP:4126 (voice)' },
      { fr: 'Plugins graphiques dynamiques SDL2/SFML via dlopen/LoadLibrary', en: 'Dynamic SDL2/SFML graphics plugins via dlopen/LoadLibrary' },
      { fr: 'Voice chat temps réel avec PortAudio + codec Opus (32kbps)', en: 'Real-time voice chat with PortAudio + Opus codec (32kbps)' },
      { fr: 'Accessibilité : modes daltonien (protanopie, deutéranopie, tritanopie), remapping clavier', en: 'Accessibility: colorblind modes (protanopia, deuteranopia, tritanopia), key remapping' },
      { fr: 'Client-Side Prediction pour mouvement fluide malgré la latence', en: 'Client-Side Prediction for smooth movement despite latency' },
      { fr: 'Value Objects DDD : Health, Position, Email, Password', en: 'DDD Value Objects: Health, Position, Email, Password' },
      { fr: '11 loggers spdlog (7 client + 4 serveur) avec rotation automatique', en: '11 spdlog loggers (7 client + 4 server) with automatic rotation' },
      { fr: 'CI/CD Jenkins avec artifacts cross-platform (Linux/Windows/macOS)', en: 'Jenkins CI/CD with cross-platform artifacts (Linux/Windows/macOS)' },
      { fr: 'Documentation MkDocs Material (109 fichiers, ~30k lignes)', en: 'MkDocs Material documentation (109 files, ~30k lines)' },
      { fr: '[BONUS] Système social complet : lobby/rooms, friends, messaging, leaderboard, achievements (MongoDB)', en: '[BONUS] Full social system: lobby/rooms, friends, messaging, leaderboard, achievements (MongoDB)' },
      { fr: '[BONUS] Discord Bot intégré pour notifications et gestion de serveur', en: '[BONUS] Integrated Discord Bot for notifications and server management' },
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
      { fr: 'Bitboards 4 rotations : détection victoire O(4) vs O(400)', en: 'Bitboards 4 rotations: win detection O(4) vs O(400)' },
      { fr: '65 patterns de menaces (FIVE, OPEN_FOUR, FOUR, OPEN_THREE...)', en: '65 threat patterns (FIVE, OPEN_FOUR, FOUR, OPEN_THREE...)' },
      { fr: 'Move ordering avancé : History Heuristic, Killer Moves, Countermove', en: 'Advanced move ordering: History Heuristic, Killer Moves, Countermove' },
      { fr: 'Pruning : Null Move, Futility, Razoring, LMR logarithmique', en: 'Pruning: Null Move, Futility, Razoring, logarithmic LMR' },
      { fr: 'Threat Board : évaluation O(1) vs O(1600)', en: 'Threat Board: O(1) evaluation vs O(1600)' },
      { fr: 'Zobrist Hashing O(1) incrémental pour TT', en: 'Incremental O(1) Zobrist Hashing for TT' },
      { fr: '[BONUS] NNUE Neural Network (128→32→1) quantifié int16/int8', en: '[BONUS] NNUE Neural Network (128→32→1) quantized int16/int8' },
      { fr: '[BONUS] Proof-Number Search pour prouver positions', en: '[BONUS] Proof-Number Search to prove positions' },
      { fr: '[BONUS] Opening Book 1000+ positions avec 8 symétries', en: '[BONUS] Opening Book 1000+ positions with 8 symmetries' },
      { fr: '[BONUS] Discord Bot : 1v1, classement, replays', en: '[BONUS] Discord Bot: 1v1, ranking, replays' },
      { fr: '[BONUS] Brawl Toolkit : stats, classement, replay, spy, watch', en: '[BONUS] Brawl Toolkit: stats, leaderboard, replay, spy, watch' },
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
      fr: "Moteur de ray tracing C++17 avec architecture OOP (interface IPrimitive polymorphique). Primitives : sphères, plans et cylindres limités (yMin/yMax). Éclairage complet : lumière directionnelle + ambiante, point lights multiples, modèle de réflexion Phong (spéculaire) et shadow rays pour les ombres portées. Scènes configurables via fichiers .cfg parsés avec libconfig++, export PPM binaire.",
      en: "C++17 ray tracing engine with OOP architecture (polymorphic IPrimitive interface). Primitives: spheres, planes and limited cylinders (yMin/yMax). Complete lighting: directional + ambient light, multiple point lights, Phong reflection model (specular) and shadow rays for cast shadows. Configurable scenes via .cfg files parsed with libconfig++, binary PPM export."
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
      fr: "Simulation multi-process/thread d'une pizzeria en C++17. Chaque cuisine est un processus fils (fork dynamique) contenant un Thread Pool de cuisiniers. Communication réception/cuisines par IPC pipes avec sérialisation custom. Load balancing des commandes, stock d'ingrédients avec régénération automatique, fermeture des cuisines inactives après 5s. Bonus : interface graphique SFML complète.",
      en: "Multi-process/thread C++17 pizzeria simulation. Each kitchen is a child process (dynamic fork) containing a cook Thread Pool. Reception/kitchen communication via IPC pipes with custom serialization. Order load balancing, ingredient stock with automatic regeneration, inactive kitchen closure after 5s. Bonus: complete SFML GUI."
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
      fr: 'Monitoring de production solaire : collecte automatisée des données onduleur via cron, stockage SQLite et dashboard Streamlit avec historique et tendances.',
      en: 'Solar production monitoring: automated inverter data collection via cron, SQLite storage and Streamlit dashboard with history and trends.'
    },
    longDescription: {
      fr: "Système de monitoring connecté à un onduleur photovoltaïque. Script Python exécuté par cron à intervalles réguliers pour collecter les données de production (puissance, énergie, rendement). Stockage en base SQLite avec historique complet. Dashboard Streamlit interactif permettant de visualiser la production en temps réel, l'historique journalier/mensuel et les tendances de rendement.",
      en: "Monitoring system connected to a photovoltaic inverter. Python script executed by cron at regular intervals to collect production data (power, energy, yield). SQLite database storage with complete history. Interactive Streamlit dashboard for visualizing real-time production, daily/monthly history and yield trends."
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
      { fr: 'Jenkins Configuration as Code', en: 'Jenkins Configuration as Code' },
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
      { fr: '[BONUS] Visual Flow Builder avec @xyflow/react (drag-and-drop, MiniMap, routing)', en: '[BONUS] Visual Flow Builder with @xyflow/react (drag-and-drop, MiniMap, routing)' },
      { fr: '[BONUS] Mode Flow v2 : chaînage de plusieurs actions/réactions', en: '[BONUS] Flow v2 mode: chaining multiple actions/reactions' },
      { fr: '[BONUS] Encryption AES-256-CBC des tokens OAuth en BDD', en: '[BONUS] AES-256-CBC encryption of OAuth tokens in DB' },
      { fr: 'OAuth2 pour 7 providers (Google, GitHub, Slack, Discord, Microsoft, Twitch, Spotify)', en: 'OAuth2 for 7 providers (Google, GitHub, Slack, Discord, Microsoft, Twitch, Spotify)' },
      { fr: 'HookManager : polling automatique des actions avec déduplication', en: 'HookManager: automatic action polling with deduplication' },
      { fr: 'App mobile React Native/Expo avec expo-router et APK pré-compilé', en: 'React Native/Expo mobile app with expo-router and pre-compiled APK' },
      { fr: 'Email verification avec tokens sécurisés (bcrypt + JWT)', en: 'Email verification with secure tokens (bcrypt + JWT)' },
      { fr: 'Docker Compose : server:8080, client_web:8081, client_mobile (APK), PostgreSQL, Ngrok', en: 'Docker Compose: server:8080, client_web:8081, client_mobile (APK), PostgreSQL, Ngrok' },
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
      fr: "Plateforme de gaming C++17 utilisant dlopen/dlclose pour charger à chaud des bibliothèques graphiques (SFML, SDL2, NCurses) et des jeux (Snake, Minesweeper) sans recompilation. Interfaces partagées IGraphicLib/IGameLib permettant la collaboration inter-groupes. Système de scores persistant, sauvegarde/restauration d'état et hot-swap des renderers à la volée.",
      en: "C++17 gaming platform using dlopen/dlclose to hot-load graphics libraries (SFML, SDL2, NCurses) and games (Snake, Minesweeper) without recompilation. Shared IGraphicLib/IGameLib interfaces enabling inter-group collaboration. Persistent score system, state save/restore and runtime renderer hot-swapping."
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
      fr: "Simulateur de circuits logiques en C++17 avec logique tristate (True/False/Undefined). Architecture Factory Pattern pour instancier les composants : gates élémentaires (AND, OR, XOR, NOT), chipsets 40xx (4001, 4008, 4011, 4030, 4069, 4071, 4081), entrées/sorties et clock. Parser robuste de fichiers .nts, shell interactif tick par tick avec gestion SIGINT. 43 dossiers de tests.",
      en: "C++17 logic circuit simulator with tristate logic (True/False/Undefined). Factory Pattern architecture for component instantiation: elementary gates (AND, OR, XOR, NOT), 40xx chipsets (4001, 4008, 4011, 4030, 4069, 4071, 4081), inputs/outputs and clock. Robust .nts file parser, interactive tick-by-tick shell with SIGINT handling. 43 test folders."
    },
    technologies: ['C++17', 'OOP', 'Factory Pattern', 'CMake', 'Makefile'],
    category: 'systems',
    type: 'academic',
    highlights: [
      { fr: 'Interface nts::IComponent polymorphique', en: 'Polymorphic nts::IComponent interface' },
      { fr: 'Logique tristate (TRUE/FALSE/UNDEFINED)', en: 'Tristate logic (TRUE/FALSE/UNDEFINED)' },
      { fr: 'Factory pattern avec std::map<string, lambda>', en: 'Factory pattern with std::map<string, lambda>' },
      { fr: 'AbstractChipset avec gestion automatique des pins', en: 'AbstractChipset with automatic pin management' },
      { fr: 'Helpers LogicGates (applyAnd, applyOr, applyNand, applyNor)', en: 'LogicGates helpers (applyAnd, applyOr, applyNand, applyNor)' },
      { fr: 'Composants spéciaux : input, output, clock, true, false', en: 'Special components: input, output, clock, true, false' },
      { fr: 'Gates élémentaires : and, or, xor, not', en: 'Elementary gates: and, or, xor, not' },
      { fr: 'Chipsets 40xx : 4001 (NOR), 4011 (NAND), 4030 (XOR), 4069 (NOT), 4071 (OR), 4081 (AND)', en: 'Chipsets 40xx: 4001 (NOR), 4011 (NAND), 4030 (XOR), 4069 (NOT), 4071 (OR), 4081 (AND)' },
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
      fr: "Implémentation du problème producteur-consommateur en C avec pthreads. Le druide (thread producteur) prépare la potion magique, les villageois (threads consommateurs) la boivent pour combattre les romains. Synchronisation via sémaphores POSIX et mutex pour l'accès concurrent au pot. Gestion propre de la terminaison et script de tests automatisés couvrant 625 combinaisons de paramètres.",
      en: "Producer-consumer problem implementation in C with pthreads. The druid (producer thread) prepares the magic potion, villagers (consumer threads) drink it to fight Romans. Synchronization via POSIX semaphores and mutex for concurrent pot access. Clean termination handling and automated test script covering 625 parameter combinations."
    },
    technologies: ['C', 'Pthreads', 'Semaphores', 'Mutex', 'Makefile'],
    category: 'systems',
    type: 'academic',
    highlights: [
      { fr: 'Chaque villageois = 1 thread indépendant', en: 'Each villager = 1 independent thread' },
      { fr: 'Druide = 1 thread producteur', en: 'Druid = 1 producer thread' },
      { fr: 'Villageois = threads consommateurs', en: 'Villagers = consumer threads' },
      { fr: 'Sémaphores POSIX (sem_wait/sem_post)', en: 'POSIX semaphores (sem_wait/sem_post)' },
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
      fr: "Reproduction du classique Duck Hunt en C avec CSFML. Menu principal interactif, système de pause avec reprise, écran Game Over avec retry, et highscore persistant sauvegardé en fichier. Sprites animés via sprite sheets, musique de fond, effets sonores au clic et curseur crosshair personnalisé. Game loop indépendante du framerate via sfClock.",
      en: "Reproduction of the classic Duck Hunt in C with CSFML. Interactive main menu, pause system with resume, Game Over screen with retry, and persistent highscore saved to file. Animated sprites via sprite sheets, background music, click sound effects and custom crosshair cursor. Framerate-independent game loop via sfClock."
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
      { fr: 'Police custom (Minecraft.ttf)', en: 'Custom font (Minecraft.ttf)' },
      { fr: 'Sprites animés via sprite sheets', en: 'Animated sprites via sprite sheets' },
      { fr: 'Game loop indépendante du framerate (sfClock)', en: 'Framerate-independent game loop (sfClock)' }
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
      fr: "Simulateur de contrôle aérien en C avec CSFML gérant des centaines d'entités simultanées. Optimisation des collisions via QuadTree O(n log n), parsing de scripts .rdr pour définir les vols et tours. Placement/modification/suppression de tours de contrôle à la souris, zones de contrôle circulaires, timer de simulation et affichage FPS temps réel.",
      en: "Air traffic control simulator in C with CSFML handling hundreds of simultaneous entities. Collision optimization via QuadTree O(n log n), .rdr script parsing for flight and tower definitions. Mouse-based tower placement/modification/deletion, circular control zones, simulation timer and real-time FPS display."
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
      { fr: 'Basculer hitboxes/sprites (touches L/S)', en: 'Toggle hitboxes/sprites (L/S keys)' },
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
