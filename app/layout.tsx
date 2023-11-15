import type { Metadata } from 'next';
import './globals.css';
import '@radix-ui/themes/styles.css';
import { ThemeContextProvider } from '../context/theme-context';
import { Quicksand } from 'next/font/google';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${quickSand.variable} !scroll-smooth`}
    >
      <body className={`${quickSand.className} bg-light-mode dark:bg-dark-mode`}>
        <div className="flex flex-col min-h-screen">
          <ThemeContextProvider>{children}</ThemeContextProvider>
        </div>
      </body>
    </html>
  );
}
