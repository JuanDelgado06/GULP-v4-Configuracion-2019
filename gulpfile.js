// ARCHIVO GULP FINAL Y ACTUALIZADO AL 2019

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

// Compilando Sass

function style() {
    // 1. Donde esta mi archivo scss
    return gulp.src('./dev/scss/**/*.scss')
        // 2. Enviar el archivo del compilador sass
        .pipe(sass({outputStyle: 'expanded', sourceComments: true}).on('error', sass.logError))
        // 2.1- Declarando autoprefixer
        .pipe(autoprefixer({
            browsers: ['last 2 version'],
            cascade: false
        }))
        // 3. Donde se guardara el compilador css
        .pipe(gulp.dest('./public/css'))
        // 4. Mirar cambios en directo en el navegador
        .pipe(browserSync.stream());
}
//Compilando Pug a nuestro HTML
function dog() {
    return gulp.src('./dev/pug/*.pug')

    .pipe(pug({
        doctype: 'html',
        pretty: true //En False se comprime el HTML
    }))
    .pipe(gulp.dest('./public'));
}
// Compilando Babel a nuestro codigo JavaScript
function masterBabel() {
    return gulp.src('./dev/js/*.js')

    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./dev/js/es5'))
}

//"Comprimiendo" y "Juntando" todos nuestros archivos js en uno solo
function masterConcat() {
    return gulp.src('./dev/js/es5/*.js')

    .pipe(concat('all.js'))

    .pipe(uglify()) // COMPRIME MI CODIGO JS

    .pipe(gulp.dest('./public/js'));
}



function watch() {
    browserSync.init({
        server: {
            baseDir: './public'
        }
    });
    gulp.watch('./dev/scss/**/*.scss', style);
    gulp.watch('./dev/pug/**/*.pug', dog).on('change', browserSync.reload);
    gulp.watch('./dev/js/*.js', masterBabel).on('change', browserSync.reload);
    gulp.watch('./dev/js/*.js', masterConcat).on('change', browserSync.reload);
    gulp.watch('./public/index.html').on('change', browserSync.reload);
    gulp.watch('./public/js/**/*.js').on('change',browserSync.reload);
}

exports.style = style;
exports.dog = dog;
exports.masterBabel = masterBabel;
exports.masterConcat = masterConcat;
exports.watch = watch;