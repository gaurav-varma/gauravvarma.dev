const { withPlausibleProxy } = require('next-plausible');

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'components'],
  },
};

module.exports = withPlausibleProxy()(nextConfig);
