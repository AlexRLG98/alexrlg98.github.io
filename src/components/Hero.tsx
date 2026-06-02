import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Flag, Code2, Terminal, Trophy } from 'lucide-react';
import { STATS } from '../data/constants';
import { useLanguage } from '../contexts/LanguageContext';

type LineType = 'cmd' | 'info' | 'result' | 'highlight' | 'status' | 'divider';
type HistoryEntry = { type: 'prompt' | 'output' | 'error'; text: string };

// Terminal line-by-line reveal animation
function useTerminalReveal(lineCount: number, baseDelay = 300, lineDelay = 120) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < lineCount; i++) {
      timers.push(setTimeout(() => setVisibleCount(i + 1), baseDelay + i * lineDelay));
    }
    return () => timers.forEach(clearTimeout);
  }, [lineCount, baseDelay, lineDelay]);

  return visibleCount;
}

// Animated counter with easeOutCubic
function useCountUp(target: number, enabled: boolean, duration = 1200): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) { setCount(0); return; }
    const startTime = performance.now();
    let frame: number;
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target, enabled, duration]);

  return count;
}

// Stat counter sub-component (each gets its own useCountUp)
function StatCounter({ value, suffix, label, icon: Icon, color, inView, delay }: {
  value: number; suffix: string; label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color: string; inView: boolean; delay: number;
}) {
  const count = useCountUp(value, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="card-surface p-4 text-center"
    >
      <Icon className={`mx-auto mb-2 ${color}`} size={20} />
      <div className={`text-2xl font-bold ${color}`}>{count}{suffix}</div>
      <div className="text-gray-500 text-caption mt-0.5">{label}</div>
    </motion.div>
  );
}

// Terminal prompt fragment
function Prompt({ text }: { text?: string }) {
  return (
    <>
      <span className="text-cyber-400">alexandre@workstation</span>
      <span className="text-gray-500">:</span>
      <span className="text-primary-400">~</span>
      <span className="text-gray-500">$ </span>
      {text !== undefined && <span className="text-gray-300">{text}</span>}
    </>
  );
}

// Scroll to a section smoothly
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// Command result type — text output + optional side-effect
type CmdResult = { lines: string[]; action?: () => void };

