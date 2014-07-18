/**
 * $di.app.ts
 * Created by xperiments on 16/07/14.
 */
///<reference path="reference.ts"/>
module $di {
    export class $app {
        static CurrentProjectService: string = null;
        static HTMLRendererService: string = null;
        static LibrariesService: string = null;
        static ConfigService: string = null;
        static ResourceLoaderService: string = null;
        static DropboxService: string = null;
    }
    $di.initStaticClass($app);
}
