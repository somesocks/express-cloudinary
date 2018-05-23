module.exports = {
	parser: 'babel-eslint',
	extends: 'airbnb',
	rules: {
		'arrow-parens': ['off'],
		'comma-dangle': ['error', {
			'arrays': 'always-multiline',
			'objects': 'always-multiline',
			'imports': 'always-multiline',
			'exports': 'always-multiline',
			'functions': 'never',
		}],
		'function-paren-newline': ['off'],
		'import/newline-after-import': ['off'],
		'import/no-extraneous-dependencies': ['off'],
		'indent': [ 'error', 'tab', { SwitchCase: 1 } ],
		'no-param-reassign': ['warn'],
		'no-prototype-builtins': ['off'],
		'no-tabs': ['off'],
		'no-unused-vars': ['warn'],
		'object-curly-newline': ['warn', { consistent: true }],
		'quote-props': ['warn', 'as-needed'],
	},
}
