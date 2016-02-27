module.exports = function(grunt) {
    //    Informa o tempo de execução das tarefas do grunt
    require('time-grunt')(grunt);

    //    Carrega todos modulos do grunt no package.json
    require('load-grunt-tasks')(grunt);

    var packageFile = grunt.file.readJSON('package.json');

    var authors   = "";
    var authors   = "Gabriel Melo";
    for( i in packageFile.authors ){
        if( authors == "" ){
            authors = packageFile.authors[i];
        }else{
            authors = authors+"\n\t  "+packageFile.authors[i];
        }
    }

    //  Configurações das Tasks
    grunt.initConfig({
        pkg: packageFile,
        authors: authors,

        //  watch
        watch: {
            options: {
                livereload: true
            },

            // jade
            jade: {
                files: ['**/*.jade', '**/*.md'],
                tasks: ['jade']
            }

        },

        // connect
        connect: {
            build: {
                options: {
                    port: 9000,
                    base: 'html/',
                    open: true,
                    livereload: true,
                }
            }
        },

        // jade
        jade: {
            build: {
                options: {
                    client: false,
                    pretty: true
                },

                files: [{
                    expand: true,
                    cwd: 'app/jadefiles/pages',
                    src: [ '**/*.jade' ],
                    dest: 'build',
                    ext: '.html'
                }]
            },

        // connect
        connect: {
            build: {
                options: {
                    port: 9000,
                    base: 'build/',
                    open: true,
                    livereload: true,
                }
            },

            dist: {
                options: {
                    port: 9001,
                    base: 'dist/',
                    open: true,
                    livereload: true,
                    keepalive: true
                }
            }
        }
    });

    // Tarefa(s) padrão
    grunt.registerTask('build', ['connect:build','jade','watch']);
};
