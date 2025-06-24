import { withNextVideo } from "next-video/process";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración de la aplicación Next.js

  // Habilita acciones del lado del servidor en componentes
  experimental: {
    serverActions: {
      // Permite el uso de acciones del lado del servidor en componentes
      allowServerActions: true,
    },
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
