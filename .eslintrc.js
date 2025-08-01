module.exports = {
	env: {
		node: true,
		es2022: true,
		jest: true,
	},
	extends: ['eslint:recommended'],
	parserOptions: {
		ecmaVersion: 2022,
		sourceType: 'module',
	},
	rules: {
		// Enforce consistent indentation
		indent: ['error', 'tab'],
		// Enforce the use of single quotes
		quotes: ['error', 'single'],
		// Require semicolons
		semi: ['error', 'always'],
		// Disallow unused variables
		'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
		// Enforce consistent comma style
		'comma-style': ['error', 'last'],
		// Enforce trailing commas in multiline object literals
		'comma-dangle': ['error', 'always-multiline'],
		// Require space before function parentheses
		'space-before-function-paren': ['error', 'always'],
		// Enforce consistent spacing inside braces
		'object-curly-spacing': ['error', 'always'],
		// Enforce consistent spacing inside array brackets
		'array-bracket-spacing': ['error', 'never'],
		// Require space after keywords
		'keyword-spacing': ['error', { before: true, after: true }],
		// Enforce consistent spacing before and after operators
		'space-infix-ops': 'error',
		// Enforce consistent spacing before and after commas
		'comma-spacing': ['error', { before: false, after: true }],
		// Disallow multiple empty lines
		'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
		// Require newline at end of file
		'eol-last': ['error', 'always'],
		// Disallow trailing whitespace
		'no-trailing-spaces': 'error',
	},
};
