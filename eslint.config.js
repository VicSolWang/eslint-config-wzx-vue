/**
 * Created by VICSOLWANG.
 * Date: 2023/11/13 15:26
 * Email: vic.sol.wang@gmail.com
 */

import config from './src/config.js';
import ignoreConfig from './eslintignore.config.js';

export default [
  ...config,
  {
    rules: {
      'import/extensions': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
    },
  },
  {
    ignores: ignoreConfig,
  },
];
