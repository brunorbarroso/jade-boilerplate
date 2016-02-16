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
    var authors   = "";

    for( i in packageFile.authors ){
        if( authors == "" ){
            authors = packageFile.authors[i];
        }else{
            authors = authors+"\n\t "+packageFile.authors[i];
        }
    }
    /*
     * ------------------------------------------------------
     */

    //  Banners dos arquivos
    var hr = '----------------------------------------------------\n';
    var bannerFiles = '/*\n' +
        hr+
        'Jade Boilerplate\n' +
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

            sass: {
                files: ['**/*.scss','**/*.sass'],
                tasks: ['sass:build'],
            },
            jade: {
                files: ['**/*.jade'],
                tasks: ['jade']
            }

        },

        //  sass
        sass: {
            build: {
                options: {
                    style: 'expanded',
                    noCache: true,
                },
                files: {
                    'build/assets/css/main.css': 'app/assets/sass/main.sass'
                }
            },

            dist: {
                options: {
                    sourcemap: 'none',
                    style: 'expanded',
                    noCache: true
                },
                files: {
                    'dist/assets/css/main.css': 'app/assets/sass/main.sass'
                }
            },
        },

        //  cssmin
        cssmin: {
            dist: {
                options: {
                    banner:bannerFiles,
                    keepSpecialComments:0
                },

                files: {
                    'dist/assets/css/main.min.css': 'dist/assets/css/main.css',
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

            dist: {
                options: {
                    client: false,
                    pretty: false,
                },

                files: [{
                    expand: false,
                    cwd: 'app/jadefiles/pages',
                    src: [ '**/*.jade' ],
                    dest: 'dist',
                    ext: '.html'
                }]
            }
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
    grunt.registerTask('build', ['sass:build', 'jade:build', 'connect:build', 'watch']);
    grunt.registerTask('dist', ['sass:dist', 'cssmin:dist', 'connect:dist', 'watch']);
};
