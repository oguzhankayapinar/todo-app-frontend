module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ['jest-fetch-mock'],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.[tj]sx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@pact-foundation/pact|axios)',
  ],
  testMatch: [
    '**/tests/contract/**/*.spec.js', 
    '**/tests/unit/**/*.spec.js' 
  ]
};

