/**
 * HTMLRendererService.ts
 * Created by xperiments on 14/07/14.
 */
///<reference path="../reference.ts"/>

module io.xperiments.csseditor.services
{
	import PlaygroundProject = io.xperiments.csseditor.models.PlaygroundProject;
	import PlaygroundProjectOptions = io.xperiments.csseditor.models.PlaygroundProjectOptions;
	export class CurrentProjectService
	{
		public project:PlaygroundProject;
		constructor()
		{
			this.newProject();
		}
		newProject()
		{
			this.project = new PlaygroundProject();
			this.project.cssFiles = [];
			this.project.jsFiles = [];
			this.project.options = new PlaygroundProjectOptions();
			this.project.options.cssRenderMode = "css";
			this.project.options.jsRenderMode = "javascript";
			this.project.options.js_wrap_mode = "onLoad";
			this.project.options.inlineFiles = false;
			this.project.options.inlineProxyURL = "http://cors-anywhere.herokuapp.com/";
		}
	}
}
