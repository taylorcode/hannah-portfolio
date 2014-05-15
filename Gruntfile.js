module.exports = function (grunt) {

    grunt.loadTasks('./custom-tasks');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        coffee: {
            default: {
                expand: true,
                cwd: 'dev/assets',
                src: ['**/*.coffee'],
                dest: 'target/assets',
                ext: '.js'
            }
        },

        projectJSON: {
            default: {
                src: 'dev/assets/categories',
                dest: 'target/assets/json/projects.json'
            }
        },


        clean: ['target', '!target/assets/media/images', '!target/assets/json'],

        copy: {
          main: {
            expand: true,
            cwd: 'dev/assets/categories',
            src: '**',
            dest: 'dev/assets/media/raw-images/categories',
            rename: function (dest, filename) {
                return dest + '/' + filename.replace(/\s+/g, '-').toLowerCase()
            }
          }
        },

        compass: {
            default: {
                options: {
                    sassDir: 'dev/assets/stylesheets',
                    cssDir: 'target/assets/stylesheets'
                }
            }
        },
        htmlbuild: {
            default: {
                src: 'dev/index.html',
                dest: 'target/',
                options: {
                    beautify: true,
                    //prefix: '//some-cdn',
                    relative: true,
                    scripts: {
                        bundle: [
                            'target/assets/**/*.js',
                            '!target/assets/scripts/routes.js'
                        ]
                    },
                    styles: {
                        bundle: [
                            'target/assets/stylesheets/**/*.css'
                        ]
                    },
                    data: {
                        environment: 'dev'
                    }
                }
            }
        },
        sync: {
            default: {
                files: [{
                    cwd: 'dev/assets',
                    src: ['**', '!**/*.coffee', '!**/*.sass', '!categories/**', '!media/raw-images/**'],
                    dest: 'target/assets'
                }]
            }
        },

        responsive_images: {
            default: {
                options: {
                    sizes: [{
                        width: 320,
                        name: 'thumb'
                    }, {
                        width: 640,
                        name: 'display'
                    }, {
                        width: 1024,
                        name: 'fullres'
                    }]
                },
                files: [{
                    expand: true,
                    src: ['**/*.{jpg,gif,png}'],
                    cwd: 'dev/assets/media/raw-images/categories',
                    custom_dest: 'target/assets/media/images/categories/{%= path %}/{%= name %}'
                }]
            }
        },

        watch: {
            coffeescript: {
                files: ['dev/assets/**/*.coffee'],
                tasks: ['coffee', 'htmlbuild']
            },
            compass: {
                files: ['dev/assets/**/*.sass'],
                tasks: ['compass']
            },
            stylesheets: {
                files: ['dev/assets/stylesheets/**/*.sass'],
                tasks: ['htmlbuild'] 
            },
            sync_assets: {
                files: ['dev/assets/**', '!dev/assets/categories/**', '!dev/assets/media/raw-images/**'],
                tasks: ['sync']
            },
            index: {
                files: ['dev/index.html'],
                tasks: ['htmlbuild'],
            },
            livereload: {
                files: ['target/**/*'],
                options: {
                    livereload: true
                }
            }
        }
        
    });

    // load all tasks declared in devDependencies
    Object.keys(require('./package.json').devDependencies).forEach(function (dep) {
        if (dep.substring(0, 6) == 'grunt-') {
            grunt.loadNpmTasks(dep);
        }
    });

    // setup our workflow
    grunt.registerTask('default', ['clean', 'coffee', 'compass', 'htmlbuild', 'sync', 'copy', 'watch']);
}