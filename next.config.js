const { withPlausibleProxy } = require('next-plausible');

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'components'],
  },
};

module.exports = withPlausibleProxy({
  customDomain: process.env.NEXT_PUBLIC_REACT_APP_API_DOMAIN_HOST,
})(nextConfig);
