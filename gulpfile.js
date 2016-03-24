/* eslint-disable */
/*
This gulpfile was written with the primary goal of automating any task
that might require one to restart a Docker container running a
node development server.

It's been commented extensively because gulpfiles can get weird
and hard to follow.
*/
var gulp = require('gulp');
var install = require('gulp-install');
var livereload = require('gulp-livereload');
var minifyCss = require('gulp-cssnano');
var named = require('vinyl-named');
var nodemon = require('gulp-nodemon');
var path = require('path');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config');
// single reference point for all relevant paths.

/*
NOTE: Use paths to limit the number of files being watched by any single stream.
Requiring streams to poll irrelevant files will eat up CPU useage, and if
legacyWatch is enabled within nodemon, can block the event loop.
*/
var paths = {
  'client': {
    src: ['./src/**/*.js', './src/**/*.jsx']
  },
  'package': 'package.json',
  'server': 'server.js',
  'style': {
    sass: './public/styles/**/*.scss',
    compiled: './public/dist/site.min.css',
    dist: './public/dist/'
  }
};

// any child processes that need to be run (particularly within nodemon) that
// don't need a standalone gulp task
var subProcess = {
  // filepaths that need some update on change but don't require a full restart
  watch: function() {
    console.log('Gulp is now watching static files.');
    // watch sass and run compile task on change
    gulp.watch(paths.style.sass, ['sass']);
    // watch static file dirs (templates, images, etc.) and do a simple page
    gulp.watch(paths.client.src, ['build']);
  }
};

// checks the node_modules dir for differences from the current package.json
// and runs an npm install when differences are found
/* TODO: figure out some way to set the loglevel. It's super chatty.*/
gulp.task('install', function() {
  gulp.src(paths.package)
    // NOTE: currently points to a node_modules dir in the parent.
    // a 'typical' confiruation would would use './'
    .pipe(gulp.dest('../'))
    .pipe(install({
      ignoreScripts: true
    }));
});
/*
NOTE: the install task is async on purpose. If it's run synchronously, it slows
the build/restart process dramatically due to npm's post-install checks that take
several seconds.

If a large install occurs when nodemon starts, the app may crash with a
'module not found' error. If this occurs, just wait for install to print
'npm info is okay' and then emit a restart by simply touching any file nodemon
is watching.
*/

// sass compilation process
gulp.task('sass', function(cb) {
  gulp.src(paths.style.sass)
    //compile the sass and announce any errors
    .pipe(sass()
      .on('error', function() {
        sass.logError();
        cb();
      }))
    // save an un-minified version at dist.
    // uncomment the next line if you'd like a human-readable version.
    // .pipe(gulp.dest(paths.style.dist))

  // add the standard '.min' suffix to file name, denoting minified css.
  .pipe(rename({
      suffix: '.min'
    }))
    // crunch it up
    .pipe(minifyCss({
      // compatibility: 'ie10'
    }))
    .pipe(gulp.dest(paths.style.dist))
    // wait til the new file is saved before reloading the page or moving on.
    .on('end', function(err) {
      livereload.reload(); //page reload
      if (err) cb(err);
      cb();
    });
});

// simple page refresh
gulp.task('reload', function(cb) {
  livereload.reload();
  cb();
});

gulp.task('build', function (cb) {
  gulp.src(webpackConfig.entry)
    .pipe(named())
    .pipe(webpack(webpackConfig, null, function(err, stats) {
      console.log(stats.toString());
    }))
    .pipe(gulp.dest('public/dist'))
    .on('end', function(err) {
      if (err) cb(err);
      // livereload.reload();
      cb();
    });
});

// core task. monitors/restarts app automatically, and handles crashes without
// killing the container.
/*
NOTE re legacyWatch: by default, nodemon uses inotify to get updates on file
changes, but since nodemon and the files in question are on different servers,
it's:
A) unlikely that the system clocks will start or stay in sync.
B) impossible for a docker container running a boot2docker image stream intotify
messages.
to solve this problem, we simply set legacyWatch to true, thereby instructing
nodemon to poll necessary files and identify changes.
*/
gulp.task('nodemon', ['install', 'build'], function() {
  // start the livereload server.
  livereload.listen();
  nodemon({
      legacyWatch: true,
      script: 'server.js',
      tasks: function(changedFiles) {
        console.log('file changed');
        var tasks = [];
        changedFiles.forEach(function(file) {
          if (path.extname(file) === '.js') {
            console.log('restarting server');
          }
          if (path.extname(file) === '.json') {
            tasks.push('install');
          }
        });
        return tasks;
      },
      verbose: false,
      watch: [paths.package, paths.server]
    })
    .on('start', function() {
      // start the child watch processes. also runs on restart.
      subProcess.watch();
    })
    .on('readable', function() {
      // On start/restart, watit til stdout and stdin streams are ready,
      // test to see if  livereload is listening, and then fire a page reload.
      this.stdout.on('data', function(chunk) {
        if (/^listening/.test(chunk)) {
          livereload.reload();
        }
        process.stdout.write(chunk);
      });
    });
});

// default task (also the command Docker passes when the container starts,
// so DON'T REMOVE IT.)
if (process.env.NODE_ENV === 'development') {
  gulp.task('default', ['nodemon']);
} else {
  gulp.task('default', function() {
    require('./server.js');
  });
}


/*
TODO:
- synchronous build task for client components (currently using browserify middleware)
*/
