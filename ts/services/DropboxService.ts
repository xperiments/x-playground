/**
 * ConfigService.ts
 * Created by xperiments on 15/07/14.
 */
///<reference path="../reference.ts"/>
module io.xperiments.csseditor.services {

    export class DropboxService {

        private _dropBox: Dropbox.Client;
        private _isAuthenticated: boolean = false;
        constructor() {
            this._dropBox = new Dropbox.Client({ key: 'mize1oifvzi72sd' });
            this._dropBox.authenticate({ interactive: false }, (error: Dropbox.ApiError) => { this._onAuthFinish(error); });
            if (this._dropBox.isAuthenticated()) {
                alert('YES');
                this._isAuthenticated = true;
            }
        }
        public authenticate() {
            this._dropBox.authenticate();
        }

        private _onAuthFinish(error: Dropbox.ApiError) {
            if (error) { console.log(error); };
        }
    }
}
