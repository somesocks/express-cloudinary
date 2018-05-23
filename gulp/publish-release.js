const Vet = require('vet');
const { optional } = Vet;
const { matches } = Vet.Object;
const { assert } = Vet.Utils;

const { InSeries, InParallel, PassThrough } = require('uchain');

const gulp = require('gulp');

const semver = require('semver');

const shell = require('gulp-shell');

const packageJSON = require('../package.json');

const TAG = `v${packageJSON.version}`;

const CMD = [
	'git add ./',
	`git commit -m "release ${TAG}" -e`,
	`git tag ${TAG}`,
	'git push && git push --tags',
	'npm publish',
];

gulp.task(
	'publish-release',
	'publish a release version',
	shell.task(CMD)
);
