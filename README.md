# Full Stack Test

## Overview

The **Full Stack Test** project is a React application designed to display featured content from Wikipedia, including today's featured article, daily featured image, and the previous day's most read articles. It utilizes Material UI for styling and includes functionalities like date selection, language filtering, and infinite scrolling.

## Deployed App

You can view the live application at the following link:

- [**Full Stack Test - Live Demo**](https://full-stack-test-x667.onrender.com/)

## Features

- **Today's Featured Article**: Displays an article featured for the current date.
- **Daily Featured Image**: Shows a featured image for the current date.
- **Previous Day's Most Read Articles**: Lists articles that were most read on the previous day.
- **Language Selector**: Allows users to filter content based on language.
- **Date Picker**: Enables users to select a specific date to view featured content.
- **Infinite Scrolling**: Loads more articles as the user scrolls down.
- **Pagination**: Allows users to navigate through paginated content.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Material UI**: React component library for implementing UI elements.
- **Date Picker**: For selecting dates.
- **Intersection Observer**: For implementing infinite scrolling.
- **Axios**: For making HTTP requests.
- **Prop-Types**: For type-checking React props.

## Dependencies

The project depends on the following libraries:

```json
{
  "@emotion/react": "^11.13.3",
  "@emotion/styled": "^11.13.0",
  "@mui/material": "^6.1.0",
  "@mui/system": "^6.1.0",
  "@mui/x-date-pickers": "^7.17.0",
  "@react-oauth/google": "^0.12.1",
  "@testing-library/jest-dom": "^5.17.0",
  "@testing-library/react": "^13.4.0",
  "@testing-library/user-event": "^13.5.0",
  "axios": "^1.6.7",
  "crypto-browserify": "^3.12.0",
  "dayjs": "^1.11.13",
  "dotenv": "^16.4.5",
  "google-auth-library": "^9.5.0",
  "jwt-decode": "^4.0.0",
  "os-browserify": "^0.3.0",
  "path-browserify": "^1.0.1",
  "prop-types": "^15.8.1",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-intersection-observer": "^9.13.1",
  "react-scripts": "5.0.1",
  "web-vitals": "^2.1.4"
}
```

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/esneiderbravo/full-stack-test.git
   cd full-stack-test
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Create Environment Variables**:

   Create a `.env` file in the root of your project and add the necessary environment variables.

4. **Start the Development Server**:

   ```bash
   npm start
   ```

## Docker Setup
   To run the project using Docker, follow these steps:

1. **Build and Start Services**:

   In the root of the project, run the following command to build and start the frontend and backend services:
   ```bash
   docker-compose up --build
   ````

2. **Access the Application**:

   Once the containers are up and running, the frontend will be available on port 80 and the backend on port 3000.

   Frontend: http://localhost:80
   
   Backend: http://localhost:3000

## Usage

1. **Select Language**: Use the dropdown to select the language of the content.
2. **Select Date**: Use the date picker to choose a specific date for featured content.
3. **Search**: Click the 'Search' button to load content based on the selected language and date.
4. **Scroll**: Infinite scrolling will load more articles as you scroll down.
5. **Pagination**: Use pagination controls to navigate through the articles.

## Scripts

- **Start**: `npm start` - Starts the development server.
- **Build**: `npm build` - Creates a production build of the app.
- **Test**: `npm test` - Runs the test suite.
- **Eject**: `npm eject` - Ejects the Create React App configuration.

## Linting and Formatting

- **Lint**: `npm run lint` - Lints the codebase using ESLint.
- **Format**: `npm run prettier` - Formats the codebase using Prettier.

## Configuration

### Prettier

Prettier configuration is located in `.prettierrc`:

```json
{
  "arrowParens": "always",
  "bracketSpacing": true,
  "embeddedLanguageFormatting": "auto",
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "jsxBracketSameLine": false,
  "jsxSingleQuote": true,
  "proseWrap": "preserve",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "useTabs": false,
  "vueIndentScriptAndStyle": false,
  "printWidth": 140,
  "tabWidth": 2,
  "rangeStart": 0,
  "endOfLine": "lf",
  "singleQuote": true,
  "trailingComma": "all",
  "semi": true,
  "unusedImports": "warn"
}
```

### ESLint

ESLint configuration is located in `.eslintrc.js`:

```js
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    jest: true,
    browser: true,
    amd: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended' // Make this the last element so prettier config overrides other formatting rules
  ],
  rules: {
    'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: false, argsIgnorePattern: '^_' }],
    'prettier/prettier': ['error', {}, { usePrettierrc: true }]
  }
}
```

## Repository Configuration
   The repository has the following branch protection rules configured:
```js
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    jest: true,
    browser: true,
    amd: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended' // Make this the last element so prettier config overrides other formatting rules
  ],
  rules: {
    'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: false, argsIgnorePattern: '^_' }],
    'prettier/prettier': ['error', {}, { usePrettierrc: true }]
  }
}
```

## Contributing

Feel free to fork the repository, make changes, and submit a pull request. Please follow the existing code style and include tests for any new features or bug fixes.

## Contact

For any questions or issues, please contact [esneiderbravoyb@gmail.com](mailto:esneiderbravoyb@gmail.com).