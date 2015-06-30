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
  grunt.registerTask('default', ['buildVanilla', 'buildReadme', 'watch']);

  grunt.registerTask('buildVanilla' , function() {
    var modules = baseConfig.defaultModules;
    var done = this.async();
    builder(modules, './nebula.css', null, done);
  });

  grunt.registerTask('custom' , function() {
    var done = this.async();
    builder(null, './nebula-custom.css', null, done);
  });

  grunt.registerTask('buildConfig' , function() {
    grunt.file.write('./scss/nebula/_config.scss', configBuilder(baseConfig.variables));
  });

  grunt.registerTask('buildReadme', ['readme-html', 'readme-markdown']);

  grunt.registerTask('readme-html', 'Compile the index.html for Github Pages, plus generate styles', function() {
    var done = this.async();
    readmeBuilder.html(function(result) {
      grunt.file.write('./index.html', result);
      done();
    });
  });

  grunt.registerTask('readme-markdown', 'Generate the markdown from the from the HTML', function() {
    var done = this.async();
    readmeBuilder.markdown(function(result) {
      grunt.file.write('./README.MD', result);
      done();
    });
  });


};
