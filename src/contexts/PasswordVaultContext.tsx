import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from 'react';
import CryptoJS from 'crypto-js';

interface PasswordData {
  ctf: Record<string, string>;
  machines: Record<string, { password: string; status: string }>;
}

interface PasswordVaultContextType {
  isVaultUnlocked: boolean;
  unlockVault: (masterPassword: string) => boolean;
  lockVault: () => void;
  getPassword: (type: 'ctf' | 'machine', id: string) => string | null;
  getAllPasswords: () => PasswordData | null;
  isLocked: boolean;
}

const PasswordVaultContext = createContext<PasswordVaultContextType | undefined>(undefined);

const VAULT_STORAGE_KEY = 'portfolio_vault_unlocked';
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 30000; // 30 seconds

// Vault chiffré avec le mot de passe principal (généré par scripts/encrypt-vault.cjs)
const ENCRYPTED_VAULT = 'U2FsdGVkX18Vl+r8KHBNfgMH6s9iU3FbEjpqBWLVieafAnkZWI6dKuL0yKqfaJNBkPWUL46Cmx8V1KBxwutLRCIxv4mbsegt3sAuwAAYUgBrWOuFKnJdXmJGXAbTARnVv4Y+WQvYqr51fNyq6GiN/R0T345G9E3clLERxWpgdiRMdt5f7w+UC/on7LYN+V/MjGATDnzvTMibHsYdNnwPA4uOjv86sYksGItDFYiJAD2S6C4Uv1TCF3ul6odrIUrrC5lSTgvtoOBjRg0xESNtp5Qx/Ivt72wIr//W+P54eHgP50GkIZGmVefk20IBJRanjOs2nXR6vPIsYfP5IM1uj7/aKmIWwJt+VWOGSs4ComwLPM9Y5bTQh2giDtqOT2j2RtqSlFULLjArXqRI1p/CxkDDhgbdR7wgFAnYwYjObnQmcHgPLX7ZQoP+D51480NTNPir9ndYO7gvR2r25VmXteCqBiLq6PGL7/XNXARwziVFqh9QlgF1zBsifyBf9UbDltg34wbSRSZPjGWpV0/v7AyEPnJ9PUZwnj3eOMybsWV1MKhpopNXPUVQwcNFWU4yRtG7c0MzRH2JVNIc1hfU5t/AHQXSU5EHh9lXqvv7W2xyx6c31oosDtH0QbPGtkF2WmXq7geP4oitioWQc67adMG2L6TW2O0L43lt3jusUp2KOw48zljN/yuV3FAuh7scgrB3KO47Q2JIIkIaemCHYbrkWUtE2e2HwPKOv62Y2r1IFVErbi4Uq48UmyBOKih6r/gCXjHzcwdnKXImgwCCBxxoZsr2bDM3cpeLV+3jmtdOqJvKII0SLhkcdi11gP3revmjN4134MDZMZ6lLUFX5Hi5tbiVFKzAriNX0XVZkmDYltQ/IGZMcqopqJtedVmIfEnHOAWmwWUE3pqDnu2c64tVaH/s5sX4BWv1tB55cNb161FbZHsMCSxZB+4M2H6m1FFBcl8nieOETnYtm78XjTjnN/g75OR80VEhDE6MBigKiojwldDSmDGY4PifoTz0tiP/3Cz9yqvvH39fUihFFMhpT5R8b9QW3kzJOabHh8BAFtek0N7+RAGVCb7bzKNzZ12f9u9rS4iu09x+1dBNl1aK4xarbpd9LMEToVZ9JIvp/Zzp8CpnTpOJzfHZYN579eaPGxPc+ueYRchiFQSFR51fLVvEWDIXn4y7n3o1W4VrkVZ4NGCfw6KkmEVn6z+h/QkFf+1SUOFecMsJ34cIjEKQnOuqvJPchTf2Be8MuPpjZ4kj38Rw9WVFidiHszVthSyCEPK2bJkIXalSd4rB1gEsNddeLx6hkYfhxckXoJPolq5YzIqwgmrkN0bZF7yH4AulE0qMJvOA1cw5RJfz8FXyZHYJ3ZCdKqAvnRKNID3/+X8chxaPi2SiiNPESkKZksRggQl1ZOeTEBG3if8dfAu3Q42ovVxBwdXiVI4rxeZ8vS7M/BkCg9h3/guwF+xkFqHOOAzjfPzsBlRTX9LXne0mkhfZE9rTA8XW4hMqF1Y=';

export function PasswordVaultProvider({ children }: { children: ReactNode }) {
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
  const [passwords, setPasswords] = useState<PasswordData | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const attemptsRef = useRef(0);
  const lockoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Vérifier si déjà déverrouillé (session storage) - restore state on mount
  useEffect(() => {
    const storedData = sessionStorage.getItem(VAULT_STORAGE_KEY);
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setPasswords(parsed);
        setIsVaultUnlocked(true);
      } catch {
        sessionStorage.removeItem(VAULT_STORAGE_KEY);
      }
    }
    return () => {
      if (lockoutTimerRef.current) clearTimeout(lockoutTimerRef.current);
    };
  }, []);

  const unlockVault = (masterPassword: string): boolean => {
    if (isLocked) return false;

    try {
      const bytes = CryptoJS.AES.decrypt(ENCRYPTED_VAULT, masterPassword);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);

      if (decrypted && decrypted.length > 0) {
        const parsed = JSON.parse(decrypted);
        setPasswords(parsed);
        setIsVaultUnlocked(true);
        attemptsRef.current = 0;
        // Stocker les mots de passe déchiffrés pour cette session
        try {
          sessionStorage.setItem(VAULT_STORAGE_KEY, decrypted);
        } catch {
          // sessionStorage quota exceeded - continue without persistence
        }
        return true;
      }

      attemptsRef.current++;
      if (attemptsRef.current >= MAX_ATTEMPTS) {
        setIsLocked(true);
        lockoutTimerRef.current = setTimeout(() => {
          setIsLocked(false);
          attemptsRef.current = 0;
        }, LOCKOUT_DURATION);
      }
      return false;
    } catch {
      attemptsRef.current++;
      if (attemptsRef.current >= MAX_ATTEMPTS) {
        setIsLocked(true);
        lockoutTimerRef.current = setTimeout(() => {
          setIsLocked(false);
          attemptsRef.current = 0;
        }, LOCKOUT_DURATION);
      }
      return false;
    }
  };

  const lockVault = () => {
    setIsVaultUnlocked(false);
    setPasswords(null);
    sessionStorage.removeItem(VAULT_STORAGE_KEY);
    // Aussi nettoyer tous les writeups déverrouillés individuellement
    Object.keys(sessionStorage).forEach(key => {
      if (key.startsWith('writeup_unlocked_') || key.startsWith('machine_unlocked_')) {
        sessionStorage.removeItem(key);
      }
    });
  };

  const getPassword = (type: 'ctf' | 'machine', id: string): string | null => {
    if (!passwords) return null;

    if (type === 'ctf') {
      return passwords.ctf?.[id] || null;
    } else {
      return passwords.machines?.[id]?.password || null;
    }
  };

  const getAllPasswords = (): PasswordData | null => {
    return passwords;
  };

  return (
    <PasswordVaultContext.Provider value={{ isVaultUnlocked, unlockVault, lockVault, getPassword, getAllPasswords, isLocked }}>
      {children}
    </PasswordVaultContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePasswordVault() {
  const context = useContext(PasswordVaultContext);
  if (!context) {
    throw new Error('usePasswordVault must be used within a PasswordVaultProvider');
  }
  return context;
}
