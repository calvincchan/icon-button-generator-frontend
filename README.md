# Icon Button Generator - Frontend

This is a web app for testing the [Icon Button Generator lambda function](https://github.com/calvincchan/icon-button-generator). It is built with React and deployed on GitHub Pages.

Web-app Demo: https://calvincchan.github.io/icon-button-generator-frontend/

## Getting Started

1. `yarn install` to install dependencies.

2. `yarn prebuild` to generate required svg icon files and manifest.

3. Provide the icon generator lambda function url in one of the following ways:

   - use environment variable `VITE_LAMBDA_URL`
   - add `VITE_LAMBDA_URL` to the `.env` file.

4. Develop - `yarn dev`

5. Build - `yarn build` and the production files will be saved to `./dist`.

6. Preview built production files - `yarn preview`.
