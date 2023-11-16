import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import type { ReactNode } from 'react';
import ToastProvider from '../components/toast/ToastProvider';
import { ThemeContextProvider } from '../context/theme-context';
import './globals.css';

const quickSand = Quicksand({
  variable: '--display-font',
  preload: false,
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'OwwiMoney',
  description: '$$$',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${quickSand.variable} !scroll-smooth`}
    >
      <body className={`${quickSand.className} bg-light-mode dark:bg-dark-mode`}>
        <div className="flex flex-col min-h-screen">
          <ToastProvider>
            <ThemeContextProvider>{children}</ThemeContextProvider>
          </ToastProvider>
        </div>
      </body>
    </html>
  );
}
