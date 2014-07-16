/**
 * App.ts
 * Created by xperiments on 13/07/14.
 */
///<reference path="reference.ts"/>

import 	RenderDevices = io.xperiments.csseditor.models.RenderDevices;
var app:ng.IModule = angular.module('PulsarCodeEditor', ['ui.layout','ui.ace']);
app.controller(io.xperiments.csseditor.controllers);
app.service(io.xperiments.csseditor.services);
app.filter('unsafe', function($sce) {
	return function(val) {
		return $sce.trustAsHtml(val);
	};
});

app.filter(  { "pathFileName":()=>{
	return ( path:string )=>
	{
		return path.split('/').pop();
	}
}} );

// ADD DATA URL SUPPORT IN GENERATED DOWNLOAD LINKS
// https://docs.angularjs.org/api/ng/provider/$compileProvider
app.config( [
	'$compileProvider',
	function( $compileProvider )
	{
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|data):/);
		// Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
	}
]);

app.value('RenderDevices', new RenderDevices() );