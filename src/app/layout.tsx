// src/app/layout.tsx
import '@/styles/globals.css'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Good Kidz',
  description: 'Fundación sin ánimo de lucro que ayuda a la sociedad a través del arte, la educación y la cultura.',
  keywords: ['fundación', 'arte', 'educación', 'cultura', 'niños', 'Medellín'],
  authors: [{ name: 'Good Kidz' }],
  openGraph: {
    title: 'Good Kidz',
    description: 'Transformando vidas a través del arte y la educación',
    url: 'https://goodkidz.org',
    siteName: 'Good Kidz',
    locale: 'es_CO',
    type: 'website',
  },
  robots: 'index, follow',
  icons: {
    icon: '/favicon.ico',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#34D399',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow w-full pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}