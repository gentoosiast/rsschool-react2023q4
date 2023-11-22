export default {
  '*': 'prettier --list-different --ignore-unknown',
  '*.{cjs,js,mjs,jsx,ts,tsx}': 'eslint --max-warnings 0',
  '*.css': 'stylelint --max-warnings 0',
};
