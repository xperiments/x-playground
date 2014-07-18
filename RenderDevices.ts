/**
 * Created by pedro.casaubon on 15/07/14.
 */


module io.xperiments.csseditor.models {

    /*
    export interface IDevices {
        tablets: IDevice[];
        phones: IDevice[];
        notebooks: IDevice[];
    }

    export interface IDevice {
        title: string;
        width: number;
        height: number;
        deviceScaleFactor: number;
        userAgent: string;
        touch: boolean;
        mobile: boolean;
    }

    export class RenderDevices implements IDevices {
        tablets: IDevice[];
        phones: IDevice[];
        notebooks: IDevice[];
        constructor() {

            this.tablets =
            [
                { title: 'Amazon Kindle Fire HDX 7″', width: 1920, height: 1200, deviceScaleFactor: 2, userAgent: 'Mozilla/5.0 (Linux; U; en-us; KFTHWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.13 Safari/535.19 Silk-Accelerated=true', touch: true, mobile: true },
                { title: 'Amazon Kindle Fire HDX 8.9″', width: 2560, height: 1600, deviceScaleFactor: 2, userAgent: 'Mozilla/5.0 (Linux; U; en-us; KFAPWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.13 Safari/535.19 Silk-Accelerated=true', touch: true, mobile: true },
                { title: 'Amazon Kindle Fire (First Generation)', width: 1024, height: 600, deviceScaleFactor: 1, userAgent: 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us; Silk/1.0.141.16-Gen4_11004310) AppleWebkit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16 Silk-Accelerated=true', touch: true, mobile: true },
                { title: 'Apple iPad 1 / 2 / iPad Mini', width: 1024, height: 768, deviceScaleFactor: 1, userAgent: 'Mozilla/5.0 (iPad; CPU OS 4_3_5 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8L1 Safari/6533.18.5', touch: true, mobile: true },
                { title: 'Apple iPad 3 / 4', width: 1024, height: 768, deviceScaleFactor: 2, userAgent: 'Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53', touch: true, mobile: true },
                { title: 'BlackBerry PlayBook', width: 1024, height: 600, deviceScaleFactor: 1, userAgent: 'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.1.0; en-US) AppleWebKit/536.2+ (KHTML like Gecko) Version/7.2.1.0 Safari/536.2+', touch: true, mobile: true },
                { title: 'Google Nexus 10', width: 1280, height: 800, deviceScaleFactor: 2, userAgent: 'Mozilla/5.0 (Linux; Android 4.3; Nexus 10 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.72 Safari/537.36', touch: true, mobile: true },
                { title: 'Google Nexus 7 2', width: 960, height: 600, deviceScaleFactor: 2, userAgent: 'Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.72 Safari/537.36', touch: true, mobile: true },
                { title: 'Google Nexus 7', width: 966, height: 604, deviceScaleFactor: 1.325, userAgent: 'Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.72 Safari/537.36', touch: true, mobile: true },
                { title: 'Motorola Xoom, Xyboard', width: 1280, height: 800, deviceScaleFactor: 1, userAgent: 'Mozilla/5.0 (Linux; U; Android 3.0; en-us; Xoom Build/HRI39) AppleWebKit/525.10 (KHTML, like Gecko) Version/3.0.4 Mobile Safari/523.12.2', touch: true, mobile: true },
                { title: 'Samsung Galaxy Tab 7.7, 8.9, 10.1', width: 1280, height: 800, deviceScaleFactor: 1, userAgent: 'Mozilla/5.0 (Linux; U; Android 2.2; en-us; SCH-I800 Build/FROYO) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1', touch: true, mobile: true },
                { title: 'Samsung Galaxy Tab', width: 1024, height: 600, deviceScaleFactor: 1, userAgent: 'Mozilla/5.0 (Linux; U; Android 2.2; en-us; SCH-I800 Build/FROYO) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1', touch: true, mobile: true }
            ];
            this.phones =
            [
                { title: 'Apple iPhone 3GS', width: 320, height: 480, deviceScaleFactor: 1, userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5', touch: true, mobile: true },
                { title: 'Apple iPhone 4', width: 320, height: 480, deviceScaleFactor: 2, userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5', touch: true, mobile: true },
                { title: 'Apple iPhone 5', width: 320, height: 568, deviceScaleFactor: 2, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53', touch: true, mobile: true },
                { title: 'BlackBerry Z10', width: 384, height: 640, deviceScaleFactor: 2, userAgent: 'Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+', touch: true, mobile: true },
                { title: 'BlackBerry Z30', width: 360, height: 640, deviceScaleFactor: 2, userAgent: 'Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+', touch: true, mobile: true },
                { title: 'Google Nexus 4', width: 384, height: 640, deviceScaleFactor: 2, userAgent: 'Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 4 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19', touch: true, mobile: true },
                { title: 'Google Nexus 5', width: 360, height: 640, deviceScaleFactor: 3, userAgent: 'Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 5 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19', touch: true, mobile: true },
                { title: 'Google Nexus S', width: 320, height: 533, deviceScaleFactor: 1.5, userAgent: 'Mozilla/5.0 (Linux; U; Android 2.3.4; en-us; Nexus S Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1', touch: true, mobile: true },
                { title: 'HTC Evo, Touch HD, Desire HD, Desire', width: 320, height: 533, deviceScaleFactor: 1.5, userAgent: 'Mozilla/5.0 (Linux; U; Android 2.2; en-us; Sprint APA9292KT Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1', touch: true, mobile: true },
                { title: 'HTC One X, EVO LTE', width: 360, height: 640, deviceScaleFactor: 2, userAgent: 'Mozilla/5.0 (Linux; Android 4.0.3; HTC One X Build/IML74K) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19', touch: true, mobile: true },
                { title: 'HTC Sensation, Evo 3D', width: 360, height: 640, deviceScaleFactor: 1.5, userAgent: 'Mozilla/5.0 (Linux; U; Android 4.0.3; en-us; HTC Sensation Build/IML74K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30', touch: true, mobile: true },
                { title: 'LG Optimus 2X, Optimus 3D, Optimus Black', width: 320, height: 533, deviceScaleFactor: 1.5, userAgent: 'Mozilla/5.0 (Linux; U; Android 2.2; en-us; LG-P990/V08c Build/FRG83) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1 MMS/LG-Android-MMS-V1.0/1.2', touch: true, mobile: true },
                { title: 'LG Optimus G', width: 384, height: 640, deviceScaleFactor: 2, userAgent: 'Mozilla/5.0 (Linux; Android 4.0; LG-E975 Build/IMM76L) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19', touch: true, mobile: true },
                { title: 'LG Optimus LTE, Optimus 4X HD', width: 424, height: 753, deviceScaleFactor: 1.7, userAgent: 'Mozilla/5.0 (Linux; U; Android 2.3; en-us; LG-P930 Build/GRJ90) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1', touch: true, mobile: true },
                { title: 'LG Optimus One', width: 213, height: 320, deviceScaleFactor: 1.5, userAgent: 'Mozilla/5.0 (Linux; U; Android 2.2.1; en-us; LG-MS690 Build/FRG83) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1', touch: true, mobile: true },
                { title: 'Motorola Defy, Droid, Droid X, Milestone', width: 320, height: 569, deviceScaleFactor: 1.5, userAgent: 'Mozilla/5.0 (Linux; U; Android 2.0; en-us; Milestone Build/ SHOLS_U2_01.03.1) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17', touch: true, mobile: true },
                { title: 'Motorola Droid 3, Droid 4, Droid Razr, Atrix 4G, Atrix 2', width: 540, height: 960, deviceScaleFactor: 1, userAgent: 'Mozilla/5.0 (Linux; U; Android 2.2; en-us; Droid Build/FRG22D) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1', touch: true, mobile: true },
                { title: 'Motorola Droid Razr HD', width: 720, height: 1280, deviceScaleFactor: 1, userAgent: 'Mozilla/5.0 (Linux; U; Android 2.3; en-us; DROID RAZR 4G Build/6.5.1-73_DHD-11_M1-29) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1', touch: true, mobile: true },
                { title: 'Nokia C5, C6, C7, N97, N8, X7', width: 360, height: 640, deviceScaleFactor: 1, userAgent: 'NokiaN97/21.1.107 (SymbianOS/9.4; Series60/5.0 Mozilla/5.0; Profile/MIDP-2.1 Configuration/CLDC-1.1) AppleWebkit/525 (KHTML, like Gecko) BrowserNG/7.1.4', touch: true, mobile: true },
                { title: 'Nokia Lumia 7X0, Lumia 8XX, Lumia 900, N800, N810, N900', width: 320, height: 533, deviceScaleFactor: 1.5, userAgent: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 820)', touch: true, mobile: true },
                { title: 'Samsung Galaxy Note 3', width: 540, height: 960, deviceScaleFactor: 2, userAgent: 'Mozilla/5.0 (Linux; U; Android 4.3; en-us; SM-N900T Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30', touch: true, mobile: true },
                { title: 'Samsung Galaxy Note II', width: 360, height: 640, deviceScaleFactor: 2, userAgent: 'Mozilla/5.0 (Linux; U; Android 4.1; en-us; GT-N7100 Build/JRO03C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30', touch: true, mobile: true },
                { title: 'Samsung Galaxy Note', width: 400, height: 640, deviceScaleFactor: 2, userAgent: 'Mozilla/5.0 (Linux; U; Android 2.3; en-us; SAMSUNG-SGH-I717 Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1', touch: true, mobile: true },
                { title: 'Samsung Galaxy S III, Galaxy Nexus', width: 360, height: 640, deviceScaleFactor: 2, userAgent: 'Mozilla/5.0 (Linux; U; Android 4.0; en-us; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30', touch: true, mobile: true },
                { title: 'Samsung Galaxy S, S II, W', width: 320, height: 533, deviceScaleFactor: 1.5, userAgent: 'Mozilla/5.0 (Linux; U; Android 2.1; en-us; GT-I9000 Build/ECLAIR) AppleWebKit/525.10+ (KHTML, like Gecko) Version/3.0.4 Mobile Safari/523.12.2', touch: true, mobile: true },
                { title: 'Samsung Galaxy S4', width: 360, height: 640, deviceScaleFactor: 3, userAgent: 'Mozilla/5.0 (Linux; Android 4.2.2; GT-I9505 Build/JDQ39) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.59 Mobile Safari/537.36', touch: true, mobile: true },
                { title: 'Sony Xperia S, Ion', width: 360, height: 640, deviceScaleFactor: 2, userAgent: 'Mozilla/5.0 (Linux; U; Android 4.0; en-us; LT28at Build/6.1.C.1.111) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30', touch: true, mobile: true },
                { title: 'Sony Xperia Sola, U', width: 480, height: 854, deviceScaleFactor: 1, userAgent: 'Mozilla/5.0 (Linux; U; Android 2.3; en-us; SonyEricssonST25i Build/6.0.B.1.564) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1', touch: true, mobile: true },
                { title: 'Sony Xperia Z, Z1', width: 360, height: 640, deviceScaleFactor: 3, userAgent: 'Mozilla/5.0 (Linux; U; Android 4.2; en-us; SonyC6903 Build/14.1.G.1.518) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30', touch: true, mobile: true }
            ];
            this.notebooks =
            [
                { title: 'Notebook with touch', width: 1280, height: 950, deviceScaleFactor: 1, userAgent: '', touch: true, mobile: false },
                { title: 'Notebook with HiDPI screen', width: 1440, height: 900, deviceScaleFactor: 2, userAgent: '', touch: false, mobile: false },
                { title: 'Generic notebook', width: 1280, height: 800, deviceScaleFactor: 1, userAgent: '', touch: false, mobile: false }
            ];

        }
    }*/

}