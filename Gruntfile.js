module.exports = function(grunt) {
    grunt.initConfig({

        jasmine: {
            taskName: {
                src: 'js/src/*.js',
                options: {
                    specs: 'js/tests/*Spec.js',
                    helpers: 'js/tests/helper/*Helper.js',
                    vendor: "js/vendor/jquery.js"
                }

            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask("test", "Jasmine Tests", "jasmine");

};
