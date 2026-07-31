/** @type {import('next').NextStyle} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'via.placeholder.com']
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*'
      }
    ];
  }
};

module.exports = nextConfig;
