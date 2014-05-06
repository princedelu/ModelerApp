(function(){
"use strict";

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ''
      },
      dist: {
        src: [  'src_client/common/app.js',
                'src_client/**/services.js',
                'src_client/**/controllers.js',
                'src_client/**/directives.js'
             ],
        dest: 'client/common/javascript/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        report: 'min',
        mangle: false
      },
      dist: {
        files: {
          'client/common/javascript/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src_client/common/app.js',
                'src_client/**/services.js',
                'src_client/**/controllers.js',
                'src_client/**/directives.js'
            ],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    },
    complexity: {
        generic: {
            src: ['Gruntfile.js', 'src_client/common/app.js',
                'src_client/**/services.js',
                'src_client/**/controllers.js',
                'src_client/**/directives.js'
                 ],
            options: {
                breakOnErrors: false,
                jsLintXML: 'report.xml',         // create XML JSLint-like report
                checkstyleXML: 'checkstyle.xml', // create checkstyle report
                errorsOnly: false,               // show only maintainability errors
                cyclomatic: [3, 7, 12],          // or optionally a single value, like 3
                halstead: [8, 13, 20],           // or optionally a single value, like 8
                maintainability: 100,
                hideComplexFunctions: true      // only display maintainability
            }
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-complexity');

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('default', ['jshint', 'concat', 'uglify','complexity']);

};

})();
