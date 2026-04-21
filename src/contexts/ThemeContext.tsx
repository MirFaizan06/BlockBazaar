/**
 * ThemeContext — provides dark/light mode toggle.
 * IMPORTANT: Wrap your app root with <ThemeProvider> in src/App.tsx:
 *   import { ThemeProvider } from './contexts/ThemeContext';
 *   // <ThemeProvider><App /></ThemeProvider>
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('bb-theme');
    return stored === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('bb-theme', theme);
  }, [theme]);

  const toggle = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
