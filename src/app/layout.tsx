import type { Metadata } from 'next';
import './globals.css';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { Red_Hat_Display, Epilogue } from 'next/font/google';

const redHat = Red_Hat_Display({
  subsets: ['latin'],
  variable: '--font-redhat',
  display: 'swap',
});

const epilogue = Epilogue({
  subsets: ['latin'],
  variable: '--font-epilogue',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'QuickHire',
  description: 'Discover more than 5000+ Jobs',
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${redHat.variable} ${epilogue.variable}`}>
        <QueryProvider>
          {children}
          {modal}
        </QueryProvider>
      </body>
    </html>
  );
}
