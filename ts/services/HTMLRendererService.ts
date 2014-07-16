/**
 * HTMLRendererService.ts
 * Created by xperiments on 14/07/14.
 */
///<reference path="../reference.ts"/>
declare var stylus;
declare var TypeScript:any;
module io.xperiments.csseditor.services
{


	import PlaygroundProject = io.xperiments.csseditor.models.PlaygroundProject;
	import ResourceLoaderService = io.xperiments.csseditor.services.ResourceLoaderService;
	import IResourceLoaderServiceResult = io.xperiments.csseditor.services.IResourceLoaderServiceResult;

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
		];
		private iframeTemplateRenderer:ng.IInterpolationFunction;
		constructor(
			private $q:ng.IQService
			,private $interpolate:ng.IInterpolateService
			,private resourceLoaderService:ResourceLoaderService
		)
		{
			this.iframeTemplateRenderer = $interpolate( PreviewView.html );

		}



		public render( project:PlaygroundProject ):ng.IPromise<string>
		{
			var allPromises:ng.IPromise<any>[]= [ this.renderCss(project), this.renderJs(project) ,this.renderBody(project) ];

			// inline external files?
			if( project.options.inlineFiles && project.options.inlineProxyURL!="" )
			{
				var filesToInline:string[] = [].concat(project.cssFiles).concat(project.jsFiles)
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
			this.tsCompiler.addFile("output.ts", TypeScript.ScriptSnapshot.fromString( project.js ) );
			var output:string = "";
			var iter = this.tsCompiler.compile();
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
			var htmlContext:HTMLRenderingContext;
			if( resourceResult )
			{

				htmlContext =
				{
					body:body,
					css:css,
					styles:project.cssFiles.map((cssFile:string)=>{
						return '<link rel="stylesheet" type="text/css" href="data:text/html;base64,'+resourceResult[project.options.inlineProxyURL+cssFile]+'"/>\n'
					}).join(''),
					js:js,
					scripts:project.jsFiles.map((jsFile:string)=>{ return '<script src="data:text/html;base64,'+resourceResult[project.options.inlineProxyURL+jsFile]+'"></script>\n'}).join('')
				};

				return this.iframeTemplateRenderer(htmlContext);

			}

			htmlContext= {
				body:body,
				css:css,
				styles:project.cssFiles.map((cssFile:string)=>{ return '<link rel="stylesheet" type="text/css" href="'+cssFile+'"/>\n'}).join(''),
				js:js,
				scripts:project.jsFiles.map((jsFile:string)=>{ return '<script src="'+jsFile+'"></script>\n'}).join('')
			};
			return this.iframeTemplateRenderer(htmlContext)

		}

	}
}