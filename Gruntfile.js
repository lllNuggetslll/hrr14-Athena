module.exports = function(grunt) {
  'use strict';

  var jsLibs = [
    'bower_components/angular/angular.min.js', 
    'bower_components/angular-ui-router/release/angular-ui-router.js'
  ];
  var jsApp = ['public/src/app/**/*.js'];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'public/dist/styles/style.css' : 'public/src/assets/sass/style.sass'
        }
      }
    },

    autoprefixer: {
      dist: {
        files: {
          'public/dist/styles/style.css' : 'public/dist/styles/style.css'
        }
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'index.js', 'app/**/*.js', 'public/src/app/**/*.js']
    },

    uglify: {
      options: {
        mangle: false // may or may not need this option depending on how we format angular modules
      },
      dist: {
        files: {
          'public/dist/js/libs.min.js': [jsLibs],
          'public/dist/js/app.min.js': [jsApp],
        }
      }
    },

    targethtml: {
      dist: {
        files: {
          'public/index.html': 'public/src/index.html'
        }
      },
      dev: {
        files: {
          'public/index.html': 'public/src/index.html'
        }
      }
    },

    watch: {
      css: {
        files: 'public/src/assets/sass/**/*.sass',
        tasks: ['sass'],
        options: {
          livereload: true
        }
      },
      jshint: {
        files: ['index.js', 'app/**/*.js', 'public/src/app/**/*.js'],
        tasks: ['jshint']
      },
      targethtml: {
        files: 'public/src/index.html',
        tasks: ['targethtml:dev']
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-targethtml');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['uglify', 'targethtml:dev', 'sass', 'jshint', 'watch']);
  grunt.registerTask('build', ['targethtml:dist', 'sass', 'autoprefixer', 'uglify']);
  grunt.registerTask('test', ['karma']);
};