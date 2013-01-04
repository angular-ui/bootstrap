var fs = require('fs');
var markdown = require('node-markdown').Markdown;

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    modules: '', //to be filled in by find-modules task
    tplModules: '', //to be filled in by find-templates task
    pkg:'<json:package.json>',
    meta: {
      modules: 'angular.module("ui.bootstrap", [<%= modules %>]);',
      tplmodules: 'angular.module("ui.bootstrap.tpls", [<%= tplModules %>]);',
      all: 'angular.module("ui.bootstrap", ["ui.bootstrap.tpls", <%= modules %>]);'
    },
    lint: {
      files: ['grunt.js','src/**/*.js']
    },
    watch: {
      files: ['<config:lint.files>', 'template/**/*.html'],
      tasks: 'before-test test-run'
    },
    concat: {
      dist: {
        src: ['<banner:meta.modules>', 'src/*/*.js'],
        dest: 'dist/ui-bootstrap-<%= pkg.version %>.js'
      },
      dist_tpls: {
        src: ['<banner:meta.all>', 'src/*/*.js', '<banner:meta.tplmodules>', 'template/**/*.html.js'],
        dest: 'dist/ui-bootstrap-tpls-<%= pkg.version %>.js'
      }
    },
    min: {
      dist:{
        src:['dist/ui-bootstrap-<%= pkg.version %>.js'],
        dest:'dist/ui-bootstrap-<%= pkg.version %>.min.js'
      },
      dist_tpls:{
        src:['dist/ui-bootstrap-tpls-<%= pkg.version %>.js'],
        dest:'dist/ui-bootstrap-tpls-<%= pkg.version %>.min.js'
      }
    },
    html2js: {
      src: ['template/**/*.html']
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

  //register before and after test tasks so we've don't have to change cli options on the goole's CI server
  grunt.registerTask('before-test', 'lint html2js');
  grunt.registerTask('after-test', 'find-modules find-templates concat min site');

  // Default task.
  grunt.registerTask('default', 'before-test test after-test');

  //Common ui.bootstrap module containing all modules
  grunt.registerTask('find-modules', 'Generate ui.bootstrap module depending on all existing directives', function() {
    var modules = grunt.file.expandDirs('src/*').map(function(dir) {
      return '"ui.bootstrap.' + dir.split("/")[1] + '"';
    });
    grunt.config('modules', modules);
  });

  grunt.registerTask('find-templates', 'Generate template modules depending on all existing directives', function() {
    var tplModules = grunt.file.expand('template/**/*.html').map(function(file) {
       return '"'+file+'"';
    });
    grunt.config('tplModules', tplModules);
  });

  grunt.registerTask('site', 'Create grunt demo site from every module\'s files', function() {
    this.requires('find-modules concat html2js');

    function breakup(text, separator) {
      return text.replace(/[A-Z]/g, function (match) {
        return separator + match;
      });
    }

    function ucwords(text) {
      return text.replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
      });
    }

    var modules = grunt.file.expandDirs('src/*').map(function(dir) {

      var moduleName = dir.split("/")[1];
      if (fs.existsSync(dir + "docs")) {
        return {
          name: moduleName,
          displayName: ucwords(breakup(moduleName, ' ')),
          js: grunt.file.expand(dir + "docs/*.js").map(grunt.file.read).join(''),
          html: grunt.file.expand(dir + "docs/*.html").map(grunt.file.read).join(''),
          description: grunt.file.expand(dir + "docs/*.md").map(grunt.file.read).map(markdown).join('')
        };
      }
    }).filter(function(module){
       return module !== undefined;
    });

    var templateFiles = grunt.file.expand("template/**/*.html.js");
    
    grunt.file.write(
      'dist/index.html',
      grunt.template.process(grunt.file.read('misc/demo-template.html'), {
        modules: modules,
        templateModules: templateFiles.map(function(fileName) {
          return "'"+fileName.substr(0, fileName.length - 3)+"'";
        }),
        templates: templateFiles.map(grunt.file.read).join('')
      })
    );
    
    grunt.file.expand('misc/demo-assets/*').forEach(function(path) {
      grunt.file.copy(path, 'dist/assets/' + path.replace('misc/demo-assets/',''));
    });
  });

  //Html templates to $templateCache for tests
  grunt.registerMultiTask('html2js', 'Generate js versions of html template', function() {
    //Put templates on ng's run function so they are global
    var TPL='angular.module("<%= file %>", []).run(["$templateCache", function($templateCache){\n' +
      '  $templateCache.put("<%= file %>",\n    "<%= content %>");\n' +
      '}]);\n';
    var files = grunt._watch_changed_files || grunt.file.expand(this.data);

    function escapeContent(content) {
      return content.replace(/"/g, '\\"').replace(/\n/g, '" +\n    "').replace(/\r/g, '');
    }
    files.forEach(function(file) {
      grunt.file.write(file + ".js", grunt.template.process(TPL, {
            file: file,
            content: escapeContent(grunt.file.read(file))
      }));
    });
  });

  // Testacular configuration
  function runTestacular(command, options) {
    var testacularCmd = process.platform === 'win32' ? 'testacular.cmd' : 'testacular';
    var args = [command].concat(options);
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
  }

  grunt.registerTask('test', 'run tests on single-run server', function() {
    var options = ['--single-run', '--no-auto-watch', '--log-level=warn'];
    if (process.env.TRAVIS) {
      options =  options.concat(['--browsers=Firefox']);
    } else {
      //Can augment options with command line arguments
      options =  options.concat(this.args);
    }
    runTestacular('start', options);
  });

  grunt.registerTask('server', 'start testacular server', function() {
    var options = ['--no-single-run', '--no-auto-watch'].concat(this.args);
    runTestacular('start', options);
  });

  grunt.registerTask('test-run', 'run tests against continuous testacular server', function() {
    var options = ['--single-run', '--no-auto-watch'].concat(this.args);
    runTestacular('run', options);
  });

  grunt.registerTask('test-watch', 'start testacular server, watch & execute tests', function() {
    var options = ['--no-single-run', '--auto-watch'].concat(this.args);
    runTestacular('start', options);
  });
  };
