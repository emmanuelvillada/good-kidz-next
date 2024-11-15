// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     async redirects() {
//       return [
//         {
//           source: '/:path((?!maintenance).*)',
//           destination: '/maintenance',
//           permanent: false,
//         },
//       ];
//     },
//   };
  /** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['vovrbalalpvvwoxfvrfx.supabase.co'], // Agrega el dominio aquí
  },
};

  
  export default nextConfig;
  