module.exports = function(grunt) {
    //    Informa o tempo de execução das tarefas do grunt
    require('time-grunt')(grunt);

    //    Carrega todos modulos do grunt no package.json
    require('load-grunt-tasks')(grunt);

    var packageFile = grunt.file.readJSON('package.json');

    /*
     * ------------------------------------------------------
     * Gera a string com os autores do projeto
     * ------------------------------------------------------
     */
    var authors   = "Gabriel Melo";

    for( i in packageFile.authors ){
        if( authors == "" ){
            authors = packageFile.authors[i];
        }else{
            authors = authors+"\n\t  "+packageFile.authors[i];
        }
    }
    /*
     * ------------------------------------------------------
     */

    //  Banners dos arquivos
    var hr = '----------------------------------------------------\n';
    var bannerFiles = '/*\n' +
        hr+
        'Gabriel Melo\n' +
        hr+
        'projeto\t: <%= pkg.name %>\n' +
        'versao\t: <%= pkg.version %>\n' +
        'data\t: <%= grunt.template.today("dd/mm/yyyy HH:MM:ss") %>\n' +
        'autores\t: <%= authors %>\n' +
        hr+
        '*/\n';

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
            compile: {
                options: {
                    client: false,
                    pretty: true
                },
                files: [{
                    expand: true,
                    cwd: 'jadefiles/pages/',
                    src: [ '**/*.jade' ],
                    dest: 'html/',
                    ext: '.html'
                }]
            }
        }
    });

    // Tarefa(s) padrão
    grunt.registerTask('build', ['connect:build','jade','watch']);
};
