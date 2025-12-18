import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
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
}

const PasswordVaultContext = createContext<PasswordVaultContextType | undefined>(undefined);

const VAULT_STORAGE_KEY = 'portfolio_vault_unlocked';

// Vault chiffré avec le mot de passe principal (généré par scripts/encrypt-vault.cjs)
const ENCRYPTED_VAULT = 'U2FsdGVkX1/138iJWbZEntZxWzDyxoOCh9cwur7v9UWXvlKBowcASjCDzslNI8LhTWLAzDvBvDuPBrs25gNV3/3f521KetzSVTUKIUq3WUPRkV5LLkl0LI0KaCQGaRuLIi2wa2KB5fEB+hFCBnrUbwZPpr12s+SJo4Xzi7h1geuuf8rm03BQRz9CKmj8x7WyvfESCVy6Y73cApL0H1AvFsBmyelO4l88OoRTAvXt8HVFyoh10Vy6/QPRvi3KXA+G0MN60myOB+4tBtYJyKaXuRfMIX9RdWzOlCAngDbg0O+Zt2tnIriHiBs/CpUUpPuEZ2gS4XAWCMJcECNRGci6mw4yrUdmMM55QMPrF9SVcbV1PrmAblDI34wPFT4WBQEb2rxBNswaYiDx+NB018GS9IIdloXvxrFqR92E/v1+pAUWMQ2BUlhTKTcHpZs+WmA76WhMun9sLFd0ep0mYsTVQFYccGEtEoOPOTxJu9GIC3RSmxPLnhg/Mg3qHzyoNuL3E3HdZNw1YRJPCWYlgyf5EmbmYxLuMvFwebi5Ac8j6a8vBHEYO0mftrv4UOoSLwTwSsY+yayTKQj1GKEbbNuvTCoEKg189GIYQ+S230c3dBuUkuDOQOLVe4oWpMhvnDL/r3ZxOaqp63xU27h909BdGryU9jI21c00jPM1DOS0MTNOgtn9Ao74gKAwvOqW40jQnIvDeTC0+vu5rPLwo11gMmgBAAHZbO4Hh4Kz3sWNQFb5tAg8fpLKgukuQYp4c/zA20qof7sTrMxrdBj717Tz5DyRJYBHTA0HZbITu5HTTDjVl2Yimng1QLJKc8wmlNQNy6+qFBzP4bo0/956YXFF8zlQ4MkEIg+r/7qtSKeKY4qx2UAXVtsH4bZgcVjbXY9/iKe8NutygIkJROp6+yIv3D81Y4eWUeanp6Ej0Vcr34EkdI6/8tbAZJo33392/QDQz+wCEXrLaxoxs5ArYb5YRxTU5GZysXy8576CMYrZ41pktakmySoLvjDyrH1NpOLISp/ACvGVmWSqxi0ECHRK6V4tNi0Z5RbFBOe0FZipgxuRXOlRkWpgMdTX4HciBQJYUlaj148HCQ/UE8vDSDD7d2BKFNPpw4dqaB+dTSNEXHViV48BQoKm9vHoWAbOC35u8w0VrRqIwPEkD+BdU5OsIIc7WKp6+/df4HDbPnIVF4UzJ7OFUsDjWEV2hrom1UvyzOyJKPXo2U4hoj7fc1mb36TBBlc734A5oITbk8bcgwi0MWURjZiWQjk5hQEHUX1D42MrhjHok70SnWH2OC1mQqqFCpruffl7cCf0ZliQnZkGeFg08yTO/VbCCnpMwsYi9RAs9Gc6LPqja7CrteuNtrIjxLKz5TfjKHG/5wfy2pCLhg6BYtCjJfEk9iL0gBl44xmBWOypVKv9Pq8uoEJYDhum7+X6nKlnFdcb+XtiPTOpzI5pRb6FYy2MCfM7rVpT9E8B+DDauxSoTMNoUb3pjnF9oAU3jr3mUrulcqu2t68=';

export function PasswordVaultProvider({ children }: { children: ReactNode }) {
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
  const [passwords, setPasswords] = useState<PasswordData | null>(null);

  // Vérifier si déjà déverrouillé (session storage)
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
  }, []);

  const unlockVault = (masterPassword: string): boolean => {
    try {
      const bytes = CryptoJS.AES.decrypt(ENCRYPTED_VAULT, masterPassword);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);

      if (decrypted && decrypted.length > 0) {
        const parsed = JSON.parse(decrypted);
        setPasswords(parsed);
        setIsVaultUnlocked(true);
        // Stocker les mots de passe déchiffrés pour cette session
        sessionStorage.setItem(VAULT_STORAGE_KEY, decrypted);
        return true;
      }
      return false;
    } catch {
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
    <PasswordVaultContext.Provider value={{ isVaultUnlocked, unlockVault, lockVault, getPassword, getAllPasswords }}>
      {children}
    </PasswordVaultContext.Provider>
  );
}

export function usePasswordVault() {
  const context = useContext(PasswordVaultContext);
  if (!context) {
    throw new Error('usePasswordVault must be used within a PasswordVaultProvider');
  }
  return context;
}
