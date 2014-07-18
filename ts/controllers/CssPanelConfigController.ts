///<reference path="../reference.ts"/>
module io.xperiments.csseditor.controllers {
    import CurrentProjectService = io.xperiments.csseditor.services.CurrentProjectService;
    export class CssPanelConfigController extends PanelConfigController {
        renderMode: string = 'css';
        static $inject = [
            $di.$ng.$rootScope,
            $di.$app.CurrentProjectService
        ];
        constructor($rootScope: ng.IRootScopeService, private currentProjectService: CurrentProjectService) {
            super($rootScope);
        }
        /* override */
        public updateEditorRenderer() {
            var mode = this.currentProjectService.project.options.cssRenderMode;
            this.editor
                .getSession()
                .setMode(mode === 'css' ? 'ace/mode/css' : 'ace/mode/stylus');
        }

    }
}

