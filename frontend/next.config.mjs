/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	allowedDevOrigins: [
		'*'
		// 'http://localhost:3000',
		// 'http://localhost:3001',
		// 'http://192.168.1.245:3000',
		// 'http://192.168.1.106:3000',
	],
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '8080',
				pathname: '/upload/**',
			},
			{
				protocol: 'http',
				hostname: '192.168.1.245',
				port: '8080',
				pathname: '/upload/**',
			},
			{
				protocol: 'http',
				hostname: '192.168.1.106',
				port: '8080',
				pathname: '/upload/**',
			},
		],
	},
};

export default nextConfig;
