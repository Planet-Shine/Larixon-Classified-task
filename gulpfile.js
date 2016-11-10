'use strict';

const wrap   = require("gulp-wrap");
const gulp   = require('gulp');
const stylus = require('gulp-stylus');
const concat = require('gulp-concat');
const debug  = require('gulp-debug');
const uglify = require('gulp-uglifyjs');

gulp.task('styles', function() {
    return gulp.src([
            'frontend/app/styles/reset-css.styl',
            'frontend/app/styles/page.styl',
            'frontend/app/styles/select.styl',
            'frontend/app/styles/button.styl',
            'frontend/app/styles/detailed-list.styl',
            'frontend/app/styles/form.styl'
        ])
        .pipe(stylus())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('frontend/static'));
});

gulp.task('scripts', function() {
    return gulp.src([
            'frontend/app/js/develop-defines.js',
            'frontend/app/js/modernizr-toutchevents.js',
            'frontend/app/js/EventEmitter.js',
            'frontend/app/js/dom-interface.js',
            'frontend/app/js/develop-defines.js',
            'frontend/app/js/data-types/data-types.js',
            'frontend/app/js/data-types/contacts.js',
            'frontend/app/js/data-types/persons.js',
            'frontend/app/js/data-types/deals.js',
            'frontend/app/js/data-types/events.js',
            'frontend/app/js/initializing-data/initializing-data.js',
            'frontend/app/js/initializing-data/contacts.js',
            'frontend/app/js/initializing-data/persons.js',
            'frontend/app/js/initializing-data/deals.js',
            'frontend/app/js/initializing-data/events.js',
            'frontend/app/js/components/*.js',
            'frontend/app/js/models/Model.js',
            'frontend/app/js/models/TypifiedListModel.js',
            'frontend/app/js/models/TypifiedItemModel.js',
            'frontend/app/js/data-types/data-types.js',
            'frontend/app/js/data-types/images.js',
            'frontend/app/js/data-types/contacts.js',
            'frontend/app/js/data-types/persons.js',
            'frontend/app/js/data-types/deals.js',
            'frontend/app/js/data-types/events.js',
            'frontend/app/js/data-types/data-types-hash.js',
            'frontend/app/js/types/*.js',
            'frontend/app/js/type-hash.js',
            'frontend/app/js/typeHash.js',
            'frontend/app/js/app.js'
        ])
        .pipe(concat('app.js'))
        .pipe(wrap({ src: 'frontend/app/app-wrap.js' }))
        .pipe(uglify("app.js",{
             mangle : false,
             compress : false
        }))
        .pipe(gulp.dest('frontend/static'));
});