
module.exports = function(grunt) {

    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({

        // take all the js files and minify them
        uglify: {
            build: {
                files: {
                    'public/dist/js/app.min.js': ['public/scripts/**/*.js', 'public/scripts/*.js']
                }
            },
            bower: {
                options: {
                    mangle: true,
                    compress: true
                },
                files: {
                    'public/dist/js/bower.min.js': 'public/dist/js/bower.js'
                }
            }
        },

        // take the processed style.css file and minify
        cssmin: {
            build: {
                files: {
                    'public/dist/css/style.min.css': 'public/styles/*.css'
                }
            }
        },

        shell: {
            bower_install: {
                command: function(){
                    return 'bower install';
                }
            },
            npm_install: {
                command: function(){
                    return 'npm install';
                }
            }
        },

        // automatic concatenation of installed Bower components in right order.
        bower_concat: {
            all: {
                dest: 'public/dist/js/bower.js',
                exclude: [
                    'jquery'
                ],
                dependencies: {
                    'underscore': 'jquery'
                }
            }
        },

        // watch our node server for changes
        nodemon: {
            dev: {
                script: 'server.js'
            }
        },

        // watch css and js files and process the above tasks
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['shell:bower_install', 'bower_concat', 'uglify:bower']
            },
            css: {
                files: ['public/styles/*.css'],
                tasks: ['cssmin']
            },
            js: {
                files: ['public/scripts/**/*.js'],
                tasks: ['uglify:build']
            },
            node: {
                files: ['package.json'],
                tasks: ['shell:npm_install']
            }
        },

        // run watch and nodemon at the same time
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            tasks: ['nodemon', 'watch']
        }
    });

    grunt.registerTask('default', ['uglify:build', 'uglify:bower', 'cssmin', 'concurrent']);

    grunt.registerTask('install-dep', ['shell:npm_install', 'shell:bower_install', 'bower_concat', 'uglify:bower']);
};