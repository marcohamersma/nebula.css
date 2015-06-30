var builder = require('./lib/nebula-builder');
var baseConfig = require('./lib/base-config');
var configBuilder = require('./lib/config-builder');
var readmeBuilder = require('./lib/readme-builder');

module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      styles: {
        files: ['scss/**/*.scss', 'readme-src/*', 'lib/*'], // which files to watch
        tasks: ['sass', 'buildReadme'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['sass', 'buildReadme', 'watch']);

  grunt.registerTask('buildVanilla' , function() {
    var modules = ['banner', 'config', 'mixins', 'reset', 'helpers', 'base'];
    var done = this.async();
    builder(modules, './nebula.css', null, done);
  });

  grunt.registerTask('sass' , function() {
    var done = this.async();
    builder(null, './css/styles.css', null, done);
  });

  grunt.registerTask('buildConfig' , function() {
    grunt.file.write('./scss/nebula/_config.scss', configBuilder(baseConfig));
  });

  grunt.registerTask('buildReadme', 'Generate the readme from the HTML', function() {
    grunt.file.write('./index.html', readmeBuilder.html());
    grunt.file.write('./README.MD', readmeBuilder.markdown());
  });
};
