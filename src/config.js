/**
 * Created by VICSOLWANG.
 * Date: 2021/12/18 20:39
 * Email: vic.sol.wang@gmail.com
 */

const baseConfig = require('eslint-config-wzx');

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

const handleExtendsConfig = (extendsConfig = []) => {
  const result = [...extendsConfig];
  result.splice(result.length - 1, 0, vueConfig);
  return result;
};

const { overrides: defaultOverrides, ...defaultConfig } = baseConfig;
const config = {
  ...defaultConfig,
  extends: handleExtendsConfig(defaultConfig.extends),
  parser: 'vue-eslint-parser',
  plugins: ['vue'],
};

try {
  require('typescript');
  require('@typescript-eslint/parser');
  require('@typescript-eslint/eslint-plugin');
  config.overrides = [
    {
      ...defaultOverrides[0],
      files: ['*.vue'].concat(defaultOverrides[0].files),
      extends: handleExtendsConfig(defaultOverrides[0].extends),
      parser: 'vue-eslint-parser',
      parserOptions: {
        ...defaultOverrides[0].parserOptions,
        parser: '@typescript-eslint/parser',
      },
      plugins: ['vue'],
    },
  ];
} catch (err) {
  console.info(
    'Note: Typescript eslint needs to install typescript, @typescript-eslint/parser, @typescript-eslint/eslint-plugin.',
  );
}

module.exports = config;
