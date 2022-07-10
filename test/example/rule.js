/**
 * Created by VICSOLWANG.
 * Date: 2021/12/24 16:04
 * Email: vic.sol.wang@gmail.com
 */

let a = 'eslint';

// 'global-require': 'warn'
// 'import/no-extraneous-dependencies': 'warn',
if (a) {
  require('eslint');
}

// 'import/no-dynamic-require': 'warn'
require(a);

// 'no-bitwise': 'off'
a = 1 & 2;

// 'no-nested-ternary': 'off'
a = a < 1 ? 0 : a < 2 ? 1 : 2;

// 'no-param-reassign': 'warn',
[].forEach((item) => {
  item.a = 1;
});

// 'no-script-url': 'warn'
a = 'javascript:void(0)';

// 'no-underscore-dangle': 'off'
const _b = () => {};
_b();
