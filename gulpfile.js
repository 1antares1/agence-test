var gulp = require('gulp');
var del = require('del');
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({ lazy: true });
var args = require('yargs').argv;
var exclude = require('gulp-ignore').exclude;
var typescript = require('gulp-typescript');
var tsProject = typescript.createProject('tsconfig.json');
var install = require('gulp-install');
var merge = require('merge2');
var tslint = require('gulp-tslint');
var inject = require("gulp-inject");
var wiredep = require("wiredep").stream;
var _filePaths = [config.client + 'app/', 'typings/globals', "typings/modules"];

gulp.task('vet', function () {
    log('Analyzing source with JSHint and JSCS');

    return gulp.src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('ts', ['clean-prod'], function () {
    return gulp.src([config.client + '/app/**/*.ts'])
        .pipe(tsProject())
        .pipe(gulp.dest(config.client + '/app/' + '.'));
});

gulp.task('ts-build', function () {
    var tsResult = gulp.src(_filePaths[0] + "**/*.ts").pipe(tsProject());
    return merge([
        tsResult.js.pipe(gulp.dest(_filePaths[0] + "."))
    ]);
});

gulp.task('ts-build-server', function () {
    return gulp.src("./*.ts")
        .pipe(tsProject())
        .pipe(gulp.dest("./"));
});

gulp.task("ts-app-watcher", function () {
    if (_filePaths.length) {
        gulp.watch("./*.ts", ["ts-build-server"]);
        log("watching ts-server files...");
    }
});

gulp.task('ts-lint', function () {
    return gulp.src([
            _filePaths[0] + '**/*.ts'
    ])
        .pipe(tslint({
            formatter: 'verbose'
        }))
        .pipe(tslint.report());
});

gulp.task('styles', ['clean-prod'], function () {
    log('Compiling sass files --> CSS');
    
    return gulp
        .src(config.sass)
        .pipe($.plumber())
        .pipe($.sass())
        .pipe($.autoprefixer({ browsers: ['last 2 versions', '> 5%'] }))
        .pipe(gulp.dest(config.client + 'assets/css/'));

});

gulp.task('templateCache', ['clean-prod'], function () {
    log('Creating AngularJS $templateCache');
    return gulp
        .src(config.htmltemplates)
        .pipe($.minifyHtml({ empty: true }))
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
        ))
        .pipe(gulp.dest(config.temp));
});

gulp.task('clean-styles', function (done) {
    var files = config.env.prod.client + '**/*.css';
    return clean(files, done);
});

gulp.task('clean-dev', function (done) {
    var files = config.dev + '**/*';
    return clean(files, done);
});

gulp.task('clean-prod', function (done) {
    log('Cleaning prod files..');
    var files = config.env.prod.root + '**/*';
    return clean(files, done);
});

gulp.task('sass-watcher', function () {
    return gulp.watch(config.sass, ['styles']);
});

gulp.task('inject', ['injectJs', 'injectCss', 'injectTemplates']);

gulp.task('injectJs', ['ts'], function () {
    log('Wire up the bower css js and our app js into the html');
    var options = config.getWiredepDefaultOptions();

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe(inject(gulp.src(config.otherDependencies.concat(config.js)), { relative: true }))
        .pipe(gulp.dest(config.client));
});

gulp.task('injectCss', ['styles'], function () {
    log('Wire up the bower css and our app css into the html');

    return gulp
        .src(config.index)
        .pipe(inject(gulp.src(config.css), { relative: true }))
        .pipe(gulp.dest(config.client));
});

gulp.task('injectTemplates', ['templateCache'], function () {
    log('Inject ng template to html');

    var assets = $.useref({ searchPath: './client' });
    var templateCache = config.temp + config.templateCache.file;

    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe(inject(
            gulp.src(templateCache, { read: false }), {
                starttag: '<!-- inject:templates:js -->',
                relative: true
            }))
        .pipe(assets)
        .pipe(gulp.dest(config.env.prod.client));
});

gulp.task('clean-fonts', function (done) {
    return clean(config.env.prod.client + 'assets/fonts/**/*.*', done);
});

gulp.task('clean-images', function (done) {
    return clean(config.env.prod.client + 'images/**/*.*', done);
});

gulp.task('fonts', ['clean-prod'], function () {
    log('Copying fonts');

    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.env.prod.client + 'assets/fonts'));
});

gulp.task('i18n', ['clean-prod'], function () {
    log('Copying i18n');

    return gulp
        .src(config.i18n)
        .pipe(gulp.dest(config.env.prod.client + 'assets/i18n'));
});

gulp.task('images', ['clean-prod'], function () {
    log('Copying and compressing the images');

    return gulp
        .src(config.images)
        .pipe($.imagemin({ optimizationLevel: 4 }))
        .pipe(gulp.dest(config.env.prod.client + 'assets/images/'));
});

gulp.task('scripts', ['clean-prod'], function () {
    log('Copying scripts');

    return gulp
        .src(config.scripts)
        .pipe(gulp.dest(config.env.prod.client + 'assets/scripts'));
});

gulp.task('images-jpg', [], function () {
    log('Copying and compressing the images');

    return gulp
        .src(config.client + '/assets/images/*.jpg')
        .pipe(gulp.dest(config.env.prod.client + 'assets/images'));
});

gulp.task('images-gif', [], function () {
    log('Copying and compressing the images');

    return gulp
        .src(config.client + '/assets/images/*.gif')
        .pipe(gulp.dest(config.env.prod.client + 'assets/images'));
});

gulp.task('images-icons', [], function () {
    log('Copying and compressing the images');

    return gulp
        .src(config.client + '/assets/images/icons/*.*')
        .pipe(gulp.dest(config.env.prod.client + 'assets/images/icons'));
});

gulp.task('prod-minify-js', ['inject'], function () {
    log('Generating js final files');
    log(config.client + '**/*.js');

    return gulp.src(config.client + '**/*.js')
    .pipe($.uglify({ mangle: false }))
    .pipe(gulp.dest(config.env.prod.client + 'js/'));

});

gulp.task('prod-minify-css', ['inject'], function () {
    log('Generating css final files');

    return gulp.src(config.client + 'assets/css/*.css')
        .pipe(gulp.dest(config.env.prod.client + 'assets/css/'));

});

gulp.task('server-files', ['clean-prod'], function () {
    return gulp.src(config.server)
        .pipe(gulp.dest(config.env.prod.root));
});

gulp.task('modules', ['clean-prod', 'server-files'], function () {
    log('Installing Dependencies');

    return gulp.src([config.env.prod.root + 'package.json'])
        .pipe(install({ production: true }));
});

gulp.task('pre-req', function (cb) {

    $.bower();
    cb();
});

gulp.task('static', ['server-files', 'images', 'fonts', 'modules', 'i18n', 'scripts']);

gulp.task('prod', ['pre-req', 'clean-prod', 'inject', 'prod-minify-css', 'prod-minify-js', 'static']);

gulp.task('prod-pkg', ['prod'], function () {
    log('Packaging deploy package');

    return gulp
        .src(config.env.prod.root + '/**')
        .pipe($.zip('package.zip'))
        .pipe(gulp.dest('./output'));
});

function clean(path, done) {
    log('Cleaning' + $.util.colors.blue(path));
    return del(path, done);
}

function errorLogger(error) {
    log('***Start of the Error***');
    log(error);
    log('***End  of the Error***');
    this.emit('end');
}

function log(msg) {
    if (typeof msg === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                log(msg[item]);
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}