const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide path to your Next.js app to load next.config.js and .env files in your test env
  dir: './',
});

// Add any custom config to be passed to Jest
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

module.exports = createJestConfig(config);
