/**
 * ConfigService.ts
 * Created by xperiments on 15/07/14.
 */
///<reference path="../reference.ts"/>
module io.xperiments.csseditor.services
{


	import PlaygroundProject = io.xperiments.csseditor.models.PlaygroundProject;
	import ResourceLoaderService = io.xperiments.csseditor.services.ResourceLoaderService;
	import IResourceLoaderServiceResult = io.xperiments.csseditor.services.IResourceLoaderServiceResult;

	export interface IFramework
	{
		url:string[];
		label:string;
		group:string;
	}

	export interface IJsWrapMap
	{
		onLoad:string;
		domready:string;
		wrap_in_head:string;
		wrap_in_body:string;
	}
	export interface IJSONConfig
	{
		js_wrap_map:IJsWrapMap;
		frameworks:IFramework[];
	}

	export class ConfigService
	{
		static $inject = [
			$di.$ng.$http,
			$di.$ng.$q
		];
		frameworks:IFramework[];
		js_wrap_map:IJsWrapMap;
		constructor(
			 private $http:ng.IHttpService
			,private $q:ng.IQService
		){}

		load():ng.IPromise<IJSONConfig>
		{
			return this.$http.get('/config/config.json').then( ( data:ng.IHttpPromiseCallbackArg<IJSONConfig> )=>{

				this.frameworks = data.data.frameworks;
				this.js_wrap_map = data.data.js_wrap_map;
				return data.data;
			})
		}
	}
}
