///<reference path="../reference.ts"/>
module io.xperiments.csseditor.controllers
{
	import HTMLRendererService = io.xperiments.csseditor.services.HTMLRendererService;
	import CurrentProjectService = io.xperiments.csseditor.services.CurrentProjectService;
	import LibrariesService = io.xperiments.csseditor.services.LibrariesService;
	import ILibrary = io.xperiments.csseditor.services.ILibrary;
	import PlaygroundProject = io.xperiments.csseditor.models.PlaygroundProject;
	import PlaygroundProjectOptions = io.xperiments.csseditor.models.PlaygroundProjectOptions;

	export class EditorController
	{


		public iframeSource:string ="";
		public compiledResult:string ="";



		public renderers:{ css:string; js:string } = { css:'css',js:'javascript' };
		public cssFiles:string[] = [];
		public jsFiles:string[] = [];
		public currentProject:PlaygroundProject;
		public libraries:ILibrary[];
		static $inject=["$scope","$rootScope","$sce","$interpolate","$q","HTMLRendererService","CurrentProjectService","LibrariesService"];
		constructor(
			 private $scope
			,private $rootScope:ng.IRootScopeService
			,private $sce:ng.ISCEService
			,private $interpolate:ng.IInterpolateService
			,private $q:ng.IQService
			,private HTMLRendererService:HTMLRendererService
			,private currentProjectService:CurrentProjectService
			,private librariesService:LibrariesService
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
}



