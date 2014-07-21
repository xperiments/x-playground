/**
 * GistService.ts
 * Created by xperiments on 21/07/14.
 */
///<reference path='../reference.ts'/>
module io.xperiments.csseditor.services {



    interface IGistCreateFiles {
        [file: string]: { content: string };
    }
    interface IGistCreateData {
        description: string;
        public: boolean;
        files: { [file: string]: { content: string } };
    }
    export class GistService {

        static $inject = [
            $di.$ng.$http,
            $di.$app.ConfigService,
            $di.$app.CurrentProjectService
        ];
        constructor(private $http: ng.IHttpService, private configService: ConfigService, private currentProjectService: CurrentProjectService) {

        }
        publish() {
            var playgroundProject = this.currentProjectService.project;
            var serialized: string = playgroundProject.stringify(false);
            var data: IGistCreateData = {
                description: 'x-playground anonymous gist save test',
                public: true,
                files: {
                    'x-playground.xpl': {
                        content: serialized
                    }
                }
            };
            this.$http.post(this.configService.endPoints['gist'], data).then((data) => { console.log(data); });
        }
        loadGist(raw_url: string) {
            this.$http.jsonp( 'https://api.github.com/gists/' + raw_url + '?callback=JSON_CALLBACK' ).success( (data: any) => {
                alert(1);
                console.log( typeof data.data.files['x-playground.xpl'].content );
                this.currentProjectService.project.parse( data.data.files['x-playground.xpl'].content );
            });
        }
    }
}
