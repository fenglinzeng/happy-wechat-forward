/*
创建Gulp配置文件
 */

// 引入 gulp
const gulp = require('gulp');

// 引入功能组件
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const babel = require('gulp-babel');

const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-clean-css');
const rename = require('gulp-rename');

const chalk = require('chalk');

// CSS规范排序
const csscomb = require('gulp-csscomb');

const changed = require('gulp-changed');

// 错误处理
const plumber = require('gulp-plumber');

// 设置相关路径
const paths = {
    static: 'static',
    dev: 'dev',
    sass: 'dev/css/**/*',
    js: 'dev/js/**/*.js'
};

// Sass 处理
gulp.task('sass', () => {
    console.log(chalk.yellow('[进行中] sass'));
    gulp.src(paths.sass)
        .on('end', () => {
            console.log(chalk.green('[已完成] sass'));
        })
        .pipe(changed(`${paths.static}/css/`))
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: [
                'Chrome >= 20',
                'Firefox > 24',
                'Explorer >= 8',
                'iOS > 7',
                'Android >= 4'
            ]
        }))
        .pipe(csscomb())
        .pipe(minifycss())
        .pipe(gulp.dest(`${paths.static}/css/`));
});

gulp.task('scripts', () => {
    console.log(chalk.yellow('[进行中] scripts'));
    gulp.src(paths.js)
        .on('end', () => {
            console.log(chalk.green('[已完成] scripts'));
        })
        .pipe(changed(`${paths.static}/js/`))
        .pipe(plumber())
        .pipe(babel())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(gulp.dest(`${paths.static}/js/`))
        .pipe(sourcemaps.write('./maps'));
});

/**
 * 文件变更监听
 * $ gulp watch
 */
gulp.task('watch', () => {
    console.log(chalk.green('[监听] 启动gulp watch自动编译'));
    gulp.watch(paths.js, ['scripts']);
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('default', ['sass', 'scripts', 'watch']);
gulp.task('watch:base', ['watch']);