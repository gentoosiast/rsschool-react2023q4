/**
 * @type {import('stylelint').Config}
 */
export default {
  defaultSeverity: 'warning',
  extends: ['stylelint-config-standard', 'stylelint-config-clean-order'],
  overrides: [
    {
      files: ['**/*.module.css'],
      rules: {
        'property-no-unknown': [
          true,
          {
            ignoreProperties: [
              // CSS Modules composition
              // https://github.com/css-modules/css-modules#composition
              'composes',
            ],
          },
        ],
        'selector-class-pattern': [
          '^[a-z]+([A-Z][a-zA-Z]+)*$',
          {
            message: (selector) =>
              `Expected class selector "${selector}" to be lowerCamelCase`,
          },
        ],
      },
    },
  ],
};
