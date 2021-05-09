
"use strict";
module.exports = function (grunt) {

    var themes = ["alkomprar", "alkosto", "kalley", "ktronix"];

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        clean: {
            dist: ["dist/**/css/*", "dist/**/fonts/*"]
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
                compatibility: "ie8",
                report: "gzip",
                inline: ["local"],
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
                cwd: "dist",
                src: ["**/css/*.css"],
                dest: "dist"
            }
        },
        less: {
            options: {
                compress: true,
                modifyVars: {
                    themeName: "<%= theme %>"
                },
                paths: ["dist/css"],
                plugins: [
                    new (require("less-plugin-autoprefix"))({ browsers: ["last 2 versions"] })
                ]
            },
            theme : {
                files: {
                    "dist/<%= theme %>/css/detalle.css": "src/less/detalle.less",
                    "dist/<%= theme %>/css/tiendas.css": "src/less/tiendas.less"
                }
            }
        },
        themes: themes
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-less");

    grunt.registerMultiTask("themes", "Generate styles for each site", function(){
        const done = this.async();
        grunt.log.writeln("Compile less for: " + this.data);
        grunt.config("theme", this.data);
        grunt.task.run("less");
        done();
    });
    grunt.registerTask("default", ["clean", "copy", "themes", "cssmin"]);
};