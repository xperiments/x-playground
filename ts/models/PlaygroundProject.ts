///<reference path="../reference.ts"/>
module io.xperiments.csseditor.models {
    import Serializable = io.xperiments.utils.serialize.Serializable;
    import ISerializerHelper = io.xperiments.utils.serialize.ISerializerHelper;
    import Serializer = io.xperiments.utils.serialize.Serializer;
    import IFramework = io.xperiments.csseditor.services.IFramework;
    // import ConfigService = io.xperiments.csseditor.services.ConfigService;
    export class PlaygroundProjectOptions extends Serializable {
        public inlineFiles: boolean = false;
        public inlineProxyURL: string = '';
        public cssRenderMode: string = '';
        public jsRenderMode: string = '';

        public js_wrap_mode: string = '';
        public framework: IFramework = null;
    }

    export class PlaygroundProjectOptionsSerializer implements ISerializerHelper {
        '@serializer': string = null;

        public inlineFiles: boolean = null;
        public inlineProxyURL: string = null;
        public cssRenderMode: string = null;
        public jsRenderMode: string = null;

        public js_wrap_mode: string = null;
        public framework: IFramework = null;
        public set_framework( framework: IFramework ): string {
            return framework.label;
        }
        public get_framework( label: string ): IFramework {
            console.log('busco ' + label);
            // http://stackoverflow.com/questions/10490570/call-angular-js-from-legacy-code
            var configService =  (<ng.IAngularStatic><any>angular.element(document.body)).injector().get($di.$app.ConfigService);
            var framework = configService.frameworks.filter( (framework: IFramework) => {
                return framework.label === label;
            });
            return framework[0];
        }


    }
    export class PlaygroundProject extends Serializable {
        public css: string = '';
        public js: string = '';
        public body: string = '';

        public cssFiles: string[] = null;
        public jsFiles: string[] = null;

        public options: PlaygroundProjectOptions = null;

    }
    export class PlaygroundProjectSerializer implements ISerializerHelper {
        '@serializer': string = null;

        public css: string = null;
        public js: string = null;
        public body: string = null;

        public cssFiles: string[] = null;
        public jsFiles: string[] = null;

        public options: PlaygroundProjectOptions = null;
    }
    Serializer.registerClass(() => io.xperiments.csseditor.models.PlaygroundProjectOptions, PlaygroundProjectOptionsSerializer);
    Serializer.registerClass(() => io.xperiments.csseditor.models.PlaygroundProject, PlaygroundProjectSerializer);
}
