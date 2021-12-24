/**
 * Created by VICSOLWANG.
 * Date: 2020/06/12 11:35
 * Email: vic.sol.wang@gmail.com
 */

const fs = require('fs-extra');
const path = require('path');
const test = require('ava');
const { ESLint } = require('eslint');

const isObject = (obj) => typeof obj === 'object' && obj !== null;
const isArray = (array) => Array.isArray(array);

test.serial('Test basic properties of config.', (t) => {
  const config = require('../index');
  t.true(
    isArray(config.extends) && config.extends.indexOf('airbnb-base') !== -1,
  );
  t.true(isArray(config.plugins) && config.plugins.indexOf('vue') !== -1);
  t.true(isObject(config.rules));
  if (config.overrides && config.overrides.length > 0) {
    const overrideConfig = config.overrides[0] || {};
    t.true(
      isArray(overrideConfig.extends) &&
        overrideConfig.extends.indexOf('airbnb-base') !== -1 &&
        overrideConfig.extends.indexOf('airbnb-typescript/base') !== -1,
    );
    t.true(
      isObject(overrideConfig.parserOptions) &&
        !!overrideConfig.parserOptions.project,
    );
    t.true(
      isArray(overrideConfig.plugins) &&
        overrideConfig.plugins.indexOf('vue') !== -1,
    );
    t.true(isObject(overrideConfig.rules));
  }
});

test.serial('Test the support of config for vue2 and vue3', async (t) => {
  const vuePath = require.resolve('vue');
  const configPath = require.resolve('../src/config');
  const mainPath = require.resolve('../index');
  // Config for vue3
  let config = require('../index');
  t.true(config.extends.indexOf('plugin:vue/vue3-recommended') !== -1);
  // Config for vue2
  delete require.cache[vuePath];
  delete require.cache[configPath];
  delete require.cache[mainPath];
  await fs.remove(path.resolve(vuePath, '..'));
  config = require('../index');
  t.true(config.extends.indexOf('plugin:vue/recommended') !== -1);
});

test.serial('Test the validity of the custom rule.', async (t) => {
  const eslint = new ESLint();
  const results = await eslint.lintFiles(['test/example/rule.js']);
  const result = (results || [])[0] || {};
  t.is(result.warningCount, 3);
  t.is(result.errorCount, 0);
});

test.serial('Test the support of Typescript eslint.', async (t) => {
  const pluginPath = require.resolve('@typescript-eslint/eslint-plugin');
  const configPath = require.resolve('../src/config');
  // With Typescript plug
  const eslint1 = new ESLint();
  const results1 = await eslint1.lintFiles(['test/example/type.ts']);
  const result1 = (results1 || [])[0] || {};
  // Without Typescript plug
  delete require.cache[pluginPath];
  await fs.remove(path.resolve(pluginPath, '../..'));
  delete require.cache[configPath];
  const eslint2 = new ESLint();
  const results2 = await eslint2.lintFiles(['test/example/type.ts']);
  const result2 = (results2 || [])[0] || {};
  t.is(result1.errorCount, 0);
  t.is(result2.errorCount, 1);
});
