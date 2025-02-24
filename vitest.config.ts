import * as path from 'path';
import { coverageConfigDefaults, UserConfig } from 'vitest/config';

const defineConfig: UserConfig = {
  test: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    include: ['src/**/*.test.ts'],
    exclude: ['src/proto-gen/**'],
    coverage: {
      all: false,
      reportsDirectory: './coverage',
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'src/main.ts',
        'src/**/index.ts',
        'src/**/*.module.ts',
        'src/**/*.interface.ts',
        'src/**/dtos/**',
        'src/**/proto-gen/**',
        'src/common/constants/**',
        'src/common/dto/**',
        'src/common/entities/**',
        'src/common/types/**',
        'src/test/**',
        ...coverageConfigDefaults.exclude,
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80
      }
    },
  },
};

export default defineConfig;