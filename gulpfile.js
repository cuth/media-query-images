var gulp = require('gulp');
var rename = require('gulp-rename');
var insert = require('gulp-insert');
var pjson = require('./package.json');

var BANNER = "\
/*  " + pjson.name + "\n\
 *  version: " + pjson.version + "\n\
 *  " + pjson.homepage + "\n\
 *  @preserve\n\
 */\n";

var AMD_HEAD    = "define(['jquery'], function ($) {\n    'use strict';\n\n";
var AMD_FOOT    = "\n\n});";

var COMMON_HEAD = "module.exports = (function ($) {\n    'use strict';\n\n";
var COMMON_FOOT = "\n\n}(require('jquery')));";

var GLOBAL_HEAD = "\n/*exported MediaQueryImages */\n\nvar MediaQueryImages = (function ($) {\n    'use strict';\n\n";
var GLOBAL_FOOT = "\n\n}(jQuery || Zepto || ender || $));";

gulp.task('build-amd', function () {
    gulp.src('src/media-query-images.js')
        .pipe(rename('media-query-images.amd.js'))
        .pipe(insert.wrap(BANNER + AMD_HEAD, AMD_FOOT))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-commonjs', function () {
    gulp.src('src/media-query-images.js')
        .pipe(rename('media-query-images.common.js'))
        .pipe(insert.wrap(BANNER + COMMON_HEAD, COMMON_FOOT))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-global', function () {
    gulp.src('src/media-query-images.js')
        .pipe(insert.wrap(BANNER + GLOBAL_HEAD, GLOBAL_FOOT))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build-amd', 'build-commonjs', 'build-global']);