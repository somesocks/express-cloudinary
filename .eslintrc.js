module.exports = {
	parser: 'babel-eslint',
	extends: 'airbnb',
	rules: {
		'arrow-parens': ['off'],
		'import/newline-after-import': ['off'],
		'import/no-extraneous-dependencies': ['off'],
		'indent': [ 'error', 'tab', { SwitchCase: 1 } ],
		'no-prototype-builtins': ['off'],
		'no-tabs': ['off'],
		'no-unused-vars': ['warn'],
		'object-curly-newline': ['warn', { consistent: true }],
	},
}
