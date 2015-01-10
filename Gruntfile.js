'use strict';
// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'
module.exports = function(grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);
    // Configurable paths for the application
    var appConfig = {
        app: require('./bower.json').appPath || './',
        dist: 'dist',
        build: 'build'
    };
    // Define the configuration for all the tasks
    grunt.initConfig({
        // Project settings
        yeoman: appConfig,
        jsbeautifier: {
            files: ['scripts/**/*.js'],
            options: {
                //config: "path/to/configFile",
                html: {
                    braceStyle: "expand",
                    indentChar: " ",
                    indentScripts: "keep",
                    indentSize: 3,
                    maxPreserveNewlines: 10,
                    preserveNewlines: true,
                    unformatted: ["a", "sub", "sup", "b", "i", "u"],
                    wrapLineLength: 0
                },
                css: {
                    indentChar: " ",
                    indentSize: 3
                },
                js: {
                    braceStyle: "expand",
                    breakChainedMethods: false,
                    e4x: false,
                    evalCode: false,
                    indentChar: " ",
                    indentLevel: 0,
                    indentSize: 3,
                    indentWithTabs: false,
                    jslintHappy: false,
                    keepArrayIndentation: false,
                    keepFunctionIndentation: false,
                    maxPreserveNewlines: 10,
                    preserveNewlines: true,
                    spaceBeforeConditional: true,
                    spaceInParen: false,
                    unescapeStrings: false,
                    wrapLineLength: 0
                }
            }
        },
        less: {
            dist: {
                files: {
                    "<%= yeoman.build %>/style.css": "styles/**/*.less"
                }
            }
        },
        coffee: {
            compile: {
                files: {
                    'test/test.js': 'test/**/*.coffee'
                }
            }
        },
        uglify: {
            all: {
                files: [{
                    expand: true,
                    cwd: './',
                    src: '<%= yeoman.build %>/**/*.js',
                    dest: ''
                }]
            }
        },
        htmlmin: {
            all: {
                options: {
                   removeComments: true,
                   collapseWhitespace: true
                },
                files: [{
                   expand: true,
                   cwd: './',
                   src: '<%= yeoman.build %>/**/*.html',
                   dest: ''
                }]
            }
        },
        cssmin: {
            all: {
                files: [{
                    expand: true,
                    cwd: './',
                    src: '<%= yeoman.build %>/**/*.css',
                    dest: ''
                }]
            }
        },
        smoosher: {
            all: {
                options: {
                    jsDir: "<%= yeoman.build %>",
                    cssDir: "<%= yeoman.build %>"
                },
                files: {
                    '<%= yeoman.dist %>/gltf-viewer-element.html': '<%= yeoman.build %>/index.html',
                },
            },
            min: {
                options: {
                    jsDir: "<%= yeoman.build %>",
                    cssDir: "<%= yeoman.build %>"
                },
                files: {
                    '<%= yeoman.dist %>/gltf-viewer-element.min.html': '<%= yeoman.build %>/index.html',
                },
            },
        },
        // Watches files for changes and runs tasks based on the changed files
        watch: {
            styles: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '.tmp/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>'
                }
            }
        },
        jshint: {
            options: {
                undef: true,
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                shadow: true,
                jquery: true,
                couch: true,
                node: true,
                globals: {
                    "define": false,
                    "require": false
                }
            },
            all: ['./*.js', './scripts/**/*.js']
        },
        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/{,*/}*',
                        '!<%= yeoman.dist %>/.git{,*/}*'
                    ]
                }]
            },
            server: '.tmp',
            build: ['<%= yeoman.build %>']
        },
        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },
        concat: {
            script: {
                src: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
                dest: '<%= yeoman.build %>/index.js',
                options: {
                    banner: ";(function(window, undefined){ \n 'use strict';",
                    footer: "}(window));"
                }
            },
            markup: {
                src: ['<%= yeoman.app %>/templates/{,*/}*.html'],
                dest: '<%= yeoman.build %>/index.html'
            }
        },
        // Copies remaining files to places other tasks can use
        copy: {
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },
        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        }
    });
    grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }
        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });
    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function(target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });
    grunt.registerTask('build', [
        'jshint:all',
        'clean:dist',
        'clean:build',
        'jsbeautifier',
        'coffee:compile',
        'less:dist',
        //'concurrent:dist',
        'autoprefixer',
        'concat:script',
        'concat:markup',
        'smoosher:all'
    ]);
    grunt.registerTask('build:min', [
        'jshint:all',
        'clean:build',
        'jsbeautifier',
        'coffee:compile',
        'less:dist',
        //'concurrent:dist',
        'autoprefixer',
        'concat:script',
        'concat:markup',
        'uglify:all',
        'htmlmin:all',
        'cssmin:all',
        'smoosher:min'
    ]);
    grunt.registerTask('default', [
        'newer:jshint',
        'build',
        'build:min'
    ]);
};