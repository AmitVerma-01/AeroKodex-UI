'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [isSystemTheme, setIsSystemTheme] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('aerokodex-theme');
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
      setIsSystemTheme(false);
    } else {
      setTheme(media.matches ? 'dark' : 'light');
      setIsSystemTheme(true);
    }

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      if (!stored) {
        setTheme(event.matches ? 'dark' : 'light');
      }
    };

    media.addEventListener('change', handleSystemThemeChange);
    return () => media.removeEventListener('change', handleSystemThemeChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');

    if (isSystemTheme) {
      localStorage.removeItem('aerokodex-theme');
    } else {
      localStorage.setItem('aerokodex-theme', theme);
    }
  }, [theme, isSystemTheme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    setIsSystemTheme(false);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
