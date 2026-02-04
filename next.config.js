/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  turbopack: {},
  webpack: (config, { dev }) => {
    config.module.rules.forEach(rule => {
      if (rule.use && rule.use.loader === 'babel-loader') {
        rule.use.options.cacheDirectory = false;
      }
    });
    return config;
  }
}

module.exports = nextConfig;