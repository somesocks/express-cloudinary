const gulp = require('gulp');
const shell = require('gulp-shell');

gulp.task(
	'test',
	'run the tests',
	['build'],
	shell.task('mocha ./testing/tests.js')
);
