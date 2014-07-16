///<reference path="../reference.ts"/>
module io.xperiments.csseditor.controllers
{
	import HTMLRendererService = io.xperiments.csseditor.services.HTMLRendererService;
	import CurrentProjectService = io.xperiments.csseditor.services.CurrentProjectService;
	import LibrariesService = io.xperiments.csseditor.services.LibrariesService;
	import ILibrary = io.xperiments.csseditor.services.IFramework;
	import PlaygroundProject = io.xperiments.csseditor.models.PlaygroundProject;
	import PlaygroundProjectOptions = io.xperiments.csseditor.models.PlaygroundProjectOptions;

	export class EditorController
	{

		public iframeSource:string ="";
		public compiledResult:string ="";

		public currentProject:PlaygroundProject;
		public libraries:ILibrary[];
		static $inject=[
			$di.$ng.$rootScope,
			$di.$ng.$sce,
			$di.$ng.$interpolate,
			$di.$ng.$q,
			$di.$app.HTMLRendererService,
			$di.$app.CurrentProjectService,
			$di.$app.LibrariesService,
			$di.$app.ConfigService,
		];
		constructor(
			 private $rootScope:ng.IRootScopeService
			,private $sce:ng.ISCEService
			,private $interpolate:ng.IInterpolateService
			,private $q:ng.IQService
			,private HTMLRendererService:HTMLRendererService
			,private currentProjectService:CurrentProjectService
			,private librariesService:LibrariesService
			,private ConfigService:LibrariesService
		)
		{
			this.currentProject = currentProjectService.project;
			this.libraries = librariesService.libraries;
		}

		run()
		{
			this.HTMLRendererService.render( this.currentProject ).then(( result:string )=>{
				this.$rootScope.$emit('uiLayout.update');
				this.compiledResult = 'data:text/html;base64,'+btoa( result );
				this.iframeSource = this.$sce.trustAsResourceUrl( this.compiledResult );
			})
		}



	}
	$di.checkDI( EditorController );
}



