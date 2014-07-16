module.exports = function (grunt) {

	// load the task


	grunt.initConfig(
		{

			ts:
			{
				dev: {
					src: [
						"./ts/**/*.html.ts",
						"./ts/**/*.ts"
					],        // The source typescript files, http://gruntjs.com/configuring-tasks#files
					html: ["./ts/**/*.html"], // The source html files, https://github.com/basarat/grunt-ts#html-2-typescript-support
					reference: "./ts/reference.ts",  // If specified, generate this file that you can use for your reference management
					//watch: './ts',                     // If specified, watches this directory for changes, and re-runs the current target
					out:'./js/app.js',
					options: {                         // use to override the default options, http://gruntjs.com/configuring-tasks#options
						target: 'es5',                 // 'es3' (default) | 'es5'
						module: 'commonjs',            // 'amd' (default) | 'commonjs'
						sourceMap: false,               // true (default) | false
						declaration: false,            // true | false (default)
						removeComments: true,           // true (default) | false
						fast:"never"
					}
				}
			},

			watch: {
				typescript: {
					files: ['./ts/**/*.ts','./ts/views/**/*.html'],
					tasks: ['ts:dev']
				}
			}

		});


	grunt.loadNpmTasks("grunt-ts");
	grunt.loadNpmTasks("grunt-contrib-watch");


	grunt.registerTask("default", ["watch"]);
	grunt.registerTask("proxy", "proxy task",function(){

		var done = this.async();
		console.log('pepe')
		var host = "127.0.0.1";
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