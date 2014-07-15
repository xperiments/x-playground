///<reference path="../reference.ts"/>
module io.xperiments.csseditor.controllers
{

	import CurrentProjectService = io.xperiments.csseditor.services.CurrentProjectService;
	export class JsPanelConfigController extends PanelConfigController
	{
		renderMode:string = "javascript";
		static $inject = ["$rootScope","CurrentProjectService"];
		constructor( $rootScope:ng.IRootScopeService, private currentProjectService:CurrentProjectService  )
		{
			super( $rootScope );
		}
		/* override */
		public updateEditorRenderer()
		{
			this.editor.getSession().setMode( this.currentProjectService.project.options.jsRenderMode == "javascript" ? "ace/mode/javascript":"ace/mode/typescript");
		}
	}
}