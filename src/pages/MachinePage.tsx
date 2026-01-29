import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Calendar, Flag, Terminal, Tag, Lock, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getMachine } from '../data/machines';
import { bootToRoot } from '../data/achievements';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EncryptedMachineContent from '../components/EncryptedMachineContent';
import { useLanguage } from '../contexts/LanguageContext';
import { getLocalizedContent } from '../utils/bilingualContent';
import { useSEO, seoConfigs } from '../hooks/useSEO';

interface MachineFlags {
  user?: string;
  root?: string;
  web?: string;
  internal?: string;
  services?: string;
}

export default function MachinePage() {
  const { id, machineId } = useParams<{ id: string; machineId: string }>();
  const { t, language } = useLanguage();

  const machine = getMachine(id || '', machineId || '');
  const competition = bootToRoot.find(c => c.id === id);

  const [unlockedFlags, setUnlockedFlags] = useState<MachineFlags>({});

  // Dynamic SEO
  useSEO(
    machine && competition
      ? seoConfigs.machine(machine, competition.title, id || '', machineId || '', language)
      : {}
  );

  if (!machine || !competition) {
    return (
      <div className="min-h-screen bg-dark-400">
        <Navbar />
        <div className="pt-32 pb-24 px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">{t('challenge.notFound')}</h1>
          <Link to="/" className="text-primary-400 hover:text-primary-300">
            {t('challenge.backToAchievements')}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

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

  const getFlag = (type: keyof MachineFlags): string | undefined => {
    if (unlockedFlags[type]) return unlockedFlags[type];
    if (machine.flags[type] && machine.flags[type] !== '[HIDDEN]') return machine.flags[type];
    return undefined;
  };

  const isFlagLocked = (type: keyof MachineFlags): boolean => {
    return machine.flags[type] === '[HIDDEN]' && !unlockedFlags[type];
  };

  const markdownComponents = {
    code({ className, children, ...props }: { className?: string; children?: React.ReactNode }) {
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
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-xl font-semibold text-white mt-8 mb-4 border-b border-gray-800 pb-2">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-lg font-medium text-gray-200 mt-6 mb-3">{children}</h3>
    ),
    p: ({ children }: { children?: React.ReactNode }) => <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>,
    ul: ({ children }: { children?: React.ReactNode }) => <ul className="text-gray-300 mb-4 list-disc pl-6">{children}</ul>,
    ol: ({ children }: { children?: React.ReactNode }) => <ol className="text-gray-300 mb-4 list-decimal pl-6">{children}</ol>,
    li: ({ children }: { children?: React.ReactNode }) => <li className="mb-1">{children}</li>,
    strong: ({ children }: { children?: React.ReactNode }) => <strong className="text-white font-semibold">{children}</strong>,
    hr: () => <hr className="border-gray-700 my-6" />,
    a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">
        {children}
      </a>
    ),
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
              to={`/boot2root/${id}`}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>{t('challenge.backTo')} {competition.title}</span>
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
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(machine.difficulty)}`}>
                {machine.difficulty}
              </span>
              <span className="px-3 py-1 rounded-full text-sm bg-gray-500/20 text-gray-400 border border-gray-500/30">
                {machine.os}
              </span>
              {machine.solvedByMe && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                  <Zap size={14} className="fill-current" />
                  {t('machine.solvedByMe')}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">{machine.name}</span>
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{machine.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={18} />
                <span>{competition.platform}</span>
              </div>
            </div>
          </motion.div>

          {/* Flags Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-6 mb-8"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Flag className="w-5 h-5 text-red-500" />
              Flags
            </h2>
            {Object.keys(machine.flags).every(key => isFlagLocked(key as keyof typeof machine.flags)) && Object.keys(unlockedFlags).length === 0 ? (
              <div className="bg-dark-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Flag className="w-4 h-4 text-green-500" />
                  <span className="text-gray-400 text-sm">Flags</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Lock size={14} />
                  <span className="font-mono text-sm">{t('challenge.unlockWriteup')}</span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(machine.flags.web || unlockedFlags.web) && (
                  <div className="bg-dark-200 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Web Flag</div>
                    {isFlagLocked('web') ? (
                      <div className="flex items-center gap-2 text-gray-500">
                        <Lock size={14} />
                        <span className="font-mono text-sm">{t('challenge.unlockWriteup')}</span>
                      </div>
                    ) : (
                      <code className="text-green-400 text-sm break-all">{getFlag('web')}</code>
                    )}
                  </div>
                )}
                {(machine.flags.services || unlockedFlags.services) && (
                  <div className="bg-dark-200 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Services Flag</div>
                    {isFlagLocked('services') ? (
                      <div className="flex items-center gap-2 text-gray-500">
                        <Lock size={14} />
                        <span className="font-mono text-sm">{t('challenge.unlockWriteup')}</span>
                      </div>
                    ) : (
                      <code className="text-green-400 text-sm break-all">{getFlag('services')}</code>
                    )}
                  </div>
                )}
                {(machine.flags.internal || unlockedFlags.internal) && (
                  <div className="bg-dark-200 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Internal Flag</div>
                    {isFlagLocked('internal') ? (
                      <div className="flex items-center gap-2 text-gray-500">
                        <Lock size={14} />
                        <span className="font-mono text-sm">{t('challenge.unlockWriteup')}</span>
                      </div>
                    ) : (
                      <code className="text-purple-400 text-sm break-all">{getFlag('internal')}</code>
                    )}
                  </div>
                )}
                {(machine.flags.user || unlockedFlags.user) && (
                  <div className="bg-dark-200 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">User Flag</div>
                    {isFlagLocked('user') ? (
                      <div className="flex items-center gap-2 text-gray-500">
                        <Lock size={14} />
                        <span className="font-mono text-sm">{t('challenge.unlockWriteup')}</span>
                      </div>
                    ) : (
                      <code className="text-yellow-400 text-sm break-all">{getFlag('user')}</code>
                    )}
                  </div>
                )}
                {(machine.flags.root || unlockedFlags.root) && (
                  <div className="bg-dark-200 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Root Flag</div>
                    {isFlagLocked('root') ? (
                      <div className="flex items-center gap-2 text-gray-500">
                        <Lock size={14} />
                        <span className="font-mono text-sm">{t('challenge.unlockWriteup')}</span>
                      </div>
                    ) : (
                      <code className="text-red-400 text-sm break-all">{getFlag('root')}</code>
                    )}
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Techniques */}
          {machine.techniques.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6 mb-8"
            >
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5 text-blue-500" />
                Techniques
              </h2>
              <div className="flex flex-wrap gap-2">
                {machine.techniques.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-dark-200 rounded-lg text-gray-300 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Writeup Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-green-500" />
                {t('challenge.writeup')}
              </h2>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 text-xs rounded-full border border-amber-500/20">
                {t('challenge.summary')}
              </span>
            </div>

            {machine.encryptedContent ? (
              <EncryptedMachineContent
                encryptedContent={machine.encryptedContent}
                machineId={machineId || ''}
                onUnlockChange={(isUnlocked, flags) => setUnlockedFlags(isUnlocked ? flags : {})}
              >
                {(decryptedContent) => (
                  <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={markdownComponents}
                    >
                      {getLocalizedContent(decryptedContent, language)}
                    </ReactMarkdown>
                  </div>
                )}
              </EncryptedMachineContent>
            ) : (
              <div className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={markdownComponents}
                >
                  {getLocalizedContent(machine.content || '', language)}
                </ReactMarkdown>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
