var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var clean = require('gulp-clean');

gulp.task('connect', function () {
	connect.server({
		root:'dist',
		livereload: true,
		port: 8081
	});
});

gulp.task('clean', function() {
	gulp.src('dist/*.html')
		.pipe(clean());

	gulp.src('dist/*.css')
		.pipe(clean());

	gulp.src('dist/*.js')
		.pipe(clean());

	gulp.src('dist/images/*')
		.pipe(clean());
});

gulp.task('copy-statics', ['clean'], function () {
	gutil.log('file changed');

	gulp.src('src/**/*')
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload());
});

gulp.task('watch', ['copy-statics', 'connect'], function () {
	gulp.watch(['src/**/*', 'src/images/**/*'], ['copy-statics']);
});

gulp.task('serve', ['watch']);

gulp.task('default', ['copy-statics']);