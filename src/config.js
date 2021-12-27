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

const config = {
  ...baseConfig,
  parser: 'vue-eslint-parser',
  plugins: ['vue'],
};
config.extends = [...config.extends];
config.extends.splice(config.extends.length - 1, 0, vueConfig);

try {
  require('typescript');
  require('@typescript-eslint/parser');
  require('@typescript-eslint/eslint-plugin');
  const overridesConfig = {
    ...config.overrides[0],
    files: ['*.vue'].concat(config.overrides[0].files),
    parser: 'vue-eslint-parser',
    parserOptions: {
      ...config.overrides[0].parserOptions,
      parser: '@typescript-eslint/parser',
    },
    plugins: ['vue'],
  };
  overridesConfig.extends = [...overridesConfig.extends];
  overridesConfig.extends.splice(
    overridesConfig.extends.length - 1,
    0,
    vueConfig,
  );
  config.overrides = [overridesConfig];
} catch (err) {
  console.info(
    'Note: Typescript eslint needs to install typescript, @typescript-eslint/parser, @typescript-eslint/eslint-plugin.',
  );
}

module.exports = config;
