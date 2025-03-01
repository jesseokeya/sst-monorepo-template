const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const importPlugin = require('eslint-plugin-import');
const promisePlugin = require('eslint-plugin-promise');
const unicornPlugin = require('eslint-plugin-unicorn');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
	{
		files: ['packages/**/**/*.ts', 'packages/**/**/*.tsx'],
		ignores: ['node_modules/**', 'dist/**', 'build/**', '**/sst-env.d.ts', '.sst/**'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: './tsconfig.json',
				tsconfigRootDir: __dirname,
				ecmaVersion: 2020,
				sourceType: 'module',
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			import: importPlugin,
			promise: promisePlugin,
			unicorn: unicornPlugin,
			prettier: prettierPlugin,
		},
		rules: {
			// TypeScript Rules
			'@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-inferrable-types': 'off',
			'@typescript-eslint/strict-boolean-expressions': 'off',

			'valid-jsdoc': 'off',

			// Possible Errors
			'no-debugger': 'error',
			'no-extra-parens': ['error', 'functions'],

			// Best Practices
			eqeqeq: ['error', 'always'],
			curly: 'error',
			'dot-notation': 'error',
			'no-eval': 'error',
			'no-implied-eval': 'error',
			'no-return-await': 'error',

			// Stylistic Issues
			// semi: ['error', 'always'],
			'comma-dangle': ['error', 'always-multiline'],
			'object-curly-spacing': ['error', 'always'],
			'array-bracket-spacing': ['error', 'never'],
			'max-len': ['warn', { code: 200 }],

			// Import Plugin
			'import/order': [
				'error',
				{
					groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
					alphabetize: { order: 'asc', caseInsensitive: true },
				},
			],
			'import/newline-after-import': 'error',

			// Promise Plugin
			'promise/always-return': 'warn',
			'promise/no-return-wrap': 'error',
			'promise/param-names': 'error',
			'promise/catch-or-return': 'warn',
			'promise/no-nesting': 'warn',
			'promise/no-promise-in-callback': 'warn',
			'promise/no-callback-in-promise': 'warn',

			// Unicorn Plugin
			'unicorn/filename-case': ['error', { cases: { kebabCase: true, pascalCase: true } }],
			'unicorn/no-array-for-each': 'warn',
			'unicorn/no-for-loop': 'error',
			'unicorn/prefer-includes': 'error',
			'unicorn/prevent-abbreviations': 'off',

			// Prettier Plugin
			'prettier/prettier': 'error',
		},
	},
];
