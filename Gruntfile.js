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
    builder(modules, './dist/nebula.css', null, done);
  });

  // This task creates a sass file from the base-config.js file,
  // used for developing nebula and making it easy to copy configuration from
  // the js-based build tools to the sass based system.
  grunt.registerTask('buildConfig', function() {
    grunt.file.write('./scss/_config.scss', configBuilder(baseConfig.variables));
  });
};
