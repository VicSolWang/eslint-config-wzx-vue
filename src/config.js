/**
 * Created by VICSOLWANG.
 * Date: 2021/12/18 20:39
 * Email: vic.sol.wang@gmail.com
 */

import wzx from 'eslint-config-wzx';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const getVueConfigByVersion = async () => {
  let config = 'plugin:vue/recommended';
  try {
    const { version } = await import('vue');
    const majorVersion = Number(version.split('.')[0]);
    if (majorVersion === 3) {
      config = 'plugin:vue/vue3-recommended';
    }
  } catch (error) {
    console.info(
      'Note: Vue version is not confirmed, use vue2 config by default.',
    );
  }
  return config;
};
const vueConfig = await getVueConfigByVersion();

const wzxOverrideIndex = wzx.findIndex(
  (item) => item.files && item.files.length > 0,
);
const wzxExtends = wzx.slice(
  0,
  wzxOverrideIndex > -1 ? wzxOverrideIndex : wzx.length,
);
const wzxAirbnb = wzxExtends.slice(0, wzxExtends.length - 1);
const wzxPrettier = wzxExtends.slice(wzxExtends.length - 1);
const wzxOverrides =
  wzxOverrideIndex > -1 && wzx.length >= 2
    ? wzx.slice(wzxOverrideIndex, wzx.length - 2)
    : [];
const wzxOverridesAirbnb =
  wzx.length >= 2 ? wzxOverrides.slice(0, wzxOverrides.length - 2) : [];
const wzxOverridesPrettier = wzxOverrides[wzxOverrides.length - 2] || {};
const { rules: wzxOverridesCustomRules = {} } =
  wzxOverrides[wzxOverrides.length - 1] || {};
const { rules: wzxCustomRules = {} } = wzx[wzx.length - 2] || {};
const wzxCustomLanguageOptions = wzx.slice(wzx.length - 1);

let $config = [
  ...wzxAirbnb,
  ...compat.extends(vueConfig),
  ...wzxPrettier,
  ...compat.config({
    parser: 'vue-eslint-parser',
    plugins: ['vue'],
  }),
];

try {
  await import('typescript');
  await import('@typescript-eslint/parser');
  await import('@typescript-eslint/eslint-plugin');
  const overridesFilesTypes = {
    files: ['*.vue', '*.ts', '*.tsx'],
  };
  const overridesFiles =
    compat.config({
      overrides: [
        {
          ...overridesFilesTypes,
        },
      ],
    })[0] || {};
  $config = [
    ...$config,
    ...wzxOverridesAirbnb.map((item) => ({ ...item, ...overridesFiles })),
    ...compat.config({
      overrides: [
        {
          ...overridesFilesTypes,
          extends: [vueConfig],
        },
      ],
    }),
    { ...wzxOverridesPrettier, ...overridesFiles },
    ...compat.config({
      overrides: [
        {
          ...overridesFilesTypes,
          parser: 'vue-eslint-parser',
          parserOptions: {
            project: './tsconfig.json',
            parser: '@typescript-eslint/parser',
            extraFileExtensions: ['.vue'],
          },
          plugins: ['vue'],
          rules: {
            ...wzxOverridesCustomRules,
          },
        },
      ],
    }),
  ];
} catch (error) {
  console.info(
    'Note: Typescript eslint needs to install typescript, @typescript-eslint/parser, @typescript-eslint/eslint-plugin.',
  );
}

const config = [
  ...$config,
  {
    rules: {
      ...wzxCustomRules,
      'vue/multi-word-component-names': 'warn',
      'vue/no-multiple-template-root': 'warn',
      'vue/no-v-model-argument': 'off',
    },
  },
  ...wzxCustomLanguageOptions,
];

export default config;
