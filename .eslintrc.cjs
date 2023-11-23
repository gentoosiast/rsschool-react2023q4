/**
 * @type {import('eslint').ESLint.ConfigData}
 */
module.exports = {
  extends: ['next/core-web-vitals', 'plugin:perfectionist/recommended-natural', 'prettier'],
  overrides: [
    {
      extends: [
        'plugin:vitest/recommended',
        'plugin:jest-dom/recommended',
        'plugin:testing-library/react',
      ],
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    },
  ],
  rules: {
    'perfectionist/sort-imports': [
      'error',
      {
        'custom-groups': {
          type: {
            react: ['react', 'react-*', 'react-*/*'],
          },
          value: {
            react: ['react', 'react-*', 'react-*/*'],
          },
        },
        groups: [
          'type',
          'react',
          ['builtin', 'external'],
          'internal-type',
          'internal',
          ['parent-type', 'sibling-type', 'index-type'],
          ['parent', 'sibling', 'index'],
          'object',
          'style',
          'unknown',
        ],
        'internal-pattern': ['@/**'],
        'newlines-between': 'always',
        order: 'asc',
        type: 'natural',
      },
    ],
  },
};
