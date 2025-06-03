import { withNextVideo } from "next-video/process";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Activa el nuevo bundler experimental de Next.js
  turbopack: {
    enabled: true,
    experimental: {
      outputFileTracingRoot: process.cwd(),
    },
  },

  // Habilita acciones del lado del servidor en componentes
  experimental: {
    serverActions: true,
  },

  // Configuración para permitir cargar imágenes externas
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.youtube.com',
        pathname: '/**',
      },
    ],
  },
};

export default withNextVideo(nextConfig);
