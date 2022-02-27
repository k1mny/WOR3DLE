/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.GITHUB_ACTIONS ? "/wordle3d" : "",
  trailingSlash: true,
};

module.exports = nextConfig;
