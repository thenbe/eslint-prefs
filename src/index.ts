import { createRequire } from 'node:module'
import type { FlatConfigItem } from '@antfu/eslint-config'

/**
 * Usage:
 * ```javascript
 *  // eslint.config.js
 *  import { configs } from 'eslint-prefs'
 *
 *  export default antfu(
 *    { },
 *    ...Object.values(configs),
 *  )
 * ```
 */
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
      'perfectionist/sort-classes': ['error', { type: 'natural', groups: [
        'index-signature',
        'static-property',
        'private-property',
        'property',
        'constructor',
        'static-method',
        'private-method',
        'static-private-method',
        'method',
        ['get-method', 'set-method'],
        'unknown',
      ] }],
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
      'svelte/block-lang': [
        'error',
        {
          enforceScriptPresent: false,
          enforceStylePresent: false,
          script: ['ts'],
          // style: 'scss',
        },
      ],
      'svelte/no-dom-manipulating': 'error',
      'svelte/no-inner-declarations': 'error',
      'svelte/no-store-async': 'error',
      'svelte/no-target-blank': ['error', { allowReferrer: true }],
      'svelte/require-stores-init': 'error',

      // stylistic
      'svelte/first-attribute-linebreak': 'error',
      'svelte/max-attributes-per-line': 'error',
      'svelte/no-extra-reactive-curlies': 'error',
      'svelte/prefer-class-directive': 'error',
      'svelte/prefer-style-directive': 'off', // TODO: enable after bug fix: https://github.com/sveltejs/eslint-plugin-svelte/issues/651
      'svelte/shorthand-attribute': 'error',
      'svelte/shorthand-directive': 'error',
      'perfectionist/sort-svelte-attributes': ['error', {
        type: 'natural',
        order: 'asc',
        groups: ['multiline', 'unknown', ['shorthand', 'svelte-shorthand']],
      }],
    },
  },
  tailwind: {
    files: ['**/*.svelte'],
    plugins: {
      tailwindcss: createRequire(import.meta.url)('eslint-plugin-tailwindcss'), // https://stackoverflow.com/a/74370910
    },
    rules: {
      'tailwindcss/classnames-order': 'error',
      'tailwindcss/enforces-negative-arbitrary-values': 'error',
      'tailwindcss/enforces-shorthand': 'warn',
      'tailwindcss/migration-from-tailwind-2': 'off',
      'tailwindcss/no-arbitrary-value': 'off',
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/no-contradicting-classname': 'error',
    },
  },
} satisfies Record<string, FlatConfigItem>

/**
 * Usage:
 * ```javascript
 *  // eslint.config.js
 *  import { ts_naming_convention } from 'eslint-prefs'
 *
 *  export default antfu(
 *    {
 *      typescript: {
 *        overrides: {
 *          ...ts_naming_convention,
 *        },
 *      },
 *    },
 *  )
 * ```
 */
export const ts_naming_convention = {
  'ts/naming-convention': [
    'error',
    {
      selector: 'variableLike',
      format: ['snake_case', 'UPPER_CASE'],
      leadingUnderscore: 'allow',
      filter: { regex: 'Schema$', match: false }, // ignore Zod schemas
    },
    { selector: 'typeLike', format: ['PascalCase'] },
    // Enforce that boolean variables are prefixed with an allowed verb
    {
      selector: 'variable',
      types: ['boolean'],
      format: null, // don't enforce for this selector
      prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
      leadingUnderscore: 'allow',
      filter: { regex: '^(csr|ssr|prerender)$', match: false },
    },
    // Enforce that type parameters (generics) are prefixed with T
    {
      selector: 'typeParameter',
      format: ['PascalCase'],
      prefix: ['T'],
    },
  ],
} as const

export const all = Object.values(configs)
