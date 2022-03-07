/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.GITHUB_ACTIONS ? '/wor3dle' : '',
  trailingSlash: true,
};

module.exports = nextConfig;
