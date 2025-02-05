// src/app/layout.tsx
import '@/styles/globals.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Good Kidz',
  description: 'Fundación sin animo de lucro que ayuda a la sociedad a través del arte, la educación y la cultura.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" >
      <link rel="icon" href="" sizes="any" />
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow h-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

