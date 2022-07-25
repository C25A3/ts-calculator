const gulp = require('gulp')
const { src, dest, series, parallel, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const cssnano = require('gulp-cssnano')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const sourcemaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
const clean = require('gulp-clean')
const kit = require('gulp-kit')
const ts = require('gulp-typescript')
const tsProject = ts.createProject('tsconfig.json')

const paths = {
	html: './html/**/*.kit',
	sass: './src/sass/**/*.scss',
	js: './src/js/**/*.js',
	img: 'src/img/*',
	ts: './src/ts/**/*.ts',
	dist: './dist',
	sassDest: './dist/css',
	jsDest: './dist/js',
	imgDest: './dist/img',
}

const sassCompiler = done => {
	src(paths.sass)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.sassDest))

	done()
}

const typeScript = () => {
	return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest('dist'))
}

const javaScript = done => {
	src(paths.js)
		.pipe(sourcemaps.init())
		.pipe(
			babel({
				presets: ['@babel/env'],
			})
		)
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.jsDest))

	done()
}
const convertImages = done => {
	src(paths.img).pipe(imagemin()).pipe(dest(paths.imgDest))

	done()
}

const startBrowseSync = done => {
	browserSync.init({
		server: {
			baseDir: './',
		},
	})

	done()
}

const watchForChanges = done => {
	watch('./*.html').on('change', reload)
	watch([paths.html, paths.sass, paths.js, paths.ts], parallel(handleKits, sassCompiler, typeScript, javaScript)).on(
		'change',
		reload
	)
	watch(paths.img, convertImages).on('change', reload)

	done()
}

const cleanStuff = done => {
	src(paths.dist, { read: false }).pipe(clean())

	done()
}

const handleKits = done => {
	src(paths.html).pipe(kit()).pipe(dest('./'))

	done()
}

const mainFunction = parallel(handleKits, sassCompiler, typeScript, javaScript, convertImages)

exports.default = series(mainFunction, startBrowseSync, watchForChanges)
