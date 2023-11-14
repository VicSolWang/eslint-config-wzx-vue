/**
 * Created by VICSOLWANG.
 * Date: 2020/6/12 11:35
 * Email: vic.sol.wang@gmail.com
 */

import test from 'ava';
import pkg from 'eslint/use-at-your-own-risk';
import { createRequire } from 'module';
import fs from 'fs-extra';
import path from 'path';

const { FlatESLint } = pkg;
const require = createRequire(import.meta.url);

const isObject = (obj) => typeof obj === 'object' && obj !== null;
const isArray = (array) => Array.isArray(array);

test('Test basic properties of config.', async (t) => {
  const config = (await import('../index.js')).default;
  const configValid = isArray(config) && config.length > 0;
  t.true(configValid);
  if (configValid) {
    const { rules } = config[config.length - 2] || {};
    const { languageOptions } = config[config.length - 1] || {};
    t.true(isObject(rules));
    t.true(isObject(languageOptions));
  }
});

test('Test the validity of the custom rule.', async (t) => {
  if (FlatESLint) {
    const flatESLint1 = new FlatESLint();
    const [result1 = {}] =
      (await flatESLint1.lintFiles('test/example/rule.js')) || [];
    t.is(result1.warningCount, 6);
    t.is(result1.errorCount, 0);
    const flatESLint2 = new FlatESLint();
    const [result2 = {}] =
      (await flatESLint2.lintFiles('test/example/vue.vue')) || [];
    t.is(result2.warningCount, 2);
    t.is(result2.errorCount, 0);
  } else {
    t.true(true);
  }
});

test('Test the support of config for vue2 and vue3', async (t) => {
  if (FlatESLint) {
    const vuePath = require.resolve('vue');
    // Config for vue3
    const flatESLint1 = new FlatESLint();
    const { rules: rules1 = {} } =
      (await flatESLint1.calculateConfigForFile('index.js')) || {};
    t.true(!!rules1['vue/no-deprecated-data-object-declaration']);
    // Config for vue2
    await fs.remove(path.resolve(vuePath, '..'));
    const flatESLint2 = new FlatESLint({
      overrideConfigFile: 'src/config.js',
    });
    const { rules: rules2 = {} } =
      (await flatESLint2.calculateConfigForFile('src/config.js')) || {};
    t.false(!!rules2['vue/no-deprecated-data-object-declaration']);
  } else {
    t.true(true);
  }
});

test('Test the support of Typescript eslint.', async (t) => {
  if (FlatESLint) {
    const pluginPath = require.resolve('@typescript-eslint/eslint-plugin');
    // With Typescript plugin
    const flatESLint1 = new FlatESLint();
    const [result1 = {}] =
      (await flatESLint1.lintFiles(['test/example/type.ts'])) || [];
    t.is(result1.errorCount, 0);
    // Without Typescript plugin
    await fs.remove(path.resolve(pluginPath, '../..'));
    const flatESLint2 = new FlatESLint({
      baseConfig: {
        files: ['**/*.ts', '**/*.tsx'],
      },
      overrideConfigFile: 'src/config.js',
    });
    const [result2 = {}] =
      (await flatESLint2.lintFiles('test/example/type.ts')) || [];
    t.is(result2.errorCount, 1);
  } else {
    t.true(true);
  }
});
