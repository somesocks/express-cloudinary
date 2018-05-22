
const gulp = require('gulp');

gulp.task(
	'build',
	'build',
	[ 'clean' ],
	() => gulp
		.src('src/*')
		.pipe(gulp.dest('dist/'))
);
