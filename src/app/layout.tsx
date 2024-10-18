// src/app/layout.tsx
import '@/styles/globals.css';
import Footer from '@/components/Footer';
import Head from 'next/head';
export const metadata = {
  title: 'Fundación Good Kidz',
  description: 'Encuentro Arte y Vida | Planeta Verde',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <Head>
      <link rel="icon" href="/favicon.ico" sizes="any"/>
      </Head>
      <body className="min-h-screen flex flex-col">
        <main className="flex-grow h-full">
          {children} {/* Aquí irá el contenido de cada página */}
        </main>
        <Footer />
      </body>
    </html>
  );
}
