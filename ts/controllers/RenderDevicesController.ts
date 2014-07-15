///<reference path="../reference.ts"/>
module io.xperiments.csseditor.controllers
{
	import CurrentProjectService = io.xperiments.csseditor.services.CurrentProjectService;
	export class RenderDevicesController
	{
		public responseModes:{[mode:string]:boolean} =
		{
			"full":true,
			"desktop":false,
			"tablet":false,
			"mobile":false
		};

		static $inject = ["$rootScope","CurrentProjectService"];
		constructor( $rootScope:ng.IRootScopeService, private currentProjectService:CurrentProjectService  )
		{

		}
		setResponsiveMode( mode:string )
		{
			Object.keys( this.responseModes ).forEach((key)=>{ this.responseModes[key]=false; });
			this.responseModes[ mode ] = true;
		}
	}
}