import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Eye, EyeOff, AlertCircle, Key, Copy, Check, X, Shield } from 'lucide-react';
import { usePasswordVault } from '../contexts/PasswordVaultContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function VaultPanel() {
  const { t } = useLanguage();
  const { isVaultUnlocked, unlockVault, lockVault, getAllPasswords } = usePasswordVault();
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (unlockVault(password)) {
      setError('');
      setPassword('');
    } else {
      setError(t('vault.wrongPassword'));
    }
  };

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const passwords = getAllPasswords();

  return (
    <>
      {/* Bouton flottant */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full glass shadow-lg hover:shadow-primary-500/25 transition-all group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isVaultUnlocked ? (
          <Unlock className="w-6 h-6 text-green-400" />
        ) : (
          <Lock className="w-6 h-6 text-primary-400" />
        )}
      </motion.button>

      {/* Panel modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-dark-100 border-l border-gray-800 z-50 overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-dark-100/95 backdrop-blur-sm border-b border-gray-800 p-4 pt-20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isVaultUnlocked ? 'bg-green-500/20' : 'bg-primary-500/20'}`}>
                    <Shield className={`w-5 h-5 ${isVaultUnlocked ? 'text-green-400' : 'text-primary-400'}`} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">{t('vault.title')}</h2>
                    <p className="text-xs text-gray-500">
                      {isVaultUnlocked ? t('vault.unlocked') : t('vault.locked')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-dark-200 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="p-4">
                {!isVaultUnlocked ? (
                  /* Formulaire de déverrouillage */
                  <form onSubmit={handleUnlock} className="space-y-4">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-500/20 flex items-center justify-center">
                        <Key className="text-primary-400" size={32} />
                      </div>
                      <p className="text-gray-400 text-sm">
                        {t('vault.enterMasterPassword')}
                      </p>
                    </div>

                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setError('');
                        }}
                        placeholder={t('vault.passwordPlaceholder')}
                        className="w-full px-4 py-3 pr-12 bg-dark-300 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-2 text-red-400 text-sm"
                      >
                        <AlertCircle size={16} />
                        {error}
                      </motion.div>
                    )}

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-primary-500/25 transition-shadow"
                    >
                      {t('vault.unlock')}
                    </motion.button>
                  </form>
                ) : (
                  /* Affichage des mots de passe */
                  <div className="space-y-6">
                    {/* Bouton verrouiller */}
                    <button
                      onClick={lockVault}
                      className="w-full py-2 px-4 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2"
                    >
                      <Lock size={16} />
                      {t('vault.lockAll')}
                    </button>

                    {/* CTF */}
                    {passwords?.ctf && Object.keys(passwords.ctf).length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                          CTF
                        </h3>
                        <div className="space-y-2">
                          {Object.entries(passwords.ctf).map(([id, pwd]) => (
                            <div
                              key={id}
                              className="p-3 bg-dark-200 rounded-lg border border-gray-800"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-300 font-medium">{id}</span>
                                <button
                                  onClick={() => handleCopy(pwd, `ctf-${id}`)}
                                  className="p-1.5 hover:bg-dark-300 rounded transition-colors"
                                >
                                  {copiedId === `ctf-${id}` ? (
                                    <Check size={14} className="text-green-400" />
                                  ) : (
                                    <Copy size={14} className="text-gray-500" />
                                  )}
                                </button>
                              </div>
                              <code className="text-xs text-primary-400 font-mono break-all">
                                {pwd}
                              </code>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Machines */}
                    {passwords?.machines && Object.keys(passwords.machines).length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                          Machines
                        </h3>
                        <div className="space-y-2">
                          {Object.entries(passwords.machines).map(([id, data]) => (
                            <div
                              key={id}
                              className="p-3 bg-dark-200 rounded-lg border border-gray-800"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-300 font-medium">{id}</span>
                                <button
                                  onClick={() => handleCopy(data.password, `machine-${id}`)}
                                  className="p-1.5 hover:bg-dark-300 rounded transition-colors"
                                >
                                  {copiedId === `machine-${id}` ? (
                                    <Check size={14} className="text-green-400" />
                                  ) : (
                                    <Copy size={14} className="text-gray-500" />
                                  )}
                                </button>
                              </div>
                              <code className="text-xs text-primary-400 font-mono break-all">
                                {data.password}
                              </code>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
