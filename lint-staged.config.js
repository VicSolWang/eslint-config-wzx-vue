/**
 * Created by VICSOLWANG.
 * Date: 2023/11/13 15:22
 * Email: vic.sol.wang@gmail.com
 */

export default {
  '**/*.{vue,js,ts}': [
    'prettier --write --list-different',
    'eslint --no-error-on-unmatched-pattern --fix',
  ],
  '**/*.json': ['prettier --write --list-different'],
};
