///<reference path="../reference.ts"/>
module io.xperiments.csseditor.controllers
{
	import HTMLRendererService = io.xperiments.csseditor.services.HTMLRendererService;
	import CurrentProjectService = io.xperiments.csseditor.services.CurrentProjectService;
	import ConfigService = io.xperiments.csseditor.services.ConfigService;
	import IJSONConfig = io.xperiments.csseditor.services.IJSONConfig;
	import IJsWrapMap = io.xperiments.csseditor.services.IJsWrapMap;
	import ILibrary = io.xperiments.csseditor.services.IFramework;
	import PlaygroundProject = io.xperiments.csseditor.models.PlaygroundProject;
	import PlaygroundProjectOptions = io.xperiments.csseditor.models.PlaygroundProjectOptions;

	export class EditorController
	{

		public iframeSource:string ="";
		public compiledResult:string ="";

		public currentProject:PlaygroundProject;
		public frameworks:ILibrary[];
		public js_wrap_modes:IJsWrapMap;
		static $inject=[
			$di.$ng.$rootScope,
			$di.$ng.$sce,
			$di.$ng.$interpolate,
			$di.$ng.$q,
			$di.$app.HTMLRendererService,
			$di.$app.CurrentProjectService,
			$di.$app.ConfigService,
		];
		constructor(
			 private $rootScope:ng.IRootScopeService
			,private $sce:ng.ISCEService
			,private $interpolate:ng.IInterpolateService
			,private $q:ng.IQService
			,private HTMLRendererService:HTMLRendererService
			,private currentProjectService:CurrentProjectService
			,private configService:ConfigService
		)
		{
			this.currentProject = currentProjectService.project;
			this.configService.load().then(( data:IJSONConfig)=>{
				this.frameworks = data.frameworks;
				this.js_wrap_modes = data.js_wrap_map;
				this.HTMLRendererService.configLoaded();
			});
		}

		run()
		{
			this.HTMLRendererService.render( this.currentProject ).then(( result:string )=>{
				this.$rootScope.$emit('uiLayout.update');
				this.compiledResult = 'data:text/html;base64,'+btoa( result );
				this.iframeSource = this.$sce.trustAsResourceUrl( this.compiledResult );
			})
		}

		setLayout()
		{
			var dragBars = angular.element(document.getElementsByClassName('ui-splitbar')).each((el)=>{ console.log(el)});

		}


	}
	$di.checkDI( EditorController );
}



