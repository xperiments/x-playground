///<reference path="../reference.ts"/>
module io.xperiments.csseditor.controllers {

    import CurrentProjectService = io.xperiments.csseditor.services.CurrentProjectService;
    export class JsPanelConfigController extends PanelConfigController {
        renderMode: string = 'javascript';
        static $inject = [
            $di.$ng.$rootScope,
            $di.$app.CurrentProjectService
        ];
        constructor($rootScope: ng.IRootScopeService, private currentProjectService: CurrentProjectService) {
            super($rootScope);
        }
        /* override */
        public updateEditorRenderer() {
            var mode = this.currentProjectService.project.options.jsRenderMode;
            this.editor
                .getSession()
                .setMode(mode === 'javascript' ? 'ace/mode/javascript' : 'ace/mode/typescript');
        }
    }
}
