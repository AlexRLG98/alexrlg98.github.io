import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import CryptoJS from 'crypto-js';
import { useLanguage } from '../contexts/LanguageContext';
import { usePasswordVault } from '../contexts/PasswordVaultContext';

interface EncryptedContentProps {
  encryptedContent: string;
  competitionId: string;
  children: (decryptedContent: string, flag: string | null) => React.ReactNode;
  onUnlockChange?: (isUnlocked: boolean, flag: string | null) => void;
}

// Clés de stockage pour mémoriser le déverrouillage
const STORAGE_KEY_PREFIX = 'writeup_unlocked_';

// Fonction pour extraire le flag du contenu déchiffré
function extractFlag(content: string): { flag: string | null; cleanContent: string } {
  const flagMatch = content.match(/## Flag\s*\n\s*`([^`]+)`\s*\n\s*---\s*\n/);
  if (flagMatch) {
    return {
      flag: flagMatch[1],
      cleanContent: content.replace(flagMatch[0], '')
    };
  }
  return { flag: null, cleanContent: content };
}

export default function EncryptedContent({
  encryptedContent,
  competitionId,
  children,
  onUnlockChange
}: EncryptedContentProps) {
  const { t } = useLanguage();
  const { isVaultUnlocked, getPassword } = usePasswordVault();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [decryptedContent, setDecryptedContent] = useState<string | null>(null);
  const [extractedFlag, setExtractedFlag] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Ref pour stocker le callback et éviter les infinite loops
  const onUnlockChangeRef = useRef(onUnlockChange);

  // Update ref in useEffect to avoid modification during render
  useEffect(() => {
    onUnlockChangeRef.current = onUnlockChange;
  }, [onUnlockChange]);

  const tryDecrypt = useCallback((pwd: string): boolean => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedContent, pwd);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);

      if (decrypted && decrypted.length > 0) {
        // Retirer les backslashes d'échappement des backticks
        const cleanedContent = decrypted.replace(/\\`/g, '`');
        // Extraire le flag et nettoyer le contenu
        const { flag, cleanContent } = extractFlag(cleanedContent);
        setDecryptedContent(cleanContent);
        setExtractedFlag(flag);
        setIsUnlocked(true);
        setError('');
        // Mémoriser pour cette session
        sessionStorage.setItem(STORAGE_KEY_PREFIX + competitionId, pwd);
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  }, [encryptedContent, competitionId]);

  // Notifier le parent quand l'état change (utiliser ref pour éviter infinite loop)
  useEffect(() => {
    onUnlockChangeRef.current?.(isUnlocked, extractedFlag);
  }, [isUnlocked, extractedFlag]);

  // Vérifier si déjà déverrouillé (session storage ou vault) - auto-unlock on mount
  useEffect(() => {
    // D'abord essayer avec le vault
    if (isVaultUnlocked) {
      const vaultPassword = getPassword('ctf', competitionId);
      if (vaultPassword && tryDecrypt(vaultPassword)) {
        return;
      }
    }
    // Sinon essayer avec le session storage
    const storedPassword = sessionStorage.getItem(STORAGE_KEY_PREFIX + competitionId);
    if (storedPassword) {
      tryDecrypt(storedPassword);
    }
  }, [competitionId, isVaultUnlocked, getPassword, tryDecrypt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    tryDecrypt(password);
  };

  const handleLock = () => {
    setIsUnlocked(false);
    setDecryptedContent(null);
    setExtractedFlag(null);
    setPassword('');
    sessionStorage.removeItem(STORAGE_KEY_PREFIX + competitionId);
    onUnlockChange?.(false, null);
  };

  // Si déverrouillé, afficher le contenu
  if (isUnlocked && decryptedContent) {
    return (
      <div className="relative">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleLock}
          className="absolute top-0 right-0 flex items-center gap-2 px-3 py-1.5 text-xs text-gray-400 hover:text-white glass rounded-lg transition-colors"
        >
          <Unlock size={14} />
          {t('encrypted.lock')}
        </motion.button>
        {children(decryptedContent, extractedFlag)}
      </div>
    );
  }

  // Formulaire de déverrouillage
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16"
    >
      <div className="glass rounded-2xl p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-500/20 flex items-center justify-center">
          <Lock className="text-primary-400" size={32} />
        </div>

        <h3 className="text-xl font-bold text-white mb-2">
          {t('encrypted.protectedWriteup')}
        </h3>
        <p className="text-gray-400 text-sm mb-6">
          {t('encrypted.protectedMessage')}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder={t('encrypted.passwordPlaceholder')}
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
            {t('encrypted.unlock')}
          </motion.button>
        </form>

      </div>
    </motion.div>
  );
}
