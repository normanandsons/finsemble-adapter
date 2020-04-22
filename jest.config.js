module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.test.ts',
    '!src/**/*.d.ts',
    '!src/fsbl.ts',
    '!src/index.ts',
    '!**/node_modules/**',
  ],
  preset: 'ts-jest/presets/default',
};
