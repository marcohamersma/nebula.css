var builder = require('./lib/nebula-builder');
var baseConfig = require('./lib/base-config');
var configBuilder = require('./lib/config-builder');
var fs = require('fs');

module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      styles: {
        files: ['scss/**/*.scss'], // which files to watch
        tasks: ['sass'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['sass', 'watch']);

  grunt.registerTask('buildVanilla' , function() {
    var modules = ['banner', 'config', 'mixins', 'reset', 'helpers', 'base'];
    var done = this.async();
    builder(modules, './nebula.css', null, done);
  });

  grunt.registerTask('buildConfig' , function() {
    fs.writeFileSync('./scss/nebula/_config.scss', configBuilder(baseConfig));
  });
};
