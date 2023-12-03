# RS School React 2023 Q3 - Week 6 Forms

screenshot:

![screenshot](https://i.imgur.com/ukDXGAi.png)

Task description: <https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/module06/README.md>

Deploy: <https://gentoosiast-react-w6-forms.netlify.app/>

## Tech Stack

- [React](https://react.dev)
- [React Router](https://reactrouter.com)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [React Hook Form](https://react-hook-form.com)
- [Yup](https://github.com/jquense/yup)

## Installation

Use LTS version of Node.js (20.10.0 at the time of writing)

1. Clone the project with `git clone`
2. Run `npm i` to install dependencies
3. Run `npm run dev` to start local development server

## Provided scripts

```sh
npm run dev
```

Start local development server

```sh
npm run build
```

Build project in production mode for further deployment

```sh
npm run format:fix
```

Reformat source code & configs to match `Prettier` settings

```sh
npm run lint
```

Check source code with `ESLint`. Exit with non-zero return code after the first found warning (useful for CI/CD)

```sh
npm run lint:fix
```

Automatically fix all auto-fixable errors & warnings with `ESLint`

```sh
npm run lint-styles
```

Check CSS stylesheets for potential problems with `Stylelint`. Exit with non-zero return code after the first found warning (useful for CI/CD)

```sh
npm run lint-styles:fix
```

Automatically fix all auto-fixable errors & warnings in CSS stylesheets with `Stylelint`

```sh
npm run typecheck
```

Perform TypeScript typechecking of source code with `tsc` (TypeScript Compiler)

```sh
npm run preview
```

Locally preview the production build

```sh
npm run prepare
```

Runs automatically after package installation to install Husky hooks
