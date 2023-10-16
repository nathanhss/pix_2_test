import { Config } from 'jest';
import { compilerOptions } from './tsconfig.json';
import { pathsToModuleNameMapper } from 'ts-jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  testTimeout: 10000,
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*(?!.controller).(t|j)s'],
  coverageDirectory: '<rootDir>/coverage/',
  coveragePathIgnorePatterns: [
    './node_modules',
    './dist',
    './prisma',
    './coverage',
  ],
};

export default config;
