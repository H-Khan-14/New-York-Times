// initializes/requires local gulp for the project.
var gulp = require('gulp');
var uglify = require('gulp-uglify-es').default;
var sass = require('gulp-sass');

//Copy All Html files for now from src to dist I guess.
gulp.task('copyHtml', function() {
  gulp.src('src/*.html').pipe(gulp.dest('dist'));
});

//Minify/Uglify Javascript.
gulp.task('minify', function() {
  gulp
    .src('./src/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

//Compile Sass
gulp.task('sass', function() {
  gulp
    .src('src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('src/*.scss', ['sass']);
  gulp.watch('src/*.js', ['minify']);
});
