var marked = require('marked');
var fs = require('fs');
var _ = require('lodash');

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.util.linefeed = '\n';

  grunt.initConfig({
    ngversion: '1.6.1',
    bsversion: '3.3.7',
    modules: [],//to be filled in by build task
    pkg: grunt.file.readJSON('package.json'),
    dist: 'dist',
    filename: 'ui-bootstrap',
    filenamecustom: '<%= filename %>-custom',
    meta: {
      modules: 'angular.module("ui.bootstrap", [<%= srcModules %>]);',
      tplmodules: 'angular.module("ui.bootstrap.tpls", [<%= tplModules %>]);',
      all: 'angular.module("ui.bootstrap", ["ui.bootstrap.tpls", <%= srcModules %>]);',
      cssInclude: '',
      cssFileBanner: '/* Include this file in your html if you are using the CSP mode. */\n\n',
      cssFileDest: '<%= dist %>/<%= filename %>-<%= pkg.version %>-csp.css',
      banner: [
        '/*',
        ' * <%= pkg.name %>',
        ' * <%= pkg.homepage %>\n',
        ' * Version: <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
        ' * License: <%= pkg.license %>',
        ' */'
      ].join('\n')
    },
    delta: {
      docs: {
        files: ['misc/demo/index.html'],
        tasks: ['after-test']
      },
      html: {
        files: ['template/**/*.html'],
        tasks: ['html2js', 'karma:watch:run']
      },
      js: {
        files: ['src/**/*.js', '!src/**/index.js'],
        tasks: ['karma:watch:run']
      }
    },
    concat: {
      dist: {
        options: {
          banner: '<%= meta.banner %><%= meta.modules %>\n',
          footer: '<%= meta.cssInclude %>'
        },
        src: [], //src filled in by build task
        dest: '<%= dist %>/<%= filename %>-<%= pkg.version %>.js'
      },
      dist_tpls: {
        options: {
          banner: '<%= meta.banner %><%= meta.all %>\n<%= meta.tplmodules %>\n',
          footer: '<%= meta.cssInclude %>'
        },
        src: [], //src filled in by build task
        dest: '<%= dist %>/<%= filename %>-tpls-<%= pkg.version %>.js'
      }
    },
    copy: {
      demohtml: {
        options: {
          //process html files with gruntfile config
          processContent: grunt.template.process
        },
        files: [{
          expand: true,
          src: ['**/*.html'],
          cwd: 'misc/demo/',
          dest: 'dist/'
        }]
      },
      demoassets: {
        files: [{
          expand: true,
          //Don't re-copy html files, we process those
          src: ['**/**/*', '!**/*.html'],
          cwd: 'misc/demo',
          dest: 'dist/'
        }]
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist:{
        src:['<%= concat.dist.dest %>'],
        dest:'<%= dist %>/<%= filename %>-<%= pkg.version %>.min.js'
      },
      dist_tpls:{
        src:['<%= concat.dist_tpls.dest %>'],
        dest:'<%= dist %>/<%= filename %>-tpls-<%= pkg.version %>.min.js'
      }
    },
    html2js: {
      dist: {
        options: {
          module: null, // no bundle module for all the html2js templates
          base: '.',
          rename: function(moduleName) {
            return `uib/${moduleName}`;
          }
        },
        files: [{
          expand: true,
          src: ['template/**/*.html'],
          ext: '.html.js'
        }]
      }
    },
    eslint: {
      files: ['Gruntfile.js','src/**/*.js']
    },
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      watch: {
        background: true
      },
      continuous: {
        singleRun: true
      },
      jenkins: {
        singleRun: true,
        autoWatch: false,
        colors: false,
        reporters: ['dots', 'junit'],
        browsers: ['Chrome', 'ChromeCanary', 'Firefox', 'Opera', '/Users/jenkins/bin/safari.sh']
      },
      travis: {
        singleRun: true,
        autoWatch: false,
        reporters: ['dots'],
        browsers: ['Firefox']
      },
      coverage: {
        preprocessors: {
          'src/*/*.js': 'coverage'
        },
        reporters: ['progress', 'coverage']
      }
    },
    conventionalChangelog: {
      options: {
        changelogOpts: {
          preset: 'angular'
        },
        templateFile: 'misc/changelog.tpl.md'
      },
      release: {
        src: 'CHANGELOG.md'
      }
    },
    shell: {
      //We use %version% and evaluate it at run-time, because <%= pkg.version %>
      //is only evaluated once
      'release-prepare': [
        'grunt before-test after-test',
        'grunt version', //remove "-SNAPSHOT"
        'grunt conventionalChangelog'
      ],
      'release-complete': [
        'git commit CHANGELOG.md package.json -m "chore(release): v%version%"',
        'git tag %version%'
      ],
      'release-start': [
        'grunt version:minor:"SNAPSHOT"',
        'git commit package.json -m "chore(release): Starting v%version%"'
      ]
    },
    'ddescribe-iit': {
      files: [
        'src/**/*.spec.js'
      ]
    }
  });

  //register before and after test tasks so we've don't have to change cli
  //options on the google's CI server
  grunt.registerTask('before-test', ['enforce', 'ddescribe-iit', 'eslint', 'html2js']);
  grunt.registerTask('after-test', ['build', 'copy']);

  //Rename our watch task to 'delta', then make actual 'watch'
  //task build things, then start test server
  grunt.renameTask('watch', 'delta');
  grunt.registerTask('watch', ['before-test', 'after-test', 'karma:watch', 'delta']);

  // Default task.
  grunt.registerTask('default', ['before-test', 'test', 'after-test']);

  grunt.registerTask('enforce', `Install commit message enforce script if it doesn't exist`, function() {
    if (!grunt.file.exists('.git/hooks/commit-msg')) {
      grunt.file.copy('misc/validate-commit-msg.js', '.git/hooks/commit-msg');
      require('fs').chmodSync('.git/hooks/commit-msg', '0755');
    }
  });

  //Common ui.bootstrap module containing all modules for src and templates
  //findModule: Adds a given module to config
  var foundModules = {};
  function findModule(name) {
    if (foundModules[name]) { return; }
    foundModules[name] = true;

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
    function enquote(str) {
      return `"${str}"`;
    }
    function enquoteUibDir(str) {
      return enquote(`uib/${str}`);
    }

    var module = {
      name: name,
      moduleName: enquote(`ui.bootstrap.${name}`),
      displayName: ucwords(breakup(name, ' ')),
      srcFiles: grunt.file.expand([`src/${name}/*.js`, `!src/${name}/index.js`, `!src/${name}/index-nocss.js`]),
      cssFiles: grunt.file.expand(`src/${name}/*.css`),
      tplFiles: grunt.file.expand(`template/${name}/*.html`),
      tpljsFiles: grunt.file.expand(`template/${name}/*.html.js`),
      tplModules: grunt.file.expand(`template/${name}/*.html`).map(enquoteUibDir),
      dependencies: dependenciesForModule(name),
      docs: {
        md: grunt.file.expand(`src/${name}/docs/*.md`)
          .map(grunt.file.read).map((str) => marked(str)).join('\n'),
        js: grunt.file.expand(`src/${name}/docs/*.js`)
          .map(grunt.file.read).join('\n'),
        html: grunt.file.expand(`src/${name}/docs/*.html`)
          .map(grunt.file.read).join('\n')
      }
    };

    var styles = {
      css: [],
      js: []
    };
    module.cssFiles.forEach(processCSS.bind(null, module.name, styles, true));
    if (styles.css.length) {
      module.css = styles.css.join('\n');
      module.cssJs = styles.js.join('\n');
    }

    module.dependencies.forEach(findModule);
    grunt.config('modules', grunt.config('modules').concat(module));
  }

  function dependenciesForModule(name) {
    var deps = [];
    grunt.file.expand([`src/${name}/*.js`, `!src/${name}/index.js`, `!src/${name}/index-nocss.js`])
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

  grunt.registerTask('dist', 'Override dist directory', function() {
    var dir = this.args[0];
    if (dir) { grunt.config('dist', dir); }
  });

  grunt.registerTask('build', 'Create bootstrap build files', function() {
    var _ = grunt.util._;

    //If arguments define what modules to build, build those. Else, everything
    if (this.args.length) {
      this.args.forEach(findModule);
      grunt.config('filename', grunt.config('filenamecustom'));
    } else {
      grunt.file.expand({
        filter: 'isDirectory', cwd: '.'
      }, 'src/*').forEach((dir) => {
        findModule(dir.split('/')[1]);
      });
    }

    var modules = grunt.config('modules');
    grunt.config('srcModules', _.pluck(modules, 'moduleName'));
    grunt.config('tplModules', _.pluck(modules, 'tplModules').filter((tpls) => tpls.length > 0));
    grunt.config('demoModules', modules
      .filter((module) => module.docs.md && module.docs.js && module.docs.html)
      .sort((a, b) => {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      })
    );

    var cssStrings = _.flatten(_.compact(_.pluck(modules, 'css')));
    var cssJsStrings = _.flatten(_.compact(_.pluck(modules, 'cssJs')));
    if (cssStrings.length) {
      grunt.config('meta.cssInclude', cssJsStrings.join('\n'));

      grunt.file.write(grunt.config('meta.cssFileDest'), grunt.config('meta.cssFileBanner') +
                       cssStrings.join('\n'));

      grunt.log.writeln('File ' + grunt.config('meta.cssFileDest') + ' created');
    }

    var moduleFileMapping = _.clone(modules, true);
    moduleFileMapping.forEach((module) => delete module.docs);

    grunt.config('moduleFileMapping', moduleFileMapping);

    var srcFiles = _.pluck(modules, 'srcFiles');
    var tpljsFiles = _.pluck(modules, 'tpljsFiles');
    //Set the concat task to concatenate the given src modules
    grunt.config('concat.dist.src', grunt.config('concat.dist.src')
                 .concat(srcFiles));
    //Set the concat-with-templates task to concat the given src & tpl modules
    grunt.config('concat.dist_tpls.src', grunt.config('concat.dist_tpls.src')
                 .concat(srcFiles).concat(tpljsFiles));

    grunt.task.run(['concat', 'uglify', 'makeModuleMappingFile', 'makeRawFilesJs', 'makeVersionsMappingFile']);
  });

  grunt.registerTask('test', 'Run tests on singleRun karma server', function() {
    //this task can be executed in 3 different environments: local, Travis-CI and Jenkins-CI
    //we need to take settings for each one into account
    if (process.env.TRAVIS) {
      grunt.task.run('karma:travis');
    } else {
      var isToRunJenkinsTask = !!this.args.length;
      if (grunt.option('coverage')) {
        var karmaOptions = grunt.config.get('karma.options'),
          coverageOpts = grunt.config.get('karma.coverage');
        grunt.util._.extend(karmaOptions, coverageOpts);
        grunt.config.set('karma.options', karmaOptions);
      }
      grunt.task.run(this.args.length ? 'karma:jenkins' : 'karma:continuous');
    }
  });

  grunt.registerTask('makeModuleMappingFile', function() {
    var _ = grunt.util._;
    var moduleMappingJs = 'dist/assets/module-mapping.json';
    var moduleMappings = grunt.config('moduleFileMapping');
    var moduleMappingsMap = _.object(_.pluck(moduleMappings, 'name'), moduleMappings);
    var jsContent = JSON.stringify(moduleMappingsMap);
    grunt.file.write(moduleMappingJs, jsContent);
    grunt.log.writeln('File ' + moduleMappingJs.cyan + ' created.');
  });

  grunt.registerTask('makeRawFilesJs', function() {
    var _ = grunt.util._;
    var jsFilename = 'dist/assets/raw-files.json';
    var genRawFilesJs = require('./misc/raw-files-generator');

    genRawFilesJs(grunt, jsFilename, _.flatten(grunt.config('concat.dist_tpls.src')),
                  grunt.config('meta.banner'), grunt.config('meta.cssFileBanner'));
  });

  grunt.registerTask('makeVersionsMappingFile', function() {
    var done = this.async();

    var exec = require('child_process').exec;

    var versionsMappingFile = 'dist/versions-mapping.json';

    exec('git tag --sort -version:refname', function(error, stdout, stderr) {
      // Let's remove the oldest 14 versions.
      var versions = stdout.split('\n').slice(0, -14);
      var jsContent = versions.map(function(version) {
        version = version.replace(/^v/, '');
        return {
          version: version,
          url: `/bootstrap/versioned-docs/${version}`
        };
      });
      jsContent = _.sortBy(jsContent, 'version').reverse();
      jsContent.unshift({
        version: 'Current',
        url: '/bootstrap'
      });
      grunt.file.write(versionsMappingFile, JSON.stringify(jsContent));
      grunt.log.writeln(`File ${versionsMappingFile.cyan} created.`);
      done();
    });

  });

  /**
   * Logic from AngularJS
   * https://github.com/angular/angular.js/blob/36831eccd1da37c089f2141a2c073a6db69f3e1d/lib/grunt/utils.js#L121-L145
   */
  function processCSS(moduleName, state, minify, file) {
    var css = fs.readFileSync(file).toString(),
      js;
    state.css.push(css);

    if (minify) {
      css = css
        .replace(/\r?\n/g, '')
        .replace(/\/\*.*?\*\//g, '')
        .replace(/:\s+/g, ':')
        .replace(/\s*\{\s*/g, '{')
        .replace(/\s*\}\s*/g, '}')
        .replace(/\s*\,\s*/g, ',')
        .replace(/\s*\;\s*/g, ';');
    }
    //escape for js
    css = css
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/\r?\n/g, '\\n');
    js = `angular.module('ui.bootstrap.${moduleName}').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uib${_.capitalize(moduleName)}Css && angular.element(document).find('head').prepend('<style type="text/css">${css}</style>'); angular.$$uib${_.capitalize(moduleName)}Css = true; });`;
    state.js.push(js);

    return state;
  }

  function setVersion(type, suffix) {
    var file = 'package.json';
    var VERSION_REGEX = /([\'|\"]version[\'|\"][ ]*:[ ]*[\'|\"])([\d|.]*)(-\w+)*([\'|\"])/;
    var contents = grunt.file.read(file);
    var version;
    contents = contents.replace(VERSION_REGEX, function(match, left, center) {
      version = center;
      if (type) {
        version = require('semver').inc(version, type);
      }
      //semver.inc strips our suffix if it existed
      if (suffix) {
        version += '-' + suffix;
      }
      return left + version + '"';
    });
    grunt.log.ok('Version set to ' + version.cyan);
    grunt.file.write(file, contents);
    return version;
  }

  grunt.registerTask('version', 'Set version. If no arguments, it just takes off suffix', function() {
    setVersion(this.args[0], this.args[1]);
  });

  grunt.registerMultiTask('shell', 'run shell commands', function() {
    var self = this;
    var sh = require('shelljs');
    self.data.forEach(function(cmd) {
      cmd = cmd.replace('%version%', grunt.file.readJSON('package.json').version);
      grunt.log.ok(cmd);
      var result = sh.exec(cmd,{silent:true});
      if (result.code !== 0) {
        grunt.fatal(result.output);
      }
    });
  });

  return grunt;
};
