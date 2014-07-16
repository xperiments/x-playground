///<reference path="../reference.ts"/>
module io.xperiments.csseditor.controllers
{
	import CurrentProjectService = io.xperiments.csseditor.services.CurrentProjectService;
	export class CssPanelConfigController extends PanelConfigController
	{
		renderMode:string = "css";
		static $inject = [
			$di.$ng.$rootScope,
			$di.$app.CurrentProjectService
		];
		constructor( $rootScope:ng.IRootScopeService, private currentProjectService:CurrentProjectService  )
		{
			super( $rootScope );
		}
		/* override */
		public updateEditorRenderer()
		{
			this.editor.getSession().setMode( this.currentProjectService.project.options.cssRenderMode == "css" ? "ace/mode/css":"ace/mode/stylus");
		}

	}
}

//https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/devtools/front_end/toolbox/OverridesUI.js&q=%22Apple%20iPhone%22&type=cs&sq=package:chromium