/**
 * @type {import('eslint').ESLint.ConfigData}
 */
module.exports = {
  extends: ['next/core-web-vitals', 'prettier'],
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
};
