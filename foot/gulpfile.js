const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const nodemon = require('gulp-nodemon');

const transpileInputPath = 'src/**/*';
const transpileOutputPath = 'build';

gulp.task('default', ['transpile', 'server']);

gulp.task('clean', () => {
  return del([`${transpileOutputPath}/**/*`]);
});

gulp.task('transpile', ['clean'], () => {
  return gulp.src(transpileInputPath)
    .pipe(babel({
      presets: ['es2015'],
      plugins: ['add-module-exports'],
    }))
    .pipe(gulp.dest(transpileOutputPath));
});

gulp.task('server', ['transpile'], () => {
  nodemon({
    script: 'build/bin/www',
    watch: 'src/',
    ext: 'js',
    tasks: ['transpile'],
  });
});
