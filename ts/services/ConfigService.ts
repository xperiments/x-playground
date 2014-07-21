/**
 * ConfigService.ts
 * Created by xperiments on 15/07/14.
 */
///<reference path="../reference.ts"/>
module io.xperiments.csseditor.services {




    export interface IFramework {
        url: string[];
        label: string;
        group: string;
    }

    export interface IJsWrapMap {
        onLoad: string;
        domready: string;
        wrap_in_head: string;
        wrap_in_body: string;
    }
    export interface IJSONConfig {
        js_wrap_map: IJsWrapMap;
        frameworks: IFramework[];
        endPoints: { [key: string]: string }
    }

    export class ConfigService {
        static $inject = [
            $di.$ng.$http,
            $di.$ng.$q
        ];
        frameworks: IFramework[];
        js_wrap_map: IJsWrapMap;
        endPoints: { [key: string]: string };
        constructor(
            private $http: ng.IHttpService
            , private $q: ng.IQService
            ) { }

        load(): ng.IPromise<IJSONConfig> {
            // http://stackoverflow.com/questions/18147126/angularjs-http-and-transformresponse
            return this.$http.get('/config/config.hson', {
                transformResponse: [(data, headersGetter) => { return JSON.parse(Hanson.toJSON(data)); }]

            }).then((data: ng.IHttpPromiseCallbackArg<IJSONConfig>) => {

                    this.endPoints = data.data.endPoints;
                    this.frameworks = data.data.frameworks;
                    this.js_wrap_map = data.data.js_wrap_map;

                    return { frameworks: data.data.frameworks, js_wrap_map: data.data.js_wrap_map };
                });
        }
    }

}
