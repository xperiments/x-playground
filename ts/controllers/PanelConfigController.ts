/**
 * PanelConfigController.ts
 * Created by xperiments on 14/07/14.
 */
///<reference path="../reference.ts"/>
module io.xperiments.csseditor.controllers
{
	export class PanelConfigController
	{
		public editor:AceAjax.Editor;
		public showPanel:boolean = false;
		public renderMode:string;
		static $inject=["$rootScope"];
		constructor(private $rootScope:ng.IRootScopeService)
		{

		}
		public editorLoaded = ( editor:AceAjax.Editor ) =>
		{
			this._editorLoaded( editor );
		};
		private _editorLoaded = (editor:AceAjax.Editor) =>
		{
			if (!this.editor)
			{
				this.editor = editor;
				editor['setOptions']({
					enableBasicAutocompletion: true,
					enableSnippets           : true,
					enableLiveAutocompletion : true
				});
				this.$rootScope.$on('ui-layout.resize', ()=>
				{
					editor.resize();
				})
				editor.resize();
			}
		};

		public toggleConfig()
		{
			this.showPanel = !this.showPanel;
			!this.showPanel && this.updateEditorRenderer();
		}

		moveFileOrder(  key:number, table:any[], dir:number  )
		{
			if( ( dir==1 && key+1 == table.length+1) ||  ( dir==-1 && key-1 <0 )  ) return;
			var source = table[key];
			var swap = table[key+dir];
			table[key] = swap;
			table[key+dir] = source;
		}
		removeFile( table:any[], id:number )
		{
			table.splice( id,1 );
		}
		addFile( table:any[], file:string="" )
		{
			if( file!="" && table.indexOf( file )==-1 )
			{
				table.push( file );
			}
		}
		public updateEditorRenderer()
		{
		}
	}
}