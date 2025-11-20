import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Role, Language, User } from '@/types';
import { mockUsers } from '@/lib/mockData';

interface AppContextType {
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  currentUser: User | null;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<Role>('executive');
  const [language, setLanguage] = useState<Language>('ru');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const currentUser = mockUsers.find(u => u.role === currentRole) || null;

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentUser,
        language,
        setLanguage,
        theme,
        toggleTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
