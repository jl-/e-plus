'use strict';
module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    var config = {
        styles: 'styles',
        scripts: 'scripts',
        dist: 'dist'
    };

    grunt.initConfig({
        config: config,
        sass: {
            options: {
                style: 'expended'
            },
            app: {
                files: [{
                    expand: true,
                    cwd: '<%= config.styles %>',
                    src: '**/*.scss',
                    dest: '<%= config.styles %>',
                    ext: '.css'
                }]
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 5 version']
            },
            app: {
                files: [{
                    expand: true,
                    cwd: '<%= config.styles %>',
                    src: '**/*.css',
                    dest: '<%= config.styles %>'
                }]
            }
        },
        browserify: {
            options: {
                transform: [require('grunt-react').browserify],
                watch: true
            },
            app: {
                files: {
                    '<%= config.scripts %>/build/react/components/components.js': ['<%= config.scripts %>/src/react/components/*.jsx'],
                    '<%= config.scripts %>/build/react/playground.js': ['<%= config.scripts %>/src/react/playground.jsx']
                }
            }
        },
        connect: {
            options: {
                port: 9001,
                hostname: 'localhost',
                base: '.',
                livereload: 35729
            },
            app: {
                options: {
                    open: 'http://localhost:9001'
                }
            }
        },
        watch: {
            options: {
                livereload: '<%= connect.options.livereload %>'
            },
            sass: {
                files: ['<%= config.styles %>/**/*.scss'],
                tasks: ['sass:app']
            },
            css: {
                files: ['<%= config.styles %>/**/*.css'],
                tasks: ['newer:autoprefixer:app']
            },
            html: {
                files: ['**/*.html']
            },
            js: {
                files: ['<%= config.scripts %>/**/*.js']
            }
        }

    });

    grunt.registerTask('app', 'grunt:app', function(target) {
        grunt.task.run([
            'connect',
            'browserify',
            'watch'
        ]);
    });
    grunt.registerTask('build', 'grunt:build', function() {
        grunt.task.run([
            'useminPrepare',
            'concat:adminJs',
            'uglify:admin',
            'concat:indexJs',
            'uglify:index',
            'usemin'
        ]);
    });





};