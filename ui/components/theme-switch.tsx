'use client';

import { MoonIcon, SunIcon } from '../../components/icons';
import { useTheme } from '../../context/theme-context';

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      className="w-6 h-6 ease flex items-center justify-center p-1 ml-3 rounded-full"
      onClick={toggleTheme}
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
