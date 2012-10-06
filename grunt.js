
var testacular = require('testacular');

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

  grunt.registerTask('server', 'start testacular server', function() {
    var done = this.async();
    testacular.server.start({configFile: 'test/test-config.js'});
  });

  function spawnTestacular(args, callback) {
    grunt.utils.spawn({
      cmd: __dirname + "/node_modules/.bin/" +
        (process.platform === 'win32' ? 'testacular.cmd' : 'testacular'),
      args: args
    }, callback);
  }

  grunt.registerTask('test-run', 'run tests against continuous testacular server', function() {
    var done = this.async();
    spawnTestacular(['run'], function(error, result, code) {
      if (error) {
        grunt.warn("Make sure the testacular server is online: run `grunt server`.\n" +
          "Also make sure you have a browser open to http://localhost:9018/.\n" +
          grunt.warn(error.stdout + error.stderr));
        setTimeout(done,1000);
      } else {
        grunt.log.write(result.stdout);
        done();
      }
    });
  });

  grunt.registerTask('test', 'run tests on single-run server', function() {
    var done = this.async();
    spawnTestacular(['start', 'test/test-config.js','--single-run', '--log-level=warn'], function(error, result, code) {
      if (error) {
        grunt.warn(error.stdout + error.stderr);
      } else {
        grunt.log.write(result.stdout);
      }
      done();
    });
  });

};
