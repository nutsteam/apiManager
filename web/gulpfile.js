var gulp = require('gulp');
var usemin = require('gulp-usemin');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var rev = require('gulp-rev');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var removelogs = require('gulp-removelogs');
var targetPath = 'dist';
var jsmin = require('gulp-jsmin');

gulp.task('clean', function(){
    return gulp.src('./dist',{read:false}).pipe(clean())
})

gulp.task('build', function(){
    gulp.src('./dist').pipe(clean());
    gulp.src(['./html/*.html'])
        .pipe(minifyHtml())
        .pipe(gulp.dest(targetPath+'/'))
    gulp.src(['html/assets/**/*.!(css)'])
        .pipe(gulp.dest(targetPath+'/assets'))
    gulp.src(['./html/assets/**/*.css'])
        .pipe(minifyCss())
        .pipe(gulp.dest(targetPath+'/assets'))
    gulp.src(['./html/dashboard/*.html'])
        .pipe(gulp.dest(targetPath+'/dashboard'))
    gulp.src(['./html/test/**'])
        .pipe(gulp.dest(targetPath+'/test'))
    gulp.src(['./build/*.!(js)'])
        .pipe(gulp.dest(targetPath+'/build'));
    gulp.src(['./build/*.js'])
        //.pipe(jsmin())
        .pipe(gulp.dest(targetPath+'/build'));
	gulp.src(['./html/xiaoyaoji.crx'])
        //.pipe(jsmin())
        .pipe(gulp.dest(targetPath));
})
gulp.task('default',['clean'],function(){
    gulp.start('build')
})
