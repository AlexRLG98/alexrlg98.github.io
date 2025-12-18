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
const ENCRYPTED_VAULT = 'U2FsdGVkX18tuFwEAec1DPwo7tpPSCdHNVgB9sKUiH+3+qJn3ipRssgXneW96d5gZfvH25Jam6stN3jxr0WgkErKMmdAsKudSGPp4oFK3Yp5mE9v03AX3PzifVnyPvuZrN+GXkM98ZH1reYCBSn0hmngusQxO3t77SBqC2cIAW3ME1sJjel7aWA2y9pqIBTZfUfl6mve+3MYK8qKa0pbA5Iq3rpzg6dUYxjQb7L/wQv9ftSzb/+iuPE4CfHigW0GtSHfrOYvqL+ILHgi34H89Tb45mByvnSpFJyc5XaK71lTGOPma1Xaw9hOQ9IlEw9+NdULAmv2Gm/J+SLjTc9FMy2NgZkZDIlVQOp/g26vXUp1Dcxobtpo02/1qadIPmHIJs55nr3SapG53dEo2Do+3WP3VNCkJmCffIIprdGo2QgWFN2o7wb3RT5+GkKT3pgpYvZMQPV8/CMjBhui3DgF++SJA9bF650Se3DPBufZy6moJFCK8X37aS/LhNCy4w6blZ72CxvdaxYChW37zbjT/LmO+YxuvaNtNptVZH5/81g4KNWI3ruWiAfd3NjMageqwJbzVybuq0Pfe6kV6AzQUB11ARgcn6a+jAER7HCWYwwKXoinftoVEtBv/khgBS8FYfqW5xhgbUoKyKK5Z0h9rJrsASdZojy3/ncAaCY4CvmyXGuWOJMRS+7XE7bS5upb+e+VD/qmE7PZ16ZzjKIVKsEAeh2QkQSdm5B0gsMBjLPSj486RoIfq5IHagEnUqOg1LyW0JmEjPSoEahtcifXM27Y6GBI70iJ1JrQF461BQdjwU430ClGZRi5U6q82djIQmpi+R0Zwx9n6/zE4bxDm6IWc+LN0bRvGd3HBYPJMcLOT+tANY2/sbptWIAfAG43h6O8laRHhmu/6UQjmtG8vcAeeHZ4JRTw9jIcZsAn4XKE+Y+iGvWV0+b6gEXbHRZohMilNIoRYfED36KauJt53WeRDqAYu94xfDnrMndhQij9+zYYyLroXSLV9O+F6hbVwxUDyb9EKRq86RYIIfceYqJegUCkMBpz3ArntrTgXPHZyGSTOaR87hl3mztWZdIXioYi2fKuJAvS+FEhuCTX3ZkhtFXJaHx4mdTon1ab6wK672EVBFh7F8JcT/qs0aT4w1Y0Xx0uK7nlvxVkll98B+FC41Vv2ULTEXLBvqUcdomY936H/thysth27UfJ/2RCwWvgYypofojrAGfYu6UyWiErMIe6/MFbE80LeasbuBgKzIkEtQe1jfFtsHWczrBs/Q3ym3fajjo/AsG1gSxbJjXOPAU4Lp/+d1vM7zXG/Oyn9JUga2khrRwi91IFJ6c6mnfwUcaKbFg+2ulLmiI+ECRdGjm6PN4YAFbjpZHoaVxXkDZwXrEml78el8lo+A9OfOn2pov2V/SyR1Jzx2vpFGUVCt8JAB38ncaERx3RS4c=';

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
