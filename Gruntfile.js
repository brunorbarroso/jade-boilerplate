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

        },

        // connect
        connect: {
            build: {
                options: {
                    port: 9000,
                    base: '',
                    open: true,
                    livereload: true,
                }
            },
        }
    });

    // Tarefa(s) padrão
    grunt.registerTask('build', ['sass','connect:build','watch']);
    grunt.registerTask('dist'  , ['sass','cssmin','connect:build']);
};
