import { defineConfig, globalIgnores } from 'eslint/config'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default defineConfig([
  globalIgnores([
    '**/logs',
    '**/*.log',
    '**/npm-debug.log*',
    '**/yarn-debug.log*',
    '**/yarn-error.log*',
    '**/lerna-debug.log*',
    '**/report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json',
    '**/pids',
    '**/*.pid',
    '**/*.seed',
    '**/*.pid.lock',
    '**/lib-cov',
    '**/coverage',
    '**/*.lcov',
    '**/.nyc_output',
    '**/.grunt',
    '**/bower_components',
    '**/.lock-wscript',
    'build/Release',
    '**/node_modules/',
    '**/jspm_packages/',
    '**/typings/',
    '**/*.tsbuildinfo',
    '**/.npm',
    '**/.eslintcache',
    '**/.rpt2_cache/',
    '**/.rts2_cache_cjs/',
    '**/.rts2_cache_es/',
    '**/.rts2_cache_umd/',
    '**/.node_repl_history',
    '**/*.tgz',
    '**/.yarn-integrity',
    '**/.env',
    '**/.env.test',
    '**/.cache',
    '**/.next',
    '**/.nuxt',
    '**/dist',
    '**/.cache/',
    '.vuepress/dist',
    '**/.serverless/',
    '**/.fusebox/',
    '**/.dynamodb/',
    '**/.tern-port'
  ]),
  {
    extends: compat.extends(
      'eslint:recommended',
      'prettier',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ),

    plugins: {
      '@typescript-eslint': typescriptEslint
    },

    languageOptions: {
      globals: {
        ...globals.commonjs,
        ...globals.node,
        client: 'writable'
      },

      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'commonjs',

      parserOptions: {
        project: ['./tsconfig.json']
      }
    },

    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off'
    }
  }
])

