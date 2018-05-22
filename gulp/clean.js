
const gulp = require('gulp');

const gulpClean = require('gulp-clean');

gulp.task(
	'clean',
	'clean the build',
	() => gulp
		.src('dist/*', { read: false })
		.pipe(gulpClean())
);
