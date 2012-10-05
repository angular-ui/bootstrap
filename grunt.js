/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      files: ['grunt.js', 'lib/**/*.js', 'test/**/*.js']
    },
    test: {
      files: ['test/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint test'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true
      },
      globals: {}
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint test');

  grunt.registerTask('test-single', 'run tests', function() {
    
  });

};
