import type { FlatConfigItem } from '@antfu/eslint-config'

export const configs = {
  global: {
    name: 'global-rules',
    rules: {
      'curly': 'off', // if conditions look more clear with curly braces
      'no-useless-return': 'off', // potential footgun when refactoring
      'import/order': 'off', // handled by perfectionist
      'sort-imports': 'off', // handled by perfectionist
      'perfectionist/sort-imports': 'error',
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
    },
  },
} satisfies Record<string, FlatConfigItem>

export const all = Object.values(configs)
