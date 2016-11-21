const gulp = require('gulp');
const beautify = require('gulp-jsbeautify');
const eslint = require('gulp-eslint');

gulp.task('lint', () => {
    return gulp.src(['build/**/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});


gulp.task('beautify', () => {
    return gulp.src(['src/**/*.js', '*.js', '!node_modules/**'], {
            base: "./"
        })
        .pipe(beautify({
            indentSize: 4
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('default', gulp.series('beautify', 'lint'));
