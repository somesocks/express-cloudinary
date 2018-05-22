const gulp = require('gulp-help')(
	require('gulp'),
	{ hideEmpty: true, hideDepsMessage: true }
);


require('./build');
require('./clean');
require('./test');

require('./prepare-release');
require('./publish-release');
