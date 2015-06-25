var builder = require('./lib/nebula-builder');
var baseConfig = require('./lib/base-config');
var configBuilder = require('./lib/config-builder');

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


  grunt.registerTask('buildConfig' , function() {
    var done = this.async()
    configBuilder(baseConfig, './scss/nebula/_config.scss', done);
  });
};
