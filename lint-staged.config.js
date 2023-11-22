import path from 'node:path';

const buildEslintCommand = (filenames) =>
  `next lint --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`;

const lintStagedConfig = {
  '*': 'prettier --list-different --ignore-unknown',
  '*.{cjs,js,mjs,jsx,ts,tsx}': [buildEslintCommand],
  '*.css': 'stylelint --max-warnings 0',
};

export default lintStagedConfig;
