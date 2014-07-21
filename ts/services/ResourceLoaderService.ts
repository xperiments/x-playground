/**
 * ResourceLoader.ts
 * Created by xperiments on 13/07/14.
 */
///<reference path="../reference.ts"/>
module io.xperiments.csseditor.services {
    export interface IResourceLoaderServiceResult {
        /**
         * @key fileName of the loaded resource
         * @value base64 representation of the file
         */
        [key: string]: string;
    }
    export class ResourceLoaderService {
        static $inject = [
            $di.$ng.$http,
            $di.$ng.$q
        ];
        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {

        }
        load(urls: string[], proxyURL: string): ng.IPromise<IResourceLoaderServiceResult> {
            var promises: ng.IHttpPromise<any>[] = [];
            urls.forEach((url) => { console.log(url); promises.push(this.$http.get(proxyURL + url)); });

            return this.$q.all(promises).then((results: ng.IHttpPromiseCallbackArg<any>[]) => {
                var fileMaps: IResourceLoaderServiceResult = {};
                results.forEach((fileData: ng.IHttpPromiseCallbackArg<any>) => {
                    fileMaps[fileData.config.url] = btoa(fileData.data);
                });
                return fileMaps;

            });
        }
    }
}
