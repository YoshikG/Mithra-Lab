import { useState, useCallback } from 'react';

export interface MithraUser {
  name: string;
  phone: string;
  address: string;
}

const STORAGE_KEY = 'mithra_user';

function readUser(): MithraUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as MithraUser;
  } catch {
    return null;
  }
}

function saveUser(user: MithraUser) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function useUser() {
  const [user, setUserState] = useState<MithraUser | null>(() => readUser());

  const login = useCallback((data: MithraUser) => {
    saveUser(data);
    setUserState(data);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUserState(null);
  }, []);

  return { user, login, logout };
}
