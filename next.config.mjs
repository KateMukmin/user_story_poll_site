/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      '/api/vote': ['./content/**'],
      '/results': ['./content/**'],
    },
  },
};
export default nextConfig;
