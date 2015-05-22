var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
	pattern: '*'
});

var buildSrc = './build';

function prepareTemplates() {
	return gulp.src('./src/templates/**/*.html')
		.pipe(plugins.angularTemplatecache('templates.js', {
            module: 'selfServe.templates',
            root: 'templates/',
            standAlone: false
        }));
}

// Build tasks

gulp.task('build',['build:app', 'build:library:css', 'build:library:js']);

gulp.task('build:app', ['clean:app'], function() {
	return gulp.src('./src/js/app/*.js')
		.pipe(plugins.addStream.obj(prepareTemplates()))
		.pipe(plugins.concat('app.js'))
		.pipe(plugins.uglify())
		.pipe(gulp.dest(buildSrc + '/js'));
});

gulp.task('build:library:css', ['clean:library-css'], function() {
	return gulp.src(plugins.mainBowerFiles('**/*.css'))
		.pipe(plugins.minifyCss())
		.pipe(plugins.concat('library.css'))
		.pipe(gulp.dest(buildSrc + '/library'));
});

gulp.task('build:library:js', ['clean:library-js'], function() {
	return gulp.src(plugins.mainBowerFiles('**/*.js'))
		.pipe(plugins.uglify())
		.pipe(plugins.concat('library.js'))
		.pipe(gulp.dest(buildSrc + '/library'));
});

// Clean tasks

gulp.task('clean:app', function() {
	plugins.del([buildSrc + '/js/app.js']);
});

gulp.task('clean:library-css', function() {
	plugins.del([buildSrc + '/library/**/*.css']);
});

gulp.task('clean:library-js', function() {
	plugins.del([buildSrc + '/library/**/*.js']);
});

gulp.task('clean:images', function() {
	plugins.del([buildSrc + '/img']);
});

// Move tasks

gulp.task('move', ['images']);

gulp.task('images', ['clean:images'], function() {
	return gulp.src('./src/img/**/*.{png,jpg,gif,svg}')
		.pipe(plugins.imagemin())
		.pipe(gulp.dest(buildSrc + '/img'))
});

// Inject task

gulp.task('inject', ['build'], function() {
    var libSrc = gulp.src([buildSrc + '/library/**/*.js', buildSrc + '/library/**/*.css'], {
    	read: false
    });

    var appSrc = gulp.src([buildSrc + '/js/**/*.js', buildSrc + '/css/**/*.css'], {
    	read: false
    });

    return gulp.src('./src/index.html')
    	.pipe(plugins.inject(libSrc, {
    		ignorePath: 'build/',
    		addRootSlash: false,
    		name: 'library'
    	}))
    	.pipe(plugins.inject(appSrc, {
    		ignorePath: 'build/',
    		addRootSlash: false,
    		name: 'app'
    	}))
    	.pipe(gulp.dest(buildSrc));
});

gulp.task('default', ['inject', 'move']);