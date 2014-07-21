///<reference path="../reference.ts"/>
module io.xperiments.csseditor.controllers {
    import HTMLRendererService = io.xperiments.csseditor.services.HTMLRendererService;
    import CurrentProjectService = io.xperiments.csseditor.services.CurrentProjectService;
    import GistService = io.xperiments.csseditor.services.GistService;
    import DropboxService = io.xperiments.csseditor.services.DropboxService;
    import ConfigService = io.xperiments.csseditor.services.ConfigService;
    import IJSONConfig = io.xperiments.csseditor.services.IJSONConfig;
    import IJsWrapMap = io.xperiments.csseditor.services.IJsWrapMap;
    import ILibrary = io.xperiments.csseditor.services.IFramework;
    import PlaygroundProject = io.xperiments.csseditor.models.PlaygroundProject;

    export class EditorController {

        public iframeSource: string = '';
        public compiledResult: string = '';

        public currentProject: PlaygroundProject;
        public frameworks: ILibrary[];
        public js_wrap_modes: IJsWrapMap;
        static $inject = [
            $di.$ng.$rootScope,
            $di.$ng.$sce,
            $di.$ng.$interpolate,
            $di.$ng.$q,
            $di.$app.HTMLRendererService,
            $di.$app.CurrentProjectService,
            $di.$app.ConfigService,
            $di.$app.DropboxService,
            $di.$app.GistService
        ];
        constructor(
            private $rootScope: ng.IRootScopeService
            , private $sce: ng.ISCEService
            , private $interpolate: ng.IInterpolateService
            , private $q: ng.IQService
            , private HTMLRendererService: HTMLRendererService
            , private currentProjectService: CurrentProjectService
            , private configService: ConfigService
            , private dropboxService: DropboxService
            , private gistService: GistService
            ) {
            this.currentProject = currentProjectService.project;
            this.configService.load().then((data: IJSONConfig) => {
                this.frameworks = data.frameworks;
                this.js_wrap_modes = data.js_wrap_map;
                this.HTMLRendererService.configLoaded();
            });



        }

        dropboxConnect() {
            this.dropboxService.authenticate();
        }
        gistPublish() {
            this.gistService.publish();
        }
        loadGist(raw_url: string) {
            this.gistService.loadGist(raw_url);
        }
        run() {
            this.HTMLRendererService.render(this.currentProject).then((result: string) => {
                this.$rootScope.$emit('uiLayout.update');
                this.compiledResult = 'data:text/html;base64,' + btoa(result);
                this.iframeSource = this.$sce.trustAsResourceUrl(this.compiledResult);
            });
        }

        /*
        setLayout() {
            var dragBars = angular.element(document.getElementsByClassName('ui-splitbar')).each((el) => { console.log(el) });

        }*/


    }
    $di.checkDI(EditorController);
}



