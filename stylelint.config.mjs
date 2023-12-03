/**
 * @type {import('stylelint').Config}
 */
export default {
  defaultSeverity: 'warning',
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-config-clean-order',
  ],
  overrides: [
    {
      files: ['**/*.module.css'],
      rules: {
        'selector-class-pattern': [
          '^[a-z]+([A-Z0-9][a-zA-Z0-9]+)*$',
          {
            message: (selector) => `Expected class selector "${selector}" to be lowerCamelCase`,
          },
        ],
      },
    },
  ],
};
