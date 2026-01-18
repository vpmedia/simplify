import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import unicornPlugin from 'eslint-plugin-unicorn';
import globals from 'globals';

export default defineConfig([
  {
    ignores: [
      '.github/**/*.*',
      '.idea/**/*.*',
      '.vscode/**/*.*',
      'build/**/*.*',
      'coverage/**/*.*',
      'dist/**/*.*',
      'node_modules/**/*.*',
      'public/**/*.*',
      'types/**/*.*',
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.vitest,
        ...globals.browser,
        ...globals.node,
        ...globals.es2026,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      jsdoc: jsdocPlugin,
      unicorn: unicornPlugin,
    },
    settings: {
      'import/parsers': {
        espree: ['.js', '.cjs', '.mjs', '.jsx'],
      },
      'import/resolver': {
        node: true,
      },
    },
    rules: {
      ...js.configs.all.rules,
      ...jsdocPlugin.configs['flat/recommended-typescript-flavor'].rules,
      ...unicornPlugin.configs.recommended.rules,
      camelcase: 'off',
      'capitalized-comments': 'off',
      'class-methods-use-this': 'off',
      'exports-last': 'off',
      'id-length': 'off',
      'max-classes-per-file': 'off',
      'max-lines-per-function': 'off',
      'max-lines': 'off',
      'max-params': 'off',
      'max-statements': 'off',
      'no-await-in-loop': 'off',
      'no-console': 'off',
      'no-inline-comments': 'off',
      'no-magic-numbers': 'off',
      'no-param-reassign': 'off',
      'no-ternary': 'off',
      'no-undefined': 'off',
      'no-unused-expressions': 'off',
      'no-unused-vars': 'off',
      'one-var': 'off',
      'prefer-named-capture-group': 'warn',
      'sort-imports': 'off',
      'sort-keys': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/no-null': 'off',
      'unicorn/numeric-separators-style': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },
]);
