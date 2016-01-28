/// <binding BeforeBuild='build' />
/*global module:false*/
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/**\n * @license <%= pkg.title || pkg.name %> v<%= pkg.version %>\n' +
          ' * (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
          ' * License: <%= pkg.license %>\n' +
          ' * <%= pkg.homepage %>\n */\n',        
        connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: 'localhost',
                    keepalive: true,
                    livereload: true,
                    open: {
                        target:'http://localhost:8000'
                    }
                }
            }
        },
        wiredep: {
            task: {

                // Point to the files that should be updated when
                // you run `grunt wiredep`
                src: [
                  'index.html'
                ],

                options: {
                    // See wiredep's configuration documentation for the options
                    // you may pass:

                    // https://github.com/taptapship/wiredep#configuration
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-wiredep');

    grunt.registerTask('build', ['wiredep']);
    grunt.registerTask('serve', ['build', 'connect']);
};
