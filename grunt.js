module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      files: ['grunt.js', 'common/*.js', 'directives/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint test-run concat'
    },
    concat: {
      build: {
        src: ['common/common.js', 'directives/*/*.js'],
        dest: 'build/angular-ui-bootstrap.js' 
      }
    },
    jshint: {
      options: {
        curly: true,
        immed: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true
      },
      globals: {}
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint test concat');

  // Testacular configuration
  var runTestacular = function(command, options) {
    var testacularCmd = process.platform === 'win32' ? 'testacular.cmd' : 'testacular';
    var args = [command, 'test/test-config.js'].concat(options);
    var done = grunt.task.current.async();
    var child = grunt.utils.spawn({
      cmd: testacularCmd,
      args: args
    }, function(err, result, code) {
      if (code) {
        done(false);
      } else {
        done();
      }
    });
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  };

  grunt.registerTask('test', 'run tests on single-run server', function() {
    var options = ['--single-run', '--no-auto-watch'];

    //we can specify additional arguments to the test task
    options = options.concat(this.args);
    runTestacular('start', options);
  });

  grunt.registerTask('server', 'start testacular server', function() {
    var options = ['--no-single-run', '--no-auto-watch'];
    runTestacular('start', options);
  });

  grunt.registerTask('test-run', 'run tests against continuous testacular server', function() {
    var options = ['--single-run', '--no-auto-watch'];
    runTestacular('run', options);
  });
};
