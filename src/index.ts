import type { FlatConfigItem } from '@antfu/eslint-config'

export const configs = {
  global: {
    name: 'global-rules',
    rules: {
      'curly': 'off', // if conditions look more clear with curly braces
      'no-useless-return': 'off', // potential footgun when refactoring
      'node/prefer-global/process': 'off',
      'import/order': 'off', // handled by perfectionist
      'sort-imports': 'off', // handled by perfectionist
      'perfectionist/sort-imports': 'error',
      'perfectionist/sort-named-imports': 'error',
      'perfectionist/sort-exports': 'error',
    },
  },
  tsconfig: {
    files: ['**/tsconfig.json'],
    rules: {
      'jsonc/sort-keys': 'off',
    },
  },
  svelte: {
    files: ['**/*.svelte'],
    rules: {
      'no-undef-init': 'off', // TODO: re-evaluate for svelte v5
      'svelte/prefer-style-directive': 'off', // TODO: enable after bug fix: https://github.com/sveltejs/eslint-plugin-svelte/issues/651
    },
  },
} satisfies Record<string, FlatConfigItem>

export const all = Object.values(configs)
