/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CONEKTA_PRIVATE_KEY: process.env.CONEKTA_PRIVATE_KEY,
    CONEKTA_PUBLIC_KEY: process.env.CONEKTA_PUBLIC_KEY,
  },
};

module.exports = nextConfig;