function resolveCommand(input: string, lang: string): CmdResult | null {
  const cmd = input.trim();
  const lower = cmd.toLowerCase();

  // ── Edge cases ──
  if (['cd', 'cd ~', 'cd /', 'cd ..'].includes(lower)) {
    return { lines: [lang === 'fr' ? '~ Vous êtes déjà ici.' : '~ Already home.'] };
  }
  if (lower === 'ls') {
    return { lines: [lang === 'fr'
      ? 'projets/  ctf/  competences/  parcours/  contact/'
      : 'projects/  ctf/  skills/  timeline/  contact/'
    ] };
  }
  if (lower === 'open') {
    return { lines: [lang === 'fr'
      ? "Usage: open <projet>. Essayez: ls projets/"
      : "Usage: open <project>. Try: ls projects/"
    ] };
  }

  // ── Navigation commands (FR aliases + EN) ──
  if (['cd projets', 'cd projects', 'cd projets/', 'cd projects/'].includes(lower)) {
    return {
      lines: [lang === 'fr' ? '→ Navigation vers Projets...' : '→ Navigating to Projects...'],
      action: () => scrollTo('projects'),
    };
  }
  if (['cd competences', 'cd compétences', 'cd skills', 'cd competences/', 'cd skills/'].includes(lower)) {
    return {
      lines: [lang === 'fr' ? '→ Navigation vers Compétences...' : '→ Navigating to Skills...'],
      action: () => scrollTo('skills'),
    };
  }
  if (['cd ctf', 'cd ctf/', 'cd achievements', 'cd achievements/'].includes(lower)) {
    return {
      lines: [lang === 'fr' ? '→ Navigation vers CTF...' : '→ Navigating to CTF...'],
      action: () => scrollTo('achievements'),
    };
  }
  if (['cd parcours', 'cd timeline', 'cd parcours/', 'cd timeline/'].includes(lower)) {
    return {
      lines: [lang === 'fr' ? '→ Navigation vers Parcours...' : '→ Navigating to Timeline...'],
      action: () => scrollTo('timeline'),
    };
  }
  if (['cd contact', 'cd contact/', 'contact'].includes(lower)) {
    return {
      lines: [lang === 'fr' ? '→ Navigation vers Contact...' : '→ Navigating to Contact...'],
      action: () => scrollTo('contact'),
    };
  }

  // ── Open project (scroll + expand) ──
  const openMatch = lower.match(/^open\s+(.+)$/);
  if (openMatch) {
    const slug = openMatch[1].replace(/\//g, '');
    const projectEl = document.getElementById(`project-${slug}`);
    if (projectEl) {
      return {
        lines: [lang === 'fr' ? `→ Ouverture de ${slug}...` : `→ Opening ${slug}...`],
        action: () => {
          // 1. Scroll to the project card
          projectEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // 2. After scroll finishes, click to expand
          setTimeout(() => {
            projectEl.click();
            // 3. After expand changes layout, re-center
            setTimeout(() => {
              projectEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 400);
          }, 600);
        },
      };
    }
    return { lines: [lang === 'fr' ? `Projet '${slug}' non trouvé. Essayez: ls projets/` : `Project '${slug}' not found. Try: ls projects/`] };
  }

  // ── Info commands ──
  if (lower === 'help') {
    return { lines: lang === 'fr' ? [
      'Navigation :',
      '  cd projets      Aller aux projets',
      '  cd ctf          Aller aux CTF & Challenges',
      '  cd competences  Aller aux compétences',
      '  cd parcours     Aller au parcours',
      '  cd contact      Aller au formulaire',
      '',
      'Projets :',
      '  ls projets/     Lister les projets',
      '  open <nom>      Ouvrir un projet (ex: open erpio)',
      '',
      'Infos :',
      '  whoami          À propos de moi',
      '  cat stack       Stack technique',
      '  cat ctf.log     Classements CTF',
      '  clear           Effacer le terminal',
    ] : [
      'Navigation:',
      '  cd projects     Go to projects',
      '  cd ctf          Go to CTF & Challenges',
      '  cd skills       Go to skills',
      '  cd timeline     Go to timeline',
      '  cd contact      Go to contact form',
      '',
      'Projects:',
      '  ls projects/    List projects',
      '  open <name>     Open a project (e.g. open erpio)',
      '',
      'Info:',
      '  whoami          About me',
      '  cat stack       Tech stack',
      '  cat ctf.log     CTF rankings',
      '  clear           Clear terminal',
    ] };
  }

  if (lower === 'whoami') {
    return { lines: lang === 'fr' ? [
      'Alexandre Raconnat-Le Goff',
      'Cybersécurité & Développeur Full-Stack',
      'TEK3 @ Epitech Nice | Monaco',
      '> Monaco Telecom · SSI · Mars-Juillet 2026',
    ] : [
      'Alexandre Raconnat-Le Goff',
      'Cybersecurity & Full-Stack Developer',
      'TEK3 @ Epitech Nice | Monaco',
      '> Monaco Telecom · SSI · March-July 2026',
    ] };
  }

  if (['ls projects/', 'ls projects', 'ls projets/', 'ls projets'].includes(lower)) {
    return { lines: [
      'erpio/         rtype/         gomoku-ai/',
      'living-world/  osint-tool/    my-ctf/',
      'cryptobot/     sports-betting/ zappy/',
      'raytracer/     plazza/        solarx/',
      'whanos/        area/          arcade/',
      'nanotekspice/  panoramix/     minilibc/',
      'myhunter/      myradar/',
    ] };
  }

  if (lower === 'cat stack' || lower === 'cat skills') {
    return { lines: lang === 'fr' ? [
      'Langages:  C/C++ · Python · Go · Rust · TypeScript',
      'Sécurité:  Defensive · OSINT · CTF · Reverse Engineering',
      'Backend:   FastAPI · Node.js · PostgreSQL',
      'DevOps:    Docker · Git · CI/CD · CMake',
    ] : [
      'Languages: C/C++ · Python · Go · Rust · TypeScript',
      'Security:  Defensive · OSINT · CTF · Reverse Engineering',
      'Backend:   FastAPI · Node.js · PostgreSQL',
      'DevOps:    Docker · Git · CI/CD · CMake',
    ] };
  }

  if (lower === 'cat ctf.log') {
    return { lines: lang === 'fr' ? [
      '🏆 1er/114  Chisel — Champion National',
      '🌍 11e/1014 HTB University CTF 2025',
      '🌍 6e/762   Scarlet CTF 2026',
      '🏆 1er ex-aequo HackDay 2026 — 8/187',
      '   7e/270   Jeanne d\'Hack CTF 2026',
    ] : [
      '🏆 1st/114  Chisel — National Champion',
      '🌍 11th/1014 HTB University CTF 2025',
      '🌍 6th/762   Scarlet CTF 2026',
      '🏆 1st tied  HackDay 2026 — 8/187',
      '   7th/270  Jeanne d\'Hack CTF 2026',
    ] };
  }

  // ── Not found ──
  return null;
}

export default function Hero() {
  const { t, language } = useLanguage();

  // Role typing animation
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = useMemo(() => [
    t('hero.roles.security'),
    t('hero.roles.fullstack'),
  ], [t]);

  const handleScrollTo = useCallback((sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Typing animation effect
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
        isDeleting ? prev.slice(0, -1) : currentRole.slice(0, prev.length + 1)
      );
    }, typeSpeed);
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex, roles]);

  // Reset typing on language change
  useEffect(() => {
    setDisplayedText('');
    setIsDeleting(false);
    setRoleIndex(0);
  }, [t]);

  // ── Terminal: HTTP probe lines ──
  const terminalLines: { type: LineType; text: string }[] = useMemo(() => language === 'fr' ? [
    { type: 'cmd', text: 'curl -sv https://alexandre.mc | head' },
    { type: 'info', text: 'HTTP/2 200' },
    { type: 'result', text: 'server:    Epitech Nice \u00b7 TEK3' },
    { type: 'result', text: 'languages: Go, Rust, C++, Python, TS' },
    { type: 'result', text: 'focus:     Defensive Security \u00b7 Data Engineering \u00b7 Full-Stack' },
    { type: 'result', text: 'projects:  20 majeurs \u00b7 9+ langages' },
    { type: 'divider', text: '' },
    { type: 'highlight', text: 'ctf: 1er/114 Chisel \u00b7 11e/1014 HTB \u{1F30D} \u00b7 6e/762 Scarlet \u{1F30D}' },
    { type: 'status', text: 'status: portfolio op\u00e9rationnel' },
  ] : [
    { type: 'cmd', text: 'curl -sv https://alexandre.mc | head' },
    { type: 'info', text: 'HTTP/2 200' },
    { type: 'result', text: 'server:    Epitech Nice \u00b7 TEK3' },
    { type: 'result', text: 'languages: Go, Rust, C++, Python, TS' },
    { type: 'result', text: 'focus:     Defensive Security \u00b7 Data Engineering \u00b7 Full-Stack' },
    { type: 'result', text: 'projects:  20 majors \u00b7 9+ languages' },
    { type: 'divider', text: '' },
    { type: 'highlight', text: 'ctf: 1st/114 Chisel \u00b7 11th/1014 HTB \u{1F30D} \u00b7 6th/762 Scarlet \u{1F30D}' },
    { type: 'status', text: 'status: portfolio operational' },
  ], [language]);

  const visibleLines = useTerminalReveal(terminalLines.length);

  // ── Terminal: interactive state ──
  const [scanComplete, setScanComplete] = useState(false);
  const [showNmap, setShowNmap] = useState(true);
  const [commandHistory, setCommandHistory] = useState<HistoryEntry[]>([]);
  const [userInput, setUserInput] = useState('');
  const inputHistoryRef = useRef<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalContentRef = useRef<HTMLDivElement>(null);

  // Detect scan completion → enable interactive mode
  useEffect(() => {
    if (visibleLines >= terminalLines.length && !scanComplete) {
      const timer = setTimeout(() => setScanComplete(true), 600);
      return () => clearTimeout(timer);
    }
  }, [visibleLines, terminalLines.length, scanComplete]);

  // Reset terminal on language change
  useEffect(() => {
    setScanComplete(false);
    setShowNmap(true);
    setCommandHistory([]);
    setUserInput('');
    inputHistoryRef.current = [];
    setHistoryIndex(-1);
  }, [language]);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [commandHistory, userInput, scanComplete]);

  // Process commands
  const processCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    if (trimmed.toLowerCase() === 'clear') {
      setCommandHistory([]);
      setShowNmap(false);
      return;
    }

    const newEntries: HistoryEntry[] = [{ type: 'prompt', text: trimmed }];
    const result = resolveCommand(trimmed, language);

    if (result) {
      newEntries.push(...result.lines.map(text => ({ type: 'output' as const, text })));
      if (result.action) setTimeout(result.action, 300);
    } else if (trimmed) {
      newEntries.push({ type: 'error', text: language === 'fr'
        ? `bash: ${trimmed}: commande introuvable. Tapez 'help'`
        : `bash: ${trimmed}: command not found. Type 'help'`
      });
    }

    setCommandHistory(prev => [...prev, ...newEntries]);
  }, [language]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userInput.trim()) {
      inputHistoryRef.current.push(userInput.trim());
      setHistoryIndex(-1);
      processCommand(userInput);
      setUserInput('');
    } else if (e.key === 'Enter') {
      setUserInput('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const partial = userInput.toLowerCase();
      if (!partial) return;
      const projectSlugs = [
        'erpio', 'rtype', 'gomoku-ai', 'living-world',
        'osint-tool', 'my-ctf', 'cryptobot', 'sports-betting', 'zappy',
        'raytracer', 'plazza', 'solarx', 'whanos', 'area', 'arcade',
        'nanotekspice', 'panoramix', 'minilibc', 'myhunter', 'myradar',
      ];
      const completions = [
        'help', 'whoami', 'clear',
        ...(language === 'fr'
          ? ['cd projets', 'cd ctf', 'cd competences', 'cd parcours', 'cd contact', 'ls projets/', 'cat stack', 'cat ctf.log']
          : ['cd projects', 'cd ctf', 'cd skills', 'cd timeline', 'cd contact', 'ls projects/', 'cat stack', 'cat ctf.log']
        ),
        ...projectSlugs.map(s => `open ${s}`),
      ];
      const matches = completions.filter(c => c.startsWith(partial) && c !== partial);
      if (matches.length === 1) {
        // Single match → complete it
        setUserInput(matches[0]);
      } else if (matches.length > 1) {
        // Multiple matches → show them in columns like a real terminal
        // Display only the varying part (after what's already typed)
        const displayNames = matches.map(m => {
          // For "cd X" when user typed "cd", show "X"
          const spaceIdx = partial.lastIndexOf(' ');
          if (spaceIdx >= 0) return m.slice(spaceIdx + 1);
          return m;
        });
        // Format in rows of 3 columns, padded
        const maxLen = Math.max(...displayNames.map(n => n.length));
        const cols = 3;
        const rows: string[] = [];
        for (let i = 0; i < displayNames.length; i += cols) {
          rows.push(displayNames.slice(i, i + cols).map(n => n.padEnd(maxLen + 2)).join(''));
        }
        setCommandHistory(prev => [
          ...prev,
          { type: 'prompt', text: userInput },
          ...rows.map(row => ({ type: 'output' as const, text: row })),
        ]);
        // Auto-complete to the longest common prefix
        let prefix = matches[0];
        for (const m of matches) {
          while (!m.startsWith(prefix)) prefix = prefix.slice(0, -1);
        }
        if (prefix.length > partial.length) setUserInput(prefix);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const hist = inputHistoryRef.current;
      if (!hist.length) return;
      const newIdx = historyIndex === -1 ? hist.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIdx);
      setUserInput(hist[newIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const hist = inputHistoryRef.current;
      if (historyIndex === -1) return;
      const newIdx = historyIndex + 1;
      if (newIdx >= hist.length) {
        setHistoryIndex(-1);
        setUserInput('');
      } else {
        setHistoryIndex(newIdx);
        setUserInput(hist[newIdx]);
      }
    }
  }, [userInput, processCommand, historyIndex]);

  // ── Stats ──
  const stats = [
    { value: STATS.ctfChallenges, suffix: '+', label: t('hero.stats.ctf'), icon: Flag, color: 'text-cyber-400' },
    { value: STATS.projects, suffix: '', label: t('hero.stats.projects'), icon: Code2, color: 'text-primary-400' },
    { value: STATS.languages, suffix: '+', label: t('hero.stats.languages'), icon: Terminal, color: 'text-accent-400' },
  ];

  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // ── Line rendering helpers ──
  const getLineColor = (type: LineType) => {
    switch (type) {
      case 'cmd': return 'text-gray-300';
      case 'info': return 'text-gray-500';
      case 'result': return 'text-cyber-400';
      case 'highlight': return 'text-accent-400';
      case 'status': return 'text-primary-400';
      default: return 'text-gray-500';
    }
  };

  const renderNmapLine = (line: { type: LineType; text: string }, i: number) => {
    if (line.type === 'cmd') {
      return (
        <div key={`nmap-${i}`}>
          <Prompt text={line.text} />
        </div>
      );
    }
    if (line.type === 'divider') {
      return <div key={`nmap-${i}`} className="border-t border-surface-300 my-1.5" />;
    }
    if (line.type === 'highlight') {
      return (
        <div key={`nmap-${i}`} className="flex items-center gap-1.5">
          <Trophy size={12} className="text-accent-400 shrink-0" />
          <span className={getLineColor(line.type)}>{line.text}</span>
        </div>
      );
    }
    return (
      <div key={`nmap-${i}`} className={getLineColor(line.type)}>
        {line.text}
      </div>
    );
  };

  return (
    <section
      id="hero"
      className="flex items-center justify-center relative overflow-hidden"
      style={{ minHeight: '100vh', paddingTop: '80px' }}
    >
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(76,110,245,0.08)_0%,transparent_50%)]" />

      <div className="relative z-10 text-center px-6 md:px-8 lg:px-12 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Terminal — nmap recon scan + interactive shell */}
          <div
            className={`terminal max-w-2xl mx-auto mb-10 relative ${scanComplete ? 'cursor-text' : ''}`}
            onClick={() => scanComplete && inputRef.current?.focus()}
          >
            <div className="terminal-header">
              <span className="terminal-dot red"></span>
              <span className="terminal-dot yellow"></span>
              <span className="terminal-dot green"></span>
              <span className="ml-3 text-xs text-gray-500 font-mono">alexandre@workstation ~</span>
            </div>
            <div
              ref={terminalContentRef}
              className="p-5 text-left font-mono text-[13px] leading-relaxed space-y-0.5 min-h-[200px] max-h-[350px] overflow-y-auto"
            >
              {/* Nmap scan output */}
              {showNmap && (scanComplete
                ? terminalLines.map(renderNmapLine)
                : terminalLines.slice(0, visibleLines).map(renderNmapLine)
              )}

              {/* Scanning cursor */}
              {showNmap && !scanComplete && visibleLines < terminalLines.length && (
                <span className="typing-cursor text-cyber-400"></span>
              )}

              {/* Command history */}
              {scanComplete && commandHistory.map((entry, i) => {
                if (entry.type === 'prompt') {
                  return <div key={`h-${i}`}><Prompt text={entry.text} /></div>;
                }
                if (entry.type === 'error') {
                  return <div key={`h-${i}`} className="text-danger-400">{entry.text}</div>;
                }
                return <div key={`h-${i}`} className="text-gray-400">{entry.text}</div>;
              })}

              {/* Active prompt with cursor */}
              {scanComplete && (
                <div>
                  <Prompt text={userInput} />
                  <span className="typing-cursor text-gray-300"></span>
                </div>
              )}

              {/* Hint — hidden on mobile where typing is less natural */}
              {scanComplete && commandHistory.length === 0 && !userInput && (
                <div className="text-gray-600 text-[11px] mt-2 select-none hidden md:block">
                  {language === 'fr' ? "Tapez 'help' — cd projets, cd ctf, open erpio..." : "Type 'help' — cd projects, cd ctf, open erpio..."}
                </div>
              )}
            </div>

            {/* Input for keyboard capture — positioned over terminal, invisible but focusable */}
            {scanComplete && (
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="absolute inset-0 opacity-0 cursor-text"
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal input"
              />
            )}
          </div>

          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 whitespace-nowrap">
            <span className="text-white">{t('hero.greeting')} </span>
            <span className="gradient-text">Alexandre</span>
          </h1>

          {/* Animated role */}
          <div className="h-10 flex items-center justify-center">
            <span className="text-xl md:text-2xl text-gray-400">
              {displayedText}
              <span className="typing-cursor"></span>
            </span>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-gray-500 text-body-lg max-w-2xl mx-auto mt-6"
          >
            {t('hero.description')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mt-8"
          >
            <a
              href="#projects"
              onClick={handleScrollTo('projects')}
              className="px-7 py-3 bg-primary-500 hover:bg-primary-600 rounded-lg font-medium text-white transition-colors"
            >
              {t('hero.viewProjects')}
            </a>
            <a
              href="#contact"
              onClick={handleScrollTo('contact')}
              className="px-7 py-3 border border-surface-400 hover:border-primary-500 rounded-lg font-medium text-gray-300 hover:text-white transition-colors"
            >
              {t('hero.contactMe')}
            </a>
          </motion.div>

          {/* Stats with animated counters */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-14 max-w-3xl mx-auto"
          >
            {stats.map((stat, i) => (
              <StatCounter
                key={i}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                icon={stat.icon}
                color={stat.color}
                inView={statsVisible}
                delay={0.8 + i * 0.08}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="text-gray-600" size={28} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
