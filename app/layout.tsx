import type { Metadata } from 'next';
import './globals.css';
import '@radix-ui/themes/styles.css';
import { ThemeContextProvider } from '../context/theme-context';
import { Quicksand } from 'next/font/google';

const quickSand = Quicksand({
  variable: '--display-font',
  preload: false,
});

export const metadata: Metadata = {
  title: 'OwwiMiney',
  description: '$$$',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${quickSand.variable} !scroll-smooth`}
    >
      <body
        className={`${quickSand.variable} bg-light-mode text-gray-950 relative pt-28 sm:pt-36 dark:bg-dark-mode dark:text-gray-50 dark:text-opacity-90`}
      >
        <ThemeContextProvider>{children}</ThemeContextProvider>
      </body>
    </html>
  );
}
