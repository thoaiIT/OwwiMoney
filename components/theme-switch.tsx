'use client';

import { useTheme } from '../context/theme-context';
import { MoonIcon, SunIcon } from './icons';

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      className={`w-6 h-6 ease flex items-center justify-center p-1 ml-3 rounded-full ${
        theme === 'light' ? 'bg-dark-mode text-light-mode' : 'bg-light-mode text-dark-mode'
      } `}
      onClick={toggleTheme}
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
