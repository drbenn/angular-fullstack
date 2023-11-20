module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
    moduleNameMapper: {
      '^@app/(.*)$': '<rootDir>/src/app/$1'
    }
  };