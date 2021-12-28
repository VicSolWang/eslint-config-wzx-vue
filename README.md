# eslint-config-wzx-vue

[![NPM version](https://img.shields.io/npm/v/eslint-config-wzx-vue?logo=npm&style=flat-square)](https://www.npmjs.com/package/eslint-config-wzx-vue)
[![node](https://img.shields.io/node/v/eslint-config-wzx-vue?logo=nodedotjs&style=flat-square)](https://nodejs.org)
[![Code Style](https://img.shields.io/badge/code%20style-prettier-ff69b4?logo=prettier&style=flat-square)](https://prettier.io)
[![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/VicSolWang/eslint-config-wzx-vue/test-release-ci/master?logo=github&style=flat-square)](https://github.com/VicSolWang/eslint-config-wzx-vue/actions/workflows/test-release.yml)
[![release](https://img.shields.io/badge/release-semantic--release-e10079?logo=semantic-release&style=flat-square)](https://github.com/semantic-release/semantic-release)
[![codecov](https://img.shields.io/codecov/c/gh/VicSolWang/eslint-config-wzx-vue/master?label=codecov&logo=codecov&style=flat-square)](https://codecov.io/gh/VicSolWang/eslint-config-wzx-vue)
[![NPM downloads](https://img.shields.io/npm/dt/eslint-config-wzx-vue?style=flat-square)](https://www.npmjs.com/package/eslint-config-wzx-vue)

> The custom vue eslint rules based on [eslint-config-wzx](https://www.npmjs.com/package/eslint-config-wzx). (Follow airbnb-base and Support Typescript Eslint)

## :cd: Installation

    npm install --save-dev eslint-config-wzx-vue

:bulb: Typescript eslint needs to install [typescript](https://www.npmjs.com/package/typescript), [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser), [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin).

    npm install --save-dev typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin

## :rocket: Usage

Add eslint-config-wzx-vue to the "extends" in your `.eslintrc.* file`.

    {
      "extends": "wzx-vue"
    }

:bulb: Typescript eslint needs `tsconfig.json` in your project root directory. And the config will select the rules of `vue2` or `vue3` according to the vue version installed in your project.

## :lock: License

[MIT](LICENSE).
