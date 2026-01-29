import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Tag, ChevronLeft, ChevronRight, Flag, Lock, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CryptoJS from 'crypto-js';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getChallengesByCompetition, getChallenge } from '../data/challenges';
import { ctfCompetitions } from '../data/achievements';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EncryptedContent from '../components/EncryptedContent';
import { useLanguage } from '../contexts/LanguageContext';
import { getLocalizedContent } from '../utils/bilingualContent';
import { useSEO, seoConfigs } from '../hooks/useSEO';
import { usePasswordVault } from '../contexts/PasswordVaultContext';

export default function ChallengePage() {
  const { id, challengeId } = useParams<{ id: string; challengeId: string }>();
  const { t, language } = useLanguage();
  const { isVaultUnlocked, getPassword } = usePasswordVault();

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [unlockedFlag, setUnlockedFlag] = useState<string | null>(null);

  const competition = ctfCompetitions.find(c => c.id === id);
  const challenge = getChallenge(id || '', challengeId || '');
  const challenges = getChallengesByCompetition(id || '');

  // Dynamic SEO
  useSEO(
    competition && challenge
      ? seoConfigs.challenge(challenge, competition.title, id || '', challengeId || '', language)
      : {}
  );

  const hasEncryptedContent = challenges.some(c => c.encryptedContent);
  const STORAGE_KEY = `writeup_unlocked_${id}`;

  // Check unlock status on mount
  useEffect(() => {
    if (!hasEncryptedContent) {
      setIsChecking(false);
      setIsUnlocked(true);
      return;
    }

    const firstEncrypted = challenges.find(c => c.encryptedContent)?.encryptedContent;
    if (!firstEncrypted) {
      setIsChecking(false);
      return;
    }

    // D'abord essayer avec le vault (si déverrouillé)
    if (isVaultUnlocked) {
      const vaultPassword = getPassword('ctf', id || '');
      if (vaultPassword) {
        try {
          const bytes = CryptoJS.AES.decrypt(firstEncrypted, vaultPassword);
          const decrypted = bytes.toString(CryptoJS.enc.Utf8);
          if (decrypted && decrypted.length > 0) {
            setIsUnlocked(true);
            setIsChecking(false);
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
          setIsChecking(false);
          return;
        }
      } catch {
        // Invalid password
      }
    }

    // Si ni vault ni session storage ne fonctionne, verrouiller
    setIsUnlocked(false);
    setIsChecking(false);
  }, [id, hasEncryptedContent, challenges, STORAGE_KEY, isVaultUnlocked, getPassword]);

  // Navigation between challenges (only show solved challenges)
  const solvedChallenges = challenges.filter(c => c.solved !== false);
  const currentIndex = solvedChallenges.findIndex(c => c.id === challengeId);
  const prevChallenge = currentIndex > 0 ? solvedChallenges[currentIndex - 1] : null;
  const nextChallenge = currentIndex < solvedChallenges.length - 1 ? solvedChallenges[currentIndex + 1] : null;

  if (!competition || !challenge) {
    return (
      <div className="min-h-screen bg-dark-400 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">{t('challenge.notFound')}</h1>
          <Link to="/" state={{ scrollTo: 'achievements' }} className="text-primary-400 hover:text-primary-300">
            {t('challenge.backToAchievements')}
          </Link>
        </div>
      </div>
    );
  }

  if (isChecking) {
    return (
      <div className="min-h-screen bg-dark-400 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (hasEncryptedContent && !isUnlocked && challenge.encryptedContent) {
    return <Navigate to={`/ctf/${id}`} replace />;
  }

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
              to={`/ctf/${id}`}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>{t('challenge.backTo')} {competition.title}</span>
            </Link>
          </motion.div>

          {/* Challenge header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-8 mb-8"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  {challenge.day && <span className="text-primary-400 font-mono text-sm">{t('challenge.day')} {challenge.day}</span>}
                  <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getCategoryColor(challenge.category)}`}>
                    {challenge.category}
                  </span>
                  {challenge.teamFirstBlood && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                      <Zap size={12} className="fill-current" />
                      {t('challenge.teamFirstBlood')}
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-white">{challenge.name}</h1>
              </div>
            </div>

            {/* Flag */}
            <div className="bg-dark-300 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Flag className="w-4 h-4 text-green-500" />
                <span className="text-gray-400 text-sm">Flag</span>
              </div>
              {unlockedFlag ? (
                <code className="text-green-400 font-mono text-sm break-all">{unlockedFlag}</code>
              ) : challenge.flag === '[HIDDEN]' ? (
                <div className="flex items-center gap-2 text-gray-500">
                  <Lock size={14} />
                  <span className="font-mono text-sm">{t('challenge.unlockWriteup')}</span>
                </div>
              ) : (
                <code className="text-green-400 font-mono text-sm break-all">{challenge.flag}</code>
              )}
            </div>
          </motion.div>

          {/* Writeup content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-8 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Tag className="w-5 h-5 text-primary-500" />
                {t('challenge.writeup')}
              </h2>
              {id !== 'htb-university-ctf' && (
                <span className="px-3 py-1 bg-amber-500/10 text-amber-400 text-xs rounded-full border border-amber-500/20">
                  {t('challenge.summary')}
                </span>
              )}
            </div>
            {challenge.encryptedContent ? (
              <EncryptedContent
                encryptedContent={challenge.encryptedContent}
                competitionId={id || ''}
                onUnlockChange={(isUnlocked, flag) => setUnlockedFlag(isUnlocked ? flag : null)}
              >
                {(decryptedContent) => (
                  <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code({ className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || '');
                          const isInline = !match && !className;
                          return isInline ? (
                            <code className="bg-dark-300 px-1.5 py-0.5 rounded text-primary-400" {...props}>
                              {children}
                            </code>
                          ) : (
                            <SyntaxHighlighter
                              style={oneDark}
                              language={match ? match[1] : 'text'}
                              PreTag="div"
                              className="rounded-lg !bg-dark-300 !my-4"
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          );
                        },
                        h2: ({ children }) => (
                          <h2 className="text-lg font-semibold text-white mt-6 mb-3 border-b border-dark-200 pb-2">{children}</h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-base font-medium text-gray-200 mt-4 mb-2">{children}</h3>
                        ),
                        p: ({ children }) => (
                          <p className="text-gray-300 mb-3 leading-relaxed">{children}</p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside text-gray-300 mb-3 space-y-1">{children}</ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal list-inside text-gray-300 mb-3 space-y-1">{children}</ol>
                        ),
                        li: ({ children }) => (
                          <li className="text-gray-300">{children}</li>
                        ),
                        strong: ({ children }) => (
                          <strong className="text-white font-semibold">{children}</strong>
                        ),
                        hr: () => (
                          <hr className="border-dark-200 my-6" />
                        ),
                      }}
                    >
                      {getLocalizedContent(decryptedContent, language)}
                    </ReactMarkdown>
                  </div>
                )}
              </EncryptedContent>
            ) : (
              <div className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      const isInline = !match && !className;
                      return isInline ? (
                        <code className="bg-dark-300 px-1.5 py-0.5 rounded text-primary-400" {...props}>
                          {children}
                        </code>
                      ) : (
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match ? match[1] : 'text'}
                          PreTag="div"
                          className="rounded-lg !bg-dark-300 !my-4"
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      );
                    },
                    h2: ({ children }) => (
                      <h2 className="text-lg font-semibold text-white mt-6 mb-3 border-b border-dark-200 pb-2">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-base font-medium text-gray-200 mt-4 mb-2">{children}</h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-gray-300 mb-3 leading-relaxed">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside text-gray-300 mb-3 space-y-1">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside text-gray-300 mb-3 space-y-1">{children}</ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-gray-300">{children}</li>
                    ),
                    strong: ({ children }) => (
                      <strong className="text-white font-semibold">{children}</strong>
                    ),
                    hr: () => (
                      <hr className="border-dark-200 my-6" />
                    ),
                  }}
                >
                  {getLocalizedContent(challenge.content || '', language)}
                </ReactMarkdown>
              </div>
            )}
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-between gap-4"
          >
            {prevChallenge ? (
              <Link
                to={`/ctf/${id}/${prevChallenge.id}`}
                className="flex-1 glass rounded-xl p-4 hover:bg-dark-200 transition-colors group"
              >
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                  <ChevronLeft size={16} />
                  <span>{t('challenge.previous')}</span>
                </div>
                <div className="text-white font-medium group-hover:text-primary-400 transition-colors">
                  {prevChallenge.day ? `${t('challenge.day')} ${prevChallenge.day}: ` : ''}{prevChallenge.name}
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {nextChallenge ? (
              <Link
                to={`/ctf/${id}/${nextChallenge.id}`}
                className="flex-1 glass rounded-xl p-4 hover:bg-dark-200 transition-colors group text-right"
              >
                <div className="flex items-center justify-end gap-2 text-gray-400 text-sm mb-1">
                  <span>{t('challenge.next')}</span>
                  <ChevronRight size={16} />
                </div>
                <div className="text-white font-medium group-hover:text-primary-400 transition-colors">
                  {nextChallenge.day ? `${t('challenge.day')} ${nextChallenge.day}: ` : ''}{nextChallenge.name}
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
