
"use strict";
module.exports = grunt => {

    var themes = ["alkomprar", "alkosto", "kalley", "ktronix"];

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        clean: {
            dist: ["dist/**/css/*", "dist/**/json/*"]
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
        json_minification: {
            target: {
                files: [{
                    expand: true,
                    cwd: "src/json",
                    src: ["<%= theme %>.json"],
                    dest: "dist/<%= theme %>/json",
                    rename: dest => {
                        return dest + "/tiendas.json";
                    }
                }]
            }
        },
        less: {
            options: {
                compress: true,
                modifyVars: {
                    themeName: "<%= theme %>"
                },
                paths: ["dist/css"],
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
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-json-minification");

    grunt.registerMultiTask("themes", "Generate styles for each site", function(){
        const done = this.async();
        grunt.log.writeln("Compile less for: " + this.data);
        grunt.config("theme", this.data);
        grunt.task.run("less");
        grunt.task.run("json_minification");
        done();
    });
    grunt.registerTask("default", ["clean", "themes", "cssmin"]);
};