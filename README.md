# RS School React 2023 Q3 - Week 5 Next.JS/SSR/SSG

![screenshot](https://i.imgur.com/YDI5cEH.jpg)

Task description: <https://github.com/rolling-scopes-school/tasks/tree/master/react/modules/module05>

Deploy: <https://gentoosiast-react-w5-nextjs-ssr-ssg.netlify.app/>

Used API service: [Self-hosted Rick and Morty API with ability to set custom limit for received results](https://rickandmortyapi-sigma.vercel.app/api/character/)

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Redux Toolkit & RTK Query](https://redux-toolkit.js.org)

## Installation

Use LTS version of Node.js (20.9.0 at the time of writing)

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

```sh
npm run test
```

Runs tests with Vitest

```sh
npm run coverage
```

Displays coverage of implemented tests
