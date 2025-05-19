/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
      protocol: 'https',
      hostname: 'parsaaghayi.ir',
      pathname: '**',
      },
      {
      protocol: 'https',
      hostname: 'via.placeholder.com',
      pathname: '**',
      },
      ],
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@mui/styled-engine': '@mui/styled-engine-sc',
    };
    return config;
  },
};

module.exports = nextConfig; 