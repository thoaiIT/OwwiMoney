import type { Metadata } from 'next';
import './globals.css';
import '@radix-ui/themes/styles.css';
import { ThemeContextProvider } from '../context/theme-context';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'OwwiMoney',
  description: 'Money management app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="!scroll-smoot"
    >
      <body className={`${quicksand.className}`}>
        <div className="flex flex-col min-h-screen">
          <ThemeContextProvider>{children}</ThemeContextProvider>
        </div>
      </body>
    </html>
  );
}
