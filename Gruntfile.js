var builder = require('./lib/nebula-builder');
var baseConfig = require('./lib/base-config');
var configBuilder = require('./lib/config-builder');

module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      styles: {
        files:   ['scss/**/*.scss', 'lib/*'], // which files to watch
        tasks:   ['custom'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['buildVanilla', 'watch']);

  grunt.registerTask('buildVanilla', function() {
    var modules = baseConfig.defaultModules;
    var done = this.async();
    builder(modules, './nebula.css', null, done);
  });

  grunt.registerTask('custom', function() {
    var done = this.async();
    builder(null, './nebula-custom.css', null, done);
  });

  grunt.registerTask('buildConfig', function() {
    grunt.file.write('./scss/nebula/config.scss', configBuilder(baseConfig.variables));
  });
};
