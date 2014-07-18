module.exports = function (grunt) {

	// load the task


	grunt.initConfig(
		{
            pkg: grunt.file.readJSON('package.json'),
			ts:
			{
				dev: {
					src: [
						'./ts/**/*.html.ts',
						'./ts/**/*.ts'
					],        // The source typescript files, http://gruntjs.com/configuring-tasks#files
					html: ['./ts/**/*.html'], // The source html files, https://github.com/basarat/grunt-ts#html-2-typescript-support
					reference: './ts/reference.ts',  // If specified, generate this file that you can use for your reference management
					//watch: './ts',                     // If specified, watches this directory for changes, and re-runs the current target
					out:'./js/app.js',
					options: {                         // use to override the default options, http://gruntjs.com/configuring-tasks#options
						target: 'es5',                 // 'es3' (default) | 'es5'
						module: 'commonjs',            // 'amd' (default) | 'commonjs'
						sourceMap: false,               // true (default) | false
						declaration: false,            // true | false (default)
						removeComments: true,           // true (default) | false
						fast:'never'
					}
				}
			},
			tslint: {
				options: {
					configuration: grunt.file.readJSON('./ts/tslint.json'),
					formatter: 'tslint-path-formatter'
				},
				source: {
					src: ['ts/**/*.ts','!ts/typings/**/*.ts','!ts/reference.ts','!ts/libs/**/*.ts']
				}
			},
            'typescript-formatter': {
                files: ['./ts/**/*.ts']
            },

            uglify: {
                typescript: {
                    options:{
                        mangle:false,
                        drop_console: true,
                        banner: '/*! *****************************************************************************\n'+
                                '    <%= pkg.name %> - v<%= pkg.version %>\n'+
                                '    <%= pkg.author %> - <%= grunt.template.today("yyyy-mm-dd") %>\n'+
                                '***************************************************************************** */\n\n'
                    },
                    files: {
                        'js/app.min.js': ['js/app.js']
                    }
                }
            },

			watch: {
				typescript: {
					files: ['./ts/**/*.ts','./ts/views/**/*.html'],
					tasks: ['tslint','ts:dev','uglify:typescript']
				}
			}


		});


	grunt.loadNpmTasks('grunt-ts');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-tslint');
	grunt.loadNpmTasks('grunt-typescript-formatter');


	grunt.registerTask('default', ['tslint','ts:dev','uglify:typescript','watch']);
	grunt.registerTask('build', ['typescript-formatter','tslint','ts:dev','uglify:typescript']);
	grunt.registerTask('proxy', 'proxy task',function(){

		var done = this.async();
		var host = '127.0.0.1';
		var port = 3000;
		var cors_proxy = require('cors-anywhere');
		cors_proxy.createServer({
			//requireHeader: ['origin', 'x-requested-with'],
			removeHeaders: ['cookie', 'cookie2']
		}).listen(port, host, function() {
			console.log('Running CORS Anywhere on ' + host + ':' + port);
		});

	});
}


