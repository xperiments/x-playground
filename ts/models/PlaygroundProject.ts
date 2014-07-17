///<reference path="../reference.ts"/>
module io.xperiments.csseditor.models
{
	import Serializable = io.xperiments.utils.serialize.Serializable;
	import ISerializerHelper = io.xperiments.utils.serialize.ISerializerHelper;
	import Serializer = io.xperiments.utils.serialize.Serializer;
	import IFramework = io.xperiments.csseditor.services.IFramework;
	export class PlaygroundProjectOptions extends Serializable
	{
		public inlineFiles:boolean = false;
		public inlineProxyURL:string = "";
		public cssRenderMode:string = "";
		public jsRenderMode:string = "";

		public js_wrap_mode:string = "";
		public framework:IFramework = null;
	}

	export class PlaygroundProjectOptionsSerializer implements ISerializerHelper
	{
		"@serializer":string = null;

		public inlineFiles:boolean = null;
		public inlineProxyURL:string = null;
		public cssRenderMode:string = null;
		public jsRenderMode:string = null;

		public js_wrap_mode:string = null;

	}
	export class PlaygroundProject extends Serializable
	{
		public css:string = "";
		public js:string = "";
		public body:string = "";

		public cssFiles:string[];
		public jsFiles:string[];

		public options:PlaygroundProjectOptions;

	}
	export class PlaygroundProjectSerializer implements ISerializerHelper
	{
		"@serializer":string = null;

		public css:string = null;
		public js:string = null;
		public body:string = null;

		public cssFiles:string[];
		public jsFiles:string[];

		public options:PlaygroundProjectOptions;
	}
	Serializer.registerClass(()=>io.xperiments.csseditor.models.PlaygroundProjectOptions , PlaygroundProjectOptionsSerializer );
	Serializer.registerClass(()=>io.xperiments.csseditor.models.PlaygroundProject , PlaygroundProjectSerializer );
}