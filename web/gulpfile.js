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
	return gulp.src('./dist',{read:false}).pipe(clean());
});
var fs =require('fs');
gulp.task('html',['clean'],function(){
	fs.readdirSync('./html').forEach(function(item){
		if(item.match('.html$')){
			gulp.src('./html/'+item)
				.pipe(usemin({
					html: [ minifyHtml() ],
					index: [rev()],
					about: [rev()],
					common: [rev()],
					forget: [rev()],
					register: [rev()],
					stylecss: [rev()],
					login: [rev()],
					findpassword: [rev()],
					dashboard: [rev()],
					thirdparty:[rev()]
				}))
				.pipe(gulp.dest(targetPath))
		}
	});
	fs.readdirSync('./html/dashboard').forEach(function(item){
		if(item.match('.html$')){
			gulp.src('./html/dashboard/'+item)
				.pipe(usemin({
					html: [ minifyHtml() ],
					index: [rev()],
					about: [rev()],
					common: [rev()],
					forget: [rev()],
					register: [rev()],
					stylecss: [rev],
					login: [rev()],
					findpassword: [rev()],
					dashboard: [rev()],
					thirdparty:[rev()]
				}))
				.pipe(gulp.dest(targetPath+'/dashboard'))
		}
	});
	return  gulp.src('./html/favicon.ico')
		.pipe(gulp.dest(targetPath));
});

gulp.task('assets',['clean'],function(){
	return gulp.src(['html/assets/**/*.!(css)'])
		.pipe(gulp.dest(targetPath+'/assets'))
});

gulp.task('css',['clean'],function(){
	return gulp.src(['./html/assets/**/*.css'])
		.pipe(minifyCss())
		.pipe(gulp.dest(targetPath+'/assets'))
});
gulp.task('test',['clean'],function(){
	return gulp.src(['./html/test/**'])
		.pipe(gulp.dest(targetPath+'/test'))
});

gulp.task('js',['clean'],function(){
	return gulp.src(['./built/*.js'])
	//.pipe(jsmin())
		.pipe(gulp.dest(targetPath+'/built'));
});

gulp.task('notJs',['clean'],function(){
	return gulp.src(['./built/*.!(js)'])
		.pipe(gulp.dest(targetPath+'/built'));
});

gulp.task('extension',['clean'],function(){
	return gulp.src(['./html/extension/**'])
		.pipe(gulp.dest(targetPath+'/extension'));
});





gulp.task('build',['html','assets','css','test','js','notJs','extension']);
gulp.task('production',function(){
	gulp.src(targetPath+'/assets/js/config.js',{read:false}).pipe(clean())
	gulp.src('./config.js')
		.pipe(gulp.dest(targetPath+'/assets/js/'));
	gulp.src('extension/xiaoyaoji.crx').pipe(gulp.dest(targetPath+'/extension/'));
})


gulp.task('default',['build'],function(){
    gulp.start('production')
})