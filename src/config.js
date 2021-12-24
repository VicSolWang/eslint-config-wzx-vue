/**
 * Created by VICSOLWANG.
 * Date: 2021/12/18 20:39
 * Email: vic.sol.wang@gmail.com
 */

const getVueConfig = () => {
  let config = 'plugin:vue/recommended';
  try {
    const { version } = require('vue');
    const majorVersion = Number(version.split('.')[0]);
    if (majorVersion === 3) {
      config = 'plugin:vue/vue3-recommended';
    }
  } catch (err) {
    console.info(
      'Note: Vue version is not confirmed, use vue2 config by default.',
    );
  }
  return config;
};

const vueConfig = getVueConfig();

const customRules = {
  'global-require': 'warn',
  'import/no-dynamic-require': 'warn',
  'no-bitwise': 'off',
  'no-nested-ternary': 'off',
  'no-script-url': 'warn',
  'no-underscore-dangle': 'off',
};

const config = {
  extends: ['airbnb-base', vueConfig, 'prettier'],
  parser: 'vue-eslint-parser',
  plugins: ['vue'],
  rules: customRules,
};

try {
  require('typescript');
  require('@typescript-eslint/parser');
  require('@typescript-eslint/eslint-plugin');
  config.extends = [
    'airbnb-base',
    'airbnb-typescript/base',
    vueConfig,
    'prettier',
  ];
  config.parserOptions = {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
  };
} catch (err) {
  console.info(
    'Note: Typescript eslint needs to install typescript, @typescript-eslint/parser, @typescript-eslint/eslint-plugin.',
  );
}

module.exports = config;
