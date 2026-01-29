import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Calendar, Flag, Terminal, Users, Clock, Tag, Shield, ChevronRight, Lock, Eye, EyeOff, AlertCircle, Unlock } from 'lucide-react';
import CryptoJS from 'crypto-js';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ctfCompetitions, bootToRoot, getComputedStatus } from '../data/achievements';
import { getMachinesByCompetition } from '../data/machines';
import { getChallengesByCompetition } from '../data/challenges';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { useSEO, seoConfigs } from '../hooks/useSEO';
import { usePasswordVault } from '../contexts/PasswordVaultContext';

export default function CompetitionPage() {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const { isVaultUnlocked, getPassword } = usePasswordVault();

  const allCompetitions = [...ctfCompetitions, ...bootToRoot];
  const competition = allCompetitions.find(c => c.id === id);

  // Dynamic SEO
  useSEO(competition ? seoConfigs.competition(competition, language) : {});

  // All hooks must be called before any conditional returns (Rules of Hooks)
  const machines = getMachinesByCompetition(id || '');
  const challenges = getChallengesByCompetition(id || '');
  const hasEncryptedContent = challenges.some(c => c.encryptedContent);
  const STORAGE_KEY = `writeup_unlocked_${id}`;

  // State pour le déverrouillage des machines (Boot2Root)
  const [unlockedMachines, setUnlockedMachines] = useState<Set<string>>(new Set());

  // State pour le déverrouillage
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Vérifier les machines déverrouillées au chargement
  useEffect(() => {
    if (machines.length > 0) {
      const unlocked = new Set<string>();
      machines.forEach(machine => {
        const storageKey = `machine_unlocked_${machine.id}`;
        if (sessionStorage.getItem(storageKey)) {
          unlocked.add(machine.id);
        }
      });
      setUnlockedMachines(unlocked);
    }
  }, [machines]);

  // Vérifier si déjà déverrouillé au chargement (vault ou session storage)
  useEffect(() => {
    if (!hasEncryptedContent) return;

    const firstEncrypted = challenges.find(c => c.encryptedContent)?.encryptedContent;
    if (!firstEncrypted) return;

    // D'abord essayer avec le vault (si déverrouillé)
    if (isVaultUnlocked) {
      const vaultPassword = getPassword('ctf', id || '');
      if (vaultPassword) {
        try {
          const bytes = CryptoJS.AES.decrypt(firstEncrypted, vaultPassword);
          const decrypted = bytes.toString(CryptoJS.enc.Utf8);
          if (decrypted && decrypted.length > 0) {
            setIsUnlocked(true);
            return;
          }
        } catch {
          // Invalid password from vault
        }
      }
    }

    // Sinon essayer avec le session storage
    const storedPassword = sessionStorage.getItem(STORAGE_KEY);
    if (storedPassword) {
      try {
        const bytes = CryptoJS.AES.decrypt(firstEncrypted, storedPassword);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        if (decrypted && decrypted.length > 0) {
          setIsUnlocked(true);
          return;
        }
      } catch {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }

    // Si ni vault ni session storage ne fonctionne, verrouiller
    setIsUnlocked(false);
  }, [id, hasEncryptedContent, challenges, STORAGE_KEY, isVaultUnlocked, getPassword]);

  const getBilingualText = (text: string | { fr: string; en: string }) => {
    if (typeof text === 'object') {
      return language === 'fr' ? text.fr : text.en;
    }
    return text;
  };

  // Fonction pour tout verrouiller (machines)
  const handleLockAllMachines = () => {
    machines.forEach(machine => {
      sessionStorage.removeItem(`machine_unlocked_${machine.id}`);
    });
    setUnlockedMachines(new Set());
  };

  // Early return for not found - AFTER all hooks
  if (!competition) {
    return (
      <div className="min-h-screen bg-dark-400">
        <Navbar />
        <div className="pt-32 pb-24 px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">{t('competition.notFound')}</h1>
          <Link to="/" className="text-primary-400 hover:text-primary-300">
            {t('competition.backToHome')}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isBootToRoot = bootToRoot.some(b => b.id === id);
  const rankText = getBilingualText(competition.rank);
  const isFirst = rankText.includes('1er') || rankText.includes('1st');
  const computedStatus = getComputedStatus(competition);
  const isUpcoming = computedStatus === 'upcoming';
  const isOngoing = computedStatus === 'ongoing';

  const getStatusBadge = () => {
    if (isUpcoming) return { text: t('competition.upcoming'), class: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
    if (isOngoing) return { text: t('competition.ongoing'), class: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
    return { text: rankText, class: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
  };

  const status = getStatusBadge();

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    // Tester le déchiffrement avec le premier challenge chiffré
    const firstEncrypted = challenges.find(c => c.encryptedContent)?.encryptedContent;
    if (firstEncrypted) {
      try {
        const bytes = CryptoJS.AES.decrypt(firstEncrypted, password);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        if (decrypted && decrypted.length > 0) {
          setIsUnlocked(true);
          setError('');
          sessionStorage.setItem(STORAGE_KEY, password);
        } else {
          setError(t('competition.wrongPassword'));
        }
      } catch {
        setError(t('competition.wrongPassword'));
      }
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    setPassword('');
    sessionStorage.removeItem(STORAGE_KEY);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Hard': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Bootstrap': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Basic': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Reverse': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Stegano': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Forensic': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'Prog': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Coding': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Crypto': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Web': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Pwn': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Misc': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      case 'Hardware': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'ICS': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Blockchain': return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-dark-400">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              to="/"
              state={{ scrollTo: 'achievements' }}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>{t('competition.backToCTF')}</span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {isFirst && <Trophy className="w-6 h-6 text-yellow-500" />}
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${status.class}`}>
                {status.text}
              </span>
              <span className="px-3 py-1 rounded-full text-sm bg-gray-500/20 text-gray-400 border border-gray-500/30">
                {competition.platform}
              </span>
              <span className="px-3 py-1 rounded-full text-sm bg-primary-500/20 text-primary-400 border border-primary-500/30">
                {isBootToRoot ? 'Boot2Root' : 'CTF Jeopardy'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">{competition.title}</span>
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
              {competition.date && (
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>{competition.date}</span>
                </div>
              )}
              {competition.points && (
                <div className="flex items-center gap-2">
                  <Flag size={18} />
                  <span>{competition.points} pts{competition.personalPoints ? ` (${competition.personalPoints} ${t('competition.personal')})` : ''}</span>
                </div>
              )}
              {competition.team && (
                <div className="flex items-center gap-2">
                  <Users size={18} />
                  <span>{t('competition.team')} {competition.team}{competition.teamSize ? ` (${competition.teamSize})` : ''}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{competition.period}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xl text-gray-300 leading-relaxed">
              {getBilingualText(competition.description)}
            </p>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-6 mb-8"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-green-500" />
              {t('competition.keyPoints')}
            </h2>
            <div className="space-y-3">
              {competition.highlights.map((highlight) => (
                <div key={typeof highlight === 'string' ? highlight : highlight.fr} className="flex items-start gap-3">
                  <span className="text-primary-400 mt-1">&#9656;</span>
                  <span className="text-gray-300">{getBilingualText(highlight)}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6 mb-8"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 text-blue-500" />
              {t('competition.technologies')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {competition.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-dark-200 rounded-lg text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Writeup Content (if exists) */}
          {competition.content && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6 mb-8"
            >
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Flag className="w-5 h-5 text-red-500" />
                Writeup
              </h2>
              <div className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      const isInline = !match;
                      return isInline ? (
                        <code className="bg-dark-200 px-1.5 py-0.5 rounded text-primary-400" {...props}>
                          {children}
                        </code>
                      ) : (
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-lg !bg-dark-200 !my-4"
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      );
                    },
                    h1: ({ children }) => (
                      <h1 className="text-2xl font-bold text-white mt-8 mb-4">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl font-semibold text-white mt-6 mb-3 border-b border-gray-800 pb-2">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg font-medium text-gray-200 mt-4 mb-2">{children}</h3>
                    ),
                    p: ({ children }) => <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>,
                    ul: ({ children }) => <ul className="text-gray-300 mb-4 list-disc pl-6">{children}</ul>,
                    ol: ({ children }) => <ol className="text-gray-300 mb-4 list-decimal pl-6">{children}</ol>,
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-4">
                        <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden">
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({ children }) => <thead className="bg-dark-200">{children}</thead>,
                    th: ({ children }) => (
                      <th className="px-4 py-2 text-left text-gray-300 font-medium border-b border-gray-700">{children}</th>
                    ),
                    td: ({ children }) => (
                      <td className="px-4 py-2 text-gray-400 border-b border-gray-800">{children}</td>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-primary-500 pl-4 my-4 text-gray-400 italic">{children}</blockquote>
                    ),
                    a: ({ href, children }) => (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">
                        {children}
                      </a>
                    ),
                  }}
                >
                  {competition.content}
                </ReactMarkdown>
              </div>
            </motion.div>
          )}

          {/* Machines list for Boot2Root */}
          {machines.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6 mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-500" />
                  {t('competition.machines')} ({machines.length})
                  {unlockedMachines.size > 0 && (
                    <span className="text-sm font-normal text-gray-400">
                      • {unlockedMachines.size} {t('competition.unlocked')}
                    </span>
                  )}
                </h2>
                {unlockedMachines.size > 0 && (
                  <button
                    onClick={handleLockAllMachines}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-400 hover:text-white glass rounded-lg transition-colors"
                  >
                    <Lock size={14} />
                    {t('competition.lockAll')}
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {machines.map((machine, i) => {
                  const isMachineUnlocked = unlockedMachines.has(machine.id);
                  const hasEncrypted = !!machine.encryptedContent;

                  return (
                    <Link
                      key={machine.id}
                      to={`/boot2root/${id}/${machine.id}`}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        className="bg-dark-200 rounded-xl p-4 hover:bg-dark-100 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div>
                            <h3 className="text-white font-medium group-hover:text-primary-400 transition-colors flex items-center gap-2">
                              {machine.name}
                              {hasEncrypted && (
                                isMachineUnlocked ? (
                                  <Unlock size={14} className="text-green-500" />
                                ) : (
                                  <Lock size={14} className="text-gray-500" />
                                )
                              )}
                            </h3>
                            <p className="text-gray-500 text-sm">{machine.os}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getDifficultyColor(machine.difficulty)}`}>
                            {machine.difficulty}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {machine.techniques.slice(0, 3).map((tech) => (
                            <span key={tech} className="px-2 py-0.5 bg-dark-300 rounded text-xs text-gray-400">
                              {tech}
                            </span>
                          ))}
                          {machine.techniques.length > 3 && (
                            <span className="px-2 py-0.5 bg-dark-300 rounded text-xs text-gray-500">
                              +{machine.techniques.length - 3}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-primary-400 text-sm font-medium group-hover:gap-2 transition-all">
                          <span>{t('competition.viewWriteup')}</span>
                          <ChevronRight size={14} />
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Challenges list for CTF Jeopardy */}
          {challenges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6 mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Flag className="w-5 h-5 text-red-500" />
                  {t('competition.challenges')} ({challenges.filter(c => c.solved !== false).length}/{challenges.length})
                </h2>
                {hasEncryptedContent && isUnlocked && (
                  <button
                    onClick={handleLock}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-400 hover:text-white glass rounded-lg transition-colors"
                  >
                    <Unlock size={14} />
                    {t('competition.lock')}
                  </button>
                )}
              </div>

              {/* Formulaire de déverrouillage si contenu chiffré et non déverrouillé */}
              {hasEncryptedContent && !isUnlocked && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-dark-300 rounded-xl p-6 mb-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-full bg-primary-500/20">
                      <Lock className="text-primary-400" size={24} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{t('competition.protectedWriteups')}</h3>
                      <p className="text-gray-400 text-sm">{t('competition.enterPassword')}</p>
                    </div>
                  </div>
                  <form onSubmit={handleUnlock} className="flex gap-3">
                    <div className="relative flex-1">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setError('');
                        }}
                        placeholder={t('competition.passwordPlaceholder')}
                        className="w-full px-4 py-3 pr-12 bg-dark-400 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-primary-500/25 transition-shadow"
                    >
                      {t('competition.unlock')}
                    </motion.button>
                  </form>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-red-400 text-sm mt-3"
                    >
                      <AlertCircle size={16} />
                      {t('competition.wrongPassword')}
                    </motion.div>
                  )}
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {challenges.map((challenge, i) => {
                  const isUnsolved = challenge.solved === false;
                  const isLocked = hasEncryptedContent && !isUnlocked && challenge.encryptedContent;

                  if (isUnsolved) {
                    return (
                      <motion.div
                        key={challenge.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.03 }}
                        className="bg-dark-200/50 rounded-xl p-4 border border-dashed border-gray-700 opacity-60"
                      >
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            <Lock size={14} className="text-gray-500" />
                            <h3 className="text-gray-400 font-medium">
                              {challenge.name}
                            </h3>
                          </div>
                          <div className="flex items-center gap-4">
                            {challenge.difficulty && (
                              <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getDifficultyColor(challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1))}`}>
                                {challenge.difficulty}
                              </span>
                            )}
                            <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getCategoryColor(challenge.category)}`}>
                              {challenge.category}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <span>{t('competition.unsolved')}</span>
                          {challenge.points && <span>• {challenge.points} pts</span>}
                        </div>
                      </motion.div>
                    );
                  }

                  // Challenge verrouillé (writeup chiffré et pas déverrouillé)
                  if (isLocked) {
                    return (
                      <motion.div
                        key={challenge.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.03 }}
                        className="bg-dark-200 rounded-xl p-4 opacity-75"
                      >
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div>
                            {challenge.day && (
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-primary-400 font-mono text-xs">{t('challenge.day')} {challenge.day}</span>
                              </div>
                            )}
                            <h3 className="text-white font-medium flex items-center gap-2">
                              {challenge.name}
                              <Lock size={14} className="text-gray-500" />
                            </h3>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getCategoryColor(challenge.category)}`}>
                            {challenge.category}
                          </span>
                        </div>
                        {challenge.techniques.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {challenge.techniques.map((tech) => (
                              <span key={tech} className="px-2 py-0.5 bg-dark-300 rounded text-xs text-gray-400">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Lock size={12} />
                          <span>{t('competition.unlockToView')}</span>
                        </div>
                      </motion.div>
                    );
                  }

                  return (
                    <Link
                      key={challenge.id}
                      to={`/ctf/${id}/${challenge.id}`}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.03 }}
                        className="bg-dark-200 rounded-xl p-4 hover:bg-dark-100 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div>
                            {challenge.day && (
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-primary-400 font-mono text-xs">{t('challenge.day')} {challenge.day}</span>
                              </div>
                            )}
                            <h3 className="text-white font-medium group-hover:text-primary-400 transition-colors">
                              {challenge.name}
                            </h3>
                          </div>
                          <div className="flex items-center gap-4">
                            {challenge.difficulty && (
                              <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getDifficultyColor(challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1))}`}>
                                {challenge.difficulty}
                              </span>
                            )}
                            <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getCategoryColor(challenge.category)}`}>
                              {challenge.category}
                            </span>
                          </div>
                        </div>
                        {challenge.techniques.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {challenge.techniques.map((tech) => (
                              <span key={tech} className="px-2 py-0.5 bg-dark-300 rounded text-xs text-gray-400">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-primary-400 text-sm font-medium group-hover:gap-2 transition-all">
                          <span>{t('competition.viewWriteup')}</span>
                          <ChevronRight size={14} />
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* No writeup message */}
          {!competition.content && machines.length === 0 && challenges.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-8 text-center"
            >
              <Flag className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500">{t('competition.writeupComing')}</p>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
