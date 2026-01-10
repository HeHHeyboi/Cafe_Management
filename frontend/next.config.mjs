/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://192.168.1.245:3000',
  ],
};

export default nextConfig;
