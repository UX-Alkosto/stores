
'use strict';
module.exports = function (grunt) {

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
        less: {
            options: {
                compress: true,
                paths: ['dist/css'],
                plugins: [
                    new (require('less-plugin-autoprefix'))({ browsers: ["last 2 versions"] })
                ]
            },
            alkosto : {
                options: {
                    modifyVars: {
                        themeName: 'alkosto'
                    }
                },
                files: {
                    'dist/alkosto/css/detalle.css': 'src/less/detalle.less',
                    'dist/alkosto/css/tiendas.css': 'src/less/tiendas.less'
                }
            },
            alkomprar: {
                options: {
                    modifyVars: {
                        themeName: 'alkomprar'
                    }
                },
                files: {
                    'dist/alkomprar/css/detalle.css': 'src/less/detalle.less',
                    'dist/alkomprar/css/tiendas.css': 'src/less/tiendas.less'
                }
            },
            kalley: {
                options: {
                    modifyVars: {
                        themeName: 'kalley'
                    }
                },
                files: {
                    'dist/kalley/css/detalle.css': 'src/less/detalle.less',
                    'dist/kalley/css/tiendas.css': 'src/less/tiendas.less'
                }
            },
            ktronix: {
                options: {
                    modifyVars: {
                        themeName: 'ktronix'
                    }
                },
                files: {
                    'dist/ktronix/css/detalle.css': 'src/less/detalle.less',
                    'dist/ktronix/css/tiendas.css': 'src/less/tiendas.less'
                }
            }
        },
        uglify: {
            options: {
                banner:
                    "/*! <%= pkg.name %> - v<%= pkg.version %> - " +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */',
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
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');

    grunt.registerTask('default', ['clean', 'copy', 'less', 'uglify']);
};