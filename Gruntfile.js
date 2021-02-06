
'use strict';
module.exports = function (grunt) {

    var themes = ['alkomprar', 'alkosto', 'kalley', 'ktronix']

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        clean: {
            dist: ["dist/**/css/*", "dist/**/js/*", "dist/**/fonts/*"]
        },
        copy: {
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: "src/fonts/",
                        src: "**",
                        dest: "dist/common/fonts"
                    }
                ]
            }
        },
        cssmin : {
            options : {
                banner: "/*! <%= pkg.name %> - v<%= pkg.version %> */",
                compatibility: 'ie8',
                report: 'gzip',
                inline: ['local'],
                level: {
                    1: {
                        all: true
                    },
                    2: {
                        all: true
                    }
                }
            },
            dist: {
                expand: true,
                cwd: 'dist',
                src: ['**/css/*.css'],
                dest: 'dist'
            }
        },
        less: {
            options: {
                compress: true,
                modifyVars: {
                    themeName: '<%= theme %>'
                },
                paths: ['dist/css'],
                plugins: [
                    new (require('less-plugin-autoprefix'))({ browsers: ["last 2 versions"] })
                ]
            },
            theme : {
                files: {
                    'dist/<%= theme %>/css/detalle.css': 'src/less/detalle.less',
                    'dist/<%= theme %>/css/tiendas.css': 'src/less/tiendas.less'
                }
            }
        },
        themes: themes,
        uglify: {
            options: {
                banner:"/*! <%= pkg.name %> - v<%= pkg.version %> */",
                report: "gzip",
                compress: true,
                sourceMap: false,
                exportAll: true,
            },
            dist: {
                files: {
                    'dist/common/js/ciudades.js': ['src/js/ciudades.js'],
                    'dist/common/js/tiendas.js': ['src/js/tiendas.js'],
                    'dist/common/js/detalle.js': ['src/js/detalle.js']
                },
            },
            holydays: {
                files: {
                    'dist/common/js/colombia-holidays/index.js': ['src/js/colombia-holidays/index.js'],
                    'dist/common/js/colombia-holidays/holidays.js': ['src/js/colombia-holidays/holidays.js'],
                    'dist/common/js/colombia-holidays/nextDay.js': ['src/js/colombia-holidays/nextDay.js']
                },
            },
            niceSelect: {
                files: {
                    'dist/common/js/jquery.nice-select.js': ['src/js/jquery.nice-select.js']
                },
            },
            stores: {
                files: {
                    'dist/common/js/stores/index.js': ['src/js/stores/index.js'],
                    'dist/common/js/stores/isopen.js': ['src/js/stores/isopen.js']
                },
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');

    grunt.registerMultiTask('themes', 'Generate styles for each site', function(){
        const done = this.async();
        grunt.log.writeln('Compile less for: ' + this.data);
        grunt.config('theme', this.data);
        grunt.task.run('less');
        done();
    });
    grunt.registerTask('default', ['clean', 'copy', 'themes', 'cssmin', 'uglify']);
};