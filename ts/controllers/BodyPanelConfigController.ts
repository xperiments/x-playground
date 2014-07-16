///<reference path="../reference.ts"/>
module io.xperiments.csseditor.controllers
{
	import CurrentProjectService = io.xperiments.csseditor.services.CurrentProjectService;
	export class BodyPanelConfigController extends PanelConfigController
	{
		static $inject = [
			$di.$ng.$rootScope,
			$di.$app.CurrentProjectService
		];
		constructor( $rootScope:ng.IRootScopeService, private currentProjectService:CurrentProjectService  )
		{
			super( $rootScope );
		}
		public toggleConfig()
		{
			this.showPanel = !this.showPanel;
		}
	}
}