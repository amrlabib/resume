var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var cleanCss = require('gulp-clean-css');
var jsMinify = require('gulp-minify');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');


//change source to what ever technology used for the application (Angular , React , ... etc )
var srcType = "src";
var paths = {
    html: {
        src: 'src/**/*.html',
        dist: 'dist'
    },
    images: {
        src: 'src/resources/images/**/*',
        dist: 'dist/resources/images'
    },
    favicons: {
        src: 'src/resources/images/favicon/*',
        dist: 'dist/favicon/'
    },
    style: {
        src: 'src/resources/style/**/*.scss',
        dist: 'dist/resources/style/'
    },
    fonts: {
        src: 'src/resources/fonts/**/*',
        dist: 'dist/resources/fonts'
    },
    js: {
        src: 'src/resources/js/**/*.js',
        dist: 'dist/resources/js/'
    }
};

//Copy all favicons
gulp.task('copyFavicons', function() {
    return gulp.src(paths.favicons.src)
        .pipe(gulp.dest(paths.favicons.dist));
});

//Copy all html files and views
gulp.task('copyHtmlFiles', function() {
    return gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dist));
});

//Copy all static images and optimize them
gulp.task('images', function() {
    return gulp.src(paths.images.src)
        .pipe(imagemin({ optimizationLevel: 5 }))
        .pipe(gulp.dest(paths.images.dist));
});

//Copy all static images and optimize them
gulp.task('fonts', function() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dist));
});


//Compile main Sass file and minify ... all other Sass files should be imported in main.less
gulp.task('compileSass', function() {
    return gulp.src(paths.style.src)
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.style.dist));
});


//Concat all javascript files in one single file named main.js and minify it.
gulp.task('scripts', function() {
    return gulp.src([
            paths.js.src
        ])
        .pipe(concat('main.js'))
        .pipe(jsMinify())
        .pipe(gulp.dest(paths.js.dist));
});


// Static server and files watch only for static sites
gulp.task('static-server-and-watch', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });

    //Watch any change in html, css or js files to reload browserSync 
    gulp.watch(paths.style.src, ['compileSass', browserSync.reload]);
    gulp.watch(paths.js.src, ['scripts', browserSync.reload]);
    gulp.watch(paths.html.src, ['copyHtmlFiles', browserSync.reload]);
});





//last 2 tasks should be added only if we have node server not only static server
gulp.task('default', ['fonts', 'scripts', 'copyHtmlFiles', 'images',  'copyFavicons' , 'compileSass', 'static-server-and-watch']);
