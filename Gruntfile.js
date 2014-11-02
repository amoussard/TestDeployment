module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        exec: {
            jasmine: 'node node_modules/jasmine-node/lib/jasmine-node/cli.js --color --junitreport \
                --verbose --output build/testresults test/*.js',
            istanbul: 'node node_modules/istanbul/lib/cli.js cover --root lib --preload-sources\
                --dir build/coverage node_modules/jasmine-node/bin/jasmine-node -- test --forceexit',
            cobertura: 'node node_modules/istanbul/lib/cli.js report --root build/coverage\
                --dir build/coverage/cobertura cobertura',
            analysis: 'mkdir -p build/analysis\
                && touch build/analysis/jslint.xml\
                && node node_modules/jshint/bin/jshint --config .jshintrc --jslint-reporter -- lib test\
                > build/analysis/jslint.xml\
                || true',
            jscs: 'mkdir build/checkstyle\
                && touch build/checkstyle/jshint.xml\
                && node node_modules/jscs/bin/jscs --config .jscs.json --reporter checkstyle lib test\
                > build/checkstyle/jshint.xml\
                || true',
            jscsNoXml: 'node node_modules/jscs/bin/jscs --config .jscs.json app/js\
                || true',
            scsslint: 'touch build/analysis/scss-lint-report.xml\
                && scss-lint --config .scss-lint.yml --format XML app/scss\
                > build/analysis/scss-lint-report.xml\
                || true',
            scsslintNoXml: 'scss-lint --config .scss-lint.yml app/scss\
                || true',
            clear: 'rm -rf build',
            prepare: 'mkdir build'
        },

        pkg: grunt.file.readJSON('package.json'),
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths: 'lib',
                    outdir: 'build/doc'
                }
            }
        }
    });

    grunt.registerTask('test', [
        'jsdoc:jenkins'
    ]);
    grunt.registerTask('jenkins', [
        'exec:clear',
        'exec:prepare',
        'exec:analysis',
        'exec:jscs',
        'exec:jasmine',
        'exec:istanbul',
        'exec:cobertura',
        'yuidoc'
    ]);
    grunt.registerTask('default', [
        'test'
    ]);

};
