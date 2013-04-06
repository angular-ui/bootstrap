var markdown = require('node-markdown').Markdown;

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Project configuration.
  grunt.initConfig({
    ngversion: '1.0.5',
    bsversion: '2.3.1',
    srcModules: [], //to be filled in by find-modules task
    tplModules: [], 
    pkg: grunt.file.readJSON('package.json'),
    dist: 'dist',
    filename: 'ui-bootstrap',
    meta: {
      modules: 'angular.module("ui.bootstrap", [<%= srcModules %>]);',
      tplmodules: 'angular.module("ui.bootstrap.tpls", [<%= tplModules %>]);',
      all: 'angular.module("ui.bootstrap", ["ui.bootstrap.tpls", <%= srcModules %>]);'
    },
    watch: {
      html: {
        files: ['template/**/*.html'],
        tasks: ['html2js']
      },
      js: {
        //nospawn makes the tests start faster
        nospawn: true,
        files: ['src/**/*.js'],
        //we don't need to jshint here, it slows down everything else
        tasks: ['test-run']
      }
    },
    concat: {
      dist: {
        options: {
          banner: '<%= meta.modules %>\n'
        },
        src: [],
        dest: '<%= dist %>/<%= filename %>-<%= pkg.version %>.js'
      },
      dist_tpls: {
        options: {
          banner: '<%= meta.all %>\n<%= meta.tplmodules %>\n'
        },
        src: [],
        dest: '<%= dist %>/<%= filename %>-tpls-<%= pkg.version %>.js'
      }
    },
    uglify: {
      dist:{
        src:['<%= dist %>/<%= filename %>-<%= pkg.version %>.js'],
        dest:'<%= dist %>/<%= filename %>-<%= pkg.version %>.min.js'
      },
      dist_tpls:{
        src:['<%= dist %>/<%= filename %>-tpls-<%= pkg.version %>.js'],
        dest:'<%= dist %>/<%= filename %>-tpls-<%= pkg.version %>.min.js'
      }
    },
    html2js: {
      src: ['template/**/*.html']
    },
    jshint: {
      files: ['Gruntfile.js','src/**/*.js'],
      options: {
        curly: true,
        immed: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true,
        globals: {
          angular: true
        }
      }
    }
  });

  //register before and after test tasks so we've don't have to change cli options on the goole's CI server
  grunt.registerTask('before-test', ['jshint', 'html2js']);
  grunt.registerTask('after-test', ['build', 'site']);

  // Default task.
  grunt.registerTask('default', ['before-test', 'test', 'after-test']);

  //Common ui.bootstrap module containing all modules for src and templates
  //findModule: Adds a given module to config
  function findModule(name) {
    function enquote(str) {
      return '"' + str + '"';
    }
    var tplModules = grunt.config('tplModules');
    var srcModules = grunt.config('srcModules');

    grunt.file.expand('template/' + name + '/*.html').map(function(file) {
      tplModules.push(enquote(file));
    });
    grunt.file.expand('src/' + name + '/*.js').forEach(function(file) {
      srcModules.push(enquote('ui.bootstrap.' + name));
    });

    grunt.config('tplModules', tplModules);
    grunt.config('srcModules', srcModules);
  }

  grunt.registerTask('dist', 'Override dist directory', function() {
    var dir = this.args[0];
    if (dir) { grunt.config('dist', dir); }
  });

  function dependenciesForModule(name) {
    var deps = [];
    grunt.file.expand('src/' + name + '/*.js')
    .map(grunt.file.read)
    .forEach(function(contents) {
      //Strategy: find where module is declared,
      //and from there get everything inside the [] and split them by comma
      var moduleDeclIndex = contents.indexOf('angular.module(');
      var depArrayStart = contents.indexOf('[', moduleDeclIndex);
      var depArrayEnd = contents.indexOf(']', depArrayStart);
      var dependencies = contents.substring(depArrayStart + 1, depArrayEnd);
      dependencies.split(',').forEach(function(dep) {
        if (dep.indexOf('ui.bootstrap.') > -1) {
          var depName = dep.trim().replace('ui.bootstrap.','').replace(/['"]/g,'');
          if (deps.indexOf(depName) < 0) {
            deps.push(depName);
            //Get dependencies for this new dependency
            deps = deps.concat(dependenciesForModule(depName));
          }
        }
      });
    });
    return deps;
  }
  grunt.registerTask('build', 'Create bootstrap build files', function() {

    var srcFiles = [], tplFiles = [];
    if (this.args.length) {
      var modules = [].concat(this.args);
      //Find dependencies
      this.args.forEach(function(moduleName) {
        modules = modules.concat(dependenciesForModule(moduleName));
        findModule(moduleName);
      });
      srcFiles = modules.map(function(name) {
        return 'src/' + name + '/*.js';
      });
      tplFiles = modules.map(function(name) {
        grunt.file.expand('template/' + name + '/*.html').forEach(html2js);
        return 'template/' + name + '/*.html.js';
      });
      grunt.config('filename', grunt.config('filename')+'-custom');

    } else {
      srcFiles = ['src/*/*.js'];
      tplFiles = ['template/*/*.html.js'];

      var folders = grunt.file.expand({filter: 'isDirectory', cwd: '.'}, 'src/*');

      folders.forEach(function(dir) {
        findModule(dir.split('/')[1]);
      });
    }
    grunt.config('concat.dist.src', grunt.config('concat.dist.src').concat(srcFiles));
    grunt.config('concat.dist_tpls.src', grunt.config('concat.dist_tpls.src').concat(srcFiles).concat(tplFiles));

    grunt.task.run(['concat', 'uglify']);
  });

  grunt.registerTask('site', 'Create grunt demo site from every module\'s files', function() {

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

    var modules = grunt.file.expand({filter: 'isDirectory'}, 'src/*').map(function(dir) {
      var moduleName = dir.split("/")[1];
      if (grunt.file.isDir(dir + "/docs")) {
        return {
          name: moduleName,
          displayName: ucwords(breakup(moduleName, ' ')),
          js: grunt.file.expand(dir + "/docs/*.js").map(grunt.file.read).join(''),
          html: grunt.file.expand(dir + "/docs/*.html").map(grunt.file.read).join(''),
          description: grunt.file.expand(dir + "/docs/*.md").map(grunt.file.read).map(markdown).join('')
        };
      }
    }).filter(function(module){
       return module !== undefined;
    });

    var templateFiles = grunt.file.expand("template/**/*.html.js");

    grunt.file.write(
      'dist/index.html',
      grunt.template.process(grunt.file.read('misc/demo-template.html'), {data: {
        modules: modules,
        templateModules: templateFiles.map(function(fileName) {
          return "'"+fileName.substr(0, fileName.length - 3)+"'";
        }),
        templates: templateFiles.map(grunt.file.read).join(''),
        version : grunt.config('pkg.version'),
        ngversion: grunt.config('ngversion'),
        bsversion: grunt.config('bsversion')
      }})
    );
    
    grunt.file.expand('misc/demo-assets/*.*').forEach(function(path) {
      grunt.file.copy(path, 'dist/assets/' + path.replace('misc/demo-assets/',''));
    });

    grunt.file.expand('misc/demo-assets/img/*.*').forEach(function(path) {
      grunt.file.copy(path, 'dist/' + path.replace('misc/demo-assets/',''));
    });
  });

  //Html templates to $templateCache for tests
  var TPL='angular.module("<%= file %>", []).run(["$templateCache", function($templateCache){\n' +
    '  $templateCache.put("<%= file %>",\n    "<%= content %>");\n' +
    '}]);\n';
  function escapeContent(content) {
    return content.replace(/"/g, '\\"').replace(/\n/g, '" +\n    "').replace(/\r/g, '');
  }
  function html2js(template) {
    grunt.file.write(template + ".js", grunt.template.process(TPL, {data: {
      file: template,
      content: escapeContent(grunt.file.read(template))
    }}));
  }
  grunt.registerMultiTask('html2js', 'Generate js versions of html template', function() {
    var files = grunt._watch_changed_files || grunt.file.expand(this.data);
    files.forEach(html2js);
  });

  // Karma configuration
  function runKarma(command, options) {
    var karmaCmd = process.platform === 'win32' ? 'karma.cmd' : 'karma';
    var args = [command].concat(options);
    var done = grunt.task.current.async();
    var child = grunt.util.spawn({
        cmd: karmaCmd,
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
    runKarma('start', options);
  });

  grunt.registerTask('server', 'start karma server', function() {
    var options = ['--no-single-run', '--no-auto-watch'].concat(this.args);
    runKarma('start', options);
  });

  grunt.registerTask('test-run', 'run tests against continuous karma server', function() {
    var options = ['--single-run', '--no-auto-watch'].concat(this.args);
    runKarma('run', options);
  });

  grunt.registerTask('test-watch', 'start karma server, watch & execute tests', function() {
    var options = ['--no-single-run', '--auto-watch'].concat(this.args);
    runKarma('start', options);
  });

  //changelog generation
  grunt.registerTask('changelog', 'generates changelog markdown from git commits', function () {

    var changeFrom = this.args[0], changeTo = this.args[1] || 'HEAD';

    var done = grunt.task.current.async();
    var child = grunt.util.spawn({
      cmd:process.platform === 'win32' ? 'git.cmd' : 'git',
      args:['log', changeFrom + '..' + changeTo, '--oneline']
    }, function (err, result, code) {

      var changelog = {
        chore: {}, demo: {}, docs: {}, feat: {}, fix: {}, refactor: {}, style: {}, test: {}
      };

      var COMMIT_MSG_REGEXP = /^(chore|demo|docs|feat|fix|refactor|style|test)\((.+)\):? (.+)$/;
      var gitlog = ('' + result).split('\n').reverse();

      if (code) {
        grunt.log.error(err);
        done(false);
      } else {

        gitlog.forEach(function (logItem) {
          var sha1 = logItem.slice(0, 7);
          var fullMsg = logItem.slice(8);

          var msgMatches = fullMsg.match(COMMIT_MSG_REGEXP);
          var changeType = msgMatches[1];
          var directive = msgMatches[2];
          var directiveMsg = msgMatches[3];

          if (!changelog[changeType][directive]) {
            changelog[changeType][directive] = [];
          }
          changelog[changeType][directive].push({sha1:sha1, msg:directiveMsg});
        });

        console.log(grunt.template.process(grunt.file.read('misc/changelog.tpl.md'), {data: {
          changelog: changelog,
          today: grunt.template.today('yyyy-mm-dd'),
          version : grunt.config('pkg.version')
        }}));

        done();
      }
    });
  });
  
  return grunt;
};
