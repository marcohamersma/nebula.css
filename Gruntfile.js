module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        options: {
          style: 'compact'
        },
        files: {
          "css/styles.css": "scss/styles.scss",
          "css/nebula.css": "scss/nebula/plain.scss"
        }
      }
    },
    watch: {
      options: {
        livereload: false,
      },
      styles: {
        files: ['scss/**/*.scss'], // which files to watch
        tasks: ['sass'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['sass', 'watch']);
};
