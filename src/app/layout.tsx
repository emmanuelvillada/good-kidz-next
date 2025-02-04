// src/app/layout.tsx
import '@/styles/globals.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Head from 'next/head';
export const metadata = {
  title: 'Fundación Good Kidz',
  description: 'Encuentro Arte y Vida | Planeta Verde',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
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

