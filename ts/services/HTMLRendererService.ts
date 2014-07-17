/**
 * HTMLRendererService.ts
 * Created by xperiments on 14/07/14.
 */
///<reference path="../reference.ts"/>
declare var stylus;

module io.xperiments.csseditor.services
{

	import PlaygroundProject = io.xperiments.csseditor.models.PlaygroundProject;

	export interface IFrameworkGroupedFiles
	{
		css:string[];
		js:string[];
	}
	export interface HTMLRenderingContext
	{
		body:string;
		css:string;
		styles:string;
		js:string;
		scripts:string;
	}

	export class HTMLRendererService
	{
		static $inject = [
			 $di.$ng.$q
			,$di.$ng.$interpolate
			,$di.$app.ResourceLoaderService
			,$di.$app.ConfigService
		];
		private iframeTemplateRenderer:ng.IInterpolationFunction;
		private iframeTemplateRenderers:{ [key:string]:ng.IInterpolationFunction} = {};
		constructor(
			private $q:ng.IQService
			,private $interpolate:ng.IInterpolateService
			,private resourceLoaderService:ResourceLoaderService
			,private configService:ConfigService
		)
		{


		}

		public configLoaded()
		{
			Object.keys( this.configService.js_wrap_map )
				.forEach( (key)=>{
					console.log(this.configService.js_wrap_map[key])
					this.iframeTemplateRenderers[this.configService.js_wrap_map[key]]=this.$interpolate( window[ this.configService.js_wrap_map[key]].html )
				})

		}

		public render( project:PlaygroundProject ):ng.IPromise<string>
		{

			var allPromises:ng.IPromise<any>[]= [ this.renderCss(project), this.renderJs(project) ,this.renderBody(project) ];

			// inline external files?
			if( project.options.inlineFiles && project.options.inlineProxyURL!="" )
			{
				var frameworkFiles:IFrameworkGroupedFiles = this.getFrameworkFiles( project );
				frameworkFiles.css.concat( project.cssFiles );
				frameworkFiles.js.concat( project.jsFiles );
				var filesToInline:string[] = [].concat(frameworkFiles.css).concat(frameworkFiles.js);
				allPromises.push( this.resourceLoaderService.load(filesToInline, project.options.inlineProxyURL) );
			}

			return this.$q.all ( allPromises ).then( ( results:any[])=>{

				var css:string = results[0];
				var js:string = results[1];
				var body:string = results[2];
				var resourceResult:IResourceLoaderServiceResult = results[3];

				return this.renderPage( project, css, js, body, resourceResult );

			});
		}
		private tsCompiler = new TypeScript.TypeScriptCompiler();
		private renderCss( project:PlaygroundProject ):ng.IPromise<string>
		{
			var defer = this.$q.defer();
			var promise = defer.promise;
			if( project.options.cssRenderMode == "css" )
			{
				defer.resolve( project.css );
				return promise;
			}
			stylus( project.css ).render( ( err, css )=>{

				err ? defer.reject( "/*Stylus Error CHECK YOUR CODE*/" ):defer.resolve( css );

			});
			return promise;
		}
		private renderJs(project:PlaygroundProject ):ng.IPromise<string>
		{
			var defer = this.$q.defer();
			var promise = defer.promise;
			if( project.options.jsRenderMode == "javascript" )
			{
				defer.resolve( project.js );
			}
			this.tsCompiler && this.tsCompiler.removeFile("output.ts");
			this.tsCompiler.addFile("output.ts", TypeScript.ScriptSnapshot.fromString( project.js ),null,null,null );
			var output:string = "";
			var iter = this.tsCompiler.compile(null,null);
			while (iter.moveNext()) {
				var current = iter.current().outputFiles[0];
				output += !!current ? current.text : '';
			}
			defer.resolve( output );
			return promise;
		}

		private renderBody( project:PlaygroundProject ):ng.IPromise<string>
		{
			var defer = this.$q.defer();
			var promise = defer.promise;
			defer.resolve( project.body );
			return promise;
		}

		private renderPage( project:PlaygroundProject , css:string, js:string, body:string, resourceResult:IResourceLoaderServiceResult ):string
		{
			console.log( 'RAP',project.options.js_wrap_mode)
			var frameworkFiles:IFrameworkGroupedFiles = this.getFrameworkFiles( project );
			frameworkFiles.css.concat( project.cssFiles );
			frameworkFiles.js.concat( project.jsFiles );

			var htmlContext:HTMLRenderingContext;
			if( resourceResult )
			{

				htmlContext =
				{
					body:body,
					css:css,
					styles:frameworkFiles.css.map((cssFile:string)=>{
						return '<link rel="stylesheet" type="text/css" href="data:text/html;base64,'+resourceResult[project.options.inlineProxyURL+cssFile]+'"/>\n'
					}).join(''),
					js:js,
					scripts:frameworkFiles.js.map((jsFile:string)=>{ return '<script src="data:text/html;base64,'+resourceResult[project.options.inlineProxyURL+jsFile]+'"></script>\n'}).join('')
				};

				return this.iframeTemplateRenderers[project.options.js_wrap_mode](htmlContext);

			}

			htmlContext= {
				body:body,
				css:css,
				styles:frameworkFiles.css.map((cssFile:string)=>{ return '<link rel="stylesheet" type="text/css" href="'+cssFile+'"/>\n'}).join(''),
				js:js,
				scripts:frameworkFiles.js.map((jsFile:string)=>{ return '<script src="'+jsFile+'"></script>\n'}).join('')
			};
			return this.iframeTemplateRenderers[project.options.js_wrap_mode](htmlContext);

		}

		private getFrameworkFiles( project:PlaygroundProject ):IFrameworkGroupedFiles
		{
			var resultFiles:IFrameworkGroupedFiles =
			{
				css:[],
				js:[]
			}
			if( !project.options.framework ) return resultFiles;

			var currentFrameworkFiles = project.options.framework.url;
			var target:string[];
			currentFrameworkFiles.forEach(( file:string)=>{
				target = this.getFileExtension(file)=="css" ? resultFiles.css:resultFiles.js;
				target.push( file );
			})
			console.log( resultFiles )
			return resultFiles;
		}

		private getFileExtension( url:string ):string
		{
			return url.split('/').pop().split('.').pop();
		}

	}
	$di.checkDI( HTMLRendererService );
}