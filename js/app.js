var BodyWrapTemplateView;
(function (BodyWrapTemplateView) {
    BodyWrapTemplateView.html = '<!DOCTYPE html><html><head lang="en">	<meta charset="UTF-8">	<title></title>	{{styles}}	{{scripts}}	<style>{{css}}</style></head><body>{{body}}<script type="text/javascript">	{{js}}</script></body></html>';
})(BodyWrapTemplateView || (BodyWrapTemplateView = {}));
var DomReadyTemplateView;
(function (DomReadyTemplateView) {
    DomReadyTemplateView.html = '<!DOCTYPE html><html><head lang="en">	<meta charset="UTF-8">	<title></title>	{{styles}}	{{scripts}}	<style>{{css}}</style>	<script type="text/javascript">	var VanillaRunOnDomReady = function() {		{{js}}	};	var alreadyrunflag = 0;	if (document.addEventListener)		document.addEventListener("DOMContentLoaded", function(){			alreadyrunflag=1;			VanillaRunOnDomReady();		}, false);	else if (document.all && !window.opera) {		document.write(\'<sc\'+\'cript type="text/javascript" id="contentloadtag" defer="defer" src="javascript:void(0)"><\/sc\'+\'ript>\');		var contentloadtag = document.getElementById("contentloadtag");		contentloadtag.onreadystatechange=function(){			if (this.readyState=="complete"){				alreadyrunflag=1;				VanillaRunOnDomReady();			}		}	}	window.onload = function(){		setTimeout("if (!alreadyrunflag){VanillaRunOnDomReady}", 0);	}	</script></head><body>{{body}}</body></html>';
})(DomReadyTemplateView || (DomReadyTemplateView = {}));
var HeadWrapTemplateView;
(function (HeadWrapTemplateView) {
    HeadWrapTemplateView.html = '<!DOCTYPE html><html><head lang="en">	<meta charset="UTF-8">	<title></title>	{{styles}}	{{scripts}}	<style>{{css}}</style>	<script type="text/javascript">{{js}}</script></head><body>{{body}}</body></html>';
})(HeadWrapTemplateView || (HeadWrapTemplateView = {}));
var LoadTemplateView;
(function (LoadTemplateView) {
    LoadTemplateView.html = '<!DOCTYPE html><html><head lang="en">	<meta charset="UTF-8">	<title></title>	{{styles}}	{{scripts}}	<style>{{css}}</style>	<script type="text/javascript">	window.onload=function(){		{{js}}	}	</script></head><body>{{body}}</body></html>';
})(LoadTemplateView || (LoadTemplateView = {}));
var PreviewView;
(function (PreviewView) {
    PreviewView.html = '<!DOCTYPE html><html><head lang="en">	<meta charset="UTF-8">	<title></title>	{{styles}}	{{scripts}}	<style>{{css}}</style></head><body>{{body}}<script>{{js}}</script></body></html>';
})(PreviewView || (PreviewView = {}));
var $di;
(function ($di) {
    var $ng = (function () {
        function $ng() {
        }
        $ng.$anchorScroll = null;
        $ng.$animate = null;
        $ng.$cacheFactory = null;
        $ng.$compile = null;
        $ng.$controller = null;
        $ng.$document = null;
        $ng.$filter = null;
        $ng.$http = null;
        $ng.$interpolate = null;
        $ng.$locale = null;
        $ng.$location = null;
        $ng.$parse = null;
        $ng.$q = null;
        $ng.$rootElement = null;
        $ng.$rootScope = null;
        $ng.$sce = null;
        $ng.$sceDelegate = null;
        $ng.$templateCache = null;
        $ng.$window = null;
        $ng.$exceptionHandler = null;
        $ng.$httpBackend = null;
        $ng.$interval = null;
        $ng.$log = null;
        $ng.$timeout = null;
        $ng.$resource = null;
        $ng.$sanitize = null;
        $ng.$swipe = null;

        $ng.$animateProvider = null;
        $ng.$compileProvider = null;
        $ng.$controllerProvider = null;
        $ng.$filterProvider = null;
        $ng.$httpProvider = null;
        $ng.$interpolateProvider = null;
        $ng.$locationProvider = null;
        $ng.$logProvider = null;
        $ng.$parseProvider = null;
        $ng.$rootScopeProvider = null;
        $ng.$sceDelegateProvider = null;
        $ng.$sceProvider = null;
        $ng.$exceptionHandlerProvider = null;
        $ng.$routeProvider = null;

        $ng.$injector = null;
        $ng.$provide = null;

        $ng.$cookieStore = null;
        $ng.$cookies = null;

        $ng.$route = null;
        $ng.$routeParams = null;

        $ng.$scope = null;
        $ng.$element = null;
        $ng.$attrs = null;
        $ng.$transclude = null;
        return $ng;
    })();
    $di.$ng = $ng;
    (function ($ng) {
        initStaticClass($ng);
    })($di.$ng || ($di.$ng = {}));
    var $ng = $di.$ng;

    var __dev_mode = false;
    function setDevelopment(devMode) {
        __dev_mode = devMode;
    }
    $di.setDevelopment = setDevelopment;

    function initStaticClass(Class) {
        Object.keys(Class).forEach(function (key) {
            (Class[key] === null) && (Class[key] = key);
        });
    }
    $di.initStaticClass = initStaticClass;
    function checkDI(Class) {
        if (!__dev_mode)
            return;

        var className = getClassName(Class);
        if (annotate(Class).toString().toLowerCase() != Class.$inject.toString().toLowerCase()) {
            var err = ("\n\nPlease check the injection in class $className$\n\n").replace('$className$', className);
            throw new Error(err);
            return;
        }
        console.log('$di class checked: ' + className);
    }
    $di.checkDI = checkDI;
    ;

    function getClassName(Class) {
        return Class.toString().match(/function (.*)\(/)[1];
    }

    var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
    var FN_ARG_SPLIT = /,/;
    var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

    function annotate(fn) {
        var $inject;
        var fnText;
        var argDecl;

        if (typeof fn == 'function') {
            $inject = [];
            if (fn.length) {
                fnText = fn.toString().replace(STRIP_COMMENTS, '');
                argDecl = fnText.match(FN_ARGS);
                argDecl[1].split(FN_ARG_SPLIT).forEach(function (arg) {
                    arg.replace(FN_ARG, function (all, underscore, name) {
                        $inject.push(name);
                    });
                });
            }
        }
        return $inject;
    }
})($di || ($di = {}));
$di.setDevelopment(true);
var $di;
(function ($di) {
    var $app = (function () {
        function $app() {
        }
        $app.CurrentProjectService = null;
        $app.HTMLRendererService = null;
        $app.LibrariesService = null;
        $app.ConfigService = null;
        $app.ResourceLoaderService = null;
        return $app;
    })();
    $di.$app = $app;
    $di.initStaticClass($app);
})($di || ($di = {}));
var io;
(function (io) {
    (function (xperiments) {
        (function (utils) {
            (function (serialize) {
                

                

                

                

                var SerializerHelper = (function () {
                    function SerializerHelper() {
                    }
                    return SerializerHelper;
                })();
                serialize.SerializerHelper = SerializerHelper;

                var Serializable = (function () {
                    function Serializable() {
                    }
                    Serializable.prototype.writeObject = function () {
                        return Serializer.writeObject(this);
                    };

                    Serializable.prototype.readObject = function (obj) {
                        return Serializer.readObject(this, obj);
                    };

                    Serializable.prototype.stringify = function (pretty) {
                        if (typeof pretty === "undefined") { pretty = false; }
                        return JSON.stringify(Serializer.writeObject(this), null, pretty ? 4 : 0);
                    };

                    Serializable.prototype.parse = function (string) {
                        Serializer.readObject(this, JSON.parse(string));
                    };
                    return Serializable;
                })();
                serialize.Serializable = Serializable;

                var Serializer = (function () {
                    function Serializer() {
                    }
                    Serializer.registerClass = function (classContext, SerializerDataClass) {
                        var classPath = /return ([A-Za-z0-9_$.]*)/g.exec(classContext.toString())[1];

                        if (Serializer.serializableRegisters[classPath]) {
                            throw new Error('Class ' + classPath + ' already registered');
                        }

                        Serializer.getClassFromPath(classPath).prototype['@serializable'] = classPath;

                        Serializer.serializableRegisters[classPath] = {
                            keys: Serializer.getMixedNames(SerializerDataClass),
                            serializerData: SerializerDataClass
                        };
                    };

                    Serializer.writeObject = function (instance) {
                        var obj = {};
                        var register = Serializer.getSerializableRegister(instance);
                        register.keys.forEach(function (key) {
                            var value = instance[key];
                            if (!value && !Serializer.isNumeric(value))
                                return;
                            Serializer.writeAny(obj, key, value, register.serializerData);
                        });
                        return obj;
                    };

                    Serializer.readObject = function (instance, obj) {
                        var register = Serializer.getSerializableRegister(instance);
                        Serializer.getSerializableRegister(instance).keys.forEach(function (key) {
                            return Serializer.readAny(obj[key], key, instance, register.serializerData);
                        });
                        return instance;
                    };

                    Serializer.writeArray = function (array) {
                        var dummyObjectArray = { array: [] };
                        array.forEach(function (value, i) {
                            return Serializer.writeAny(dummyObjectArray.array, i, value, Serializer.getSerializableRegisterData(value));
                        });
                        return dummyObjectArray.array;
                    };

                    Serializer.writeAny = function (obj, key, value, SerializerDataClass, fromArray) {
                        if (typeof SerializerDataClass === "undefined") { SerializerDataClass = null; }
                        if (typeof fromArray === "undefined") { fromArray = false; }
                        if (SerializerDataClass && typeof SerializerDataClass.prototype["set_" + key] == "function") {
                            obj[key] = SerializerDataClass.prototype["set_" + key](value);
                            return;
                        }

                        var elementType = typeof value;

                        switch (true) {
                            case elementType == "boolean":
                            case elementType == "string":
                            case elementType == "number":
                                obj[key] = value;
                                break;
                            case Array.isArray(value):
                                obj[key] = Serializer.writeArray(value);
                                break;
                            case elementType == "object" && !Array.isArray(value):
                                obj[key] = Serializer.isExternalizable(value) ? Serializer.writeObject(value) : JSON.parse(JSON.stringify(value));
                                break;
                        }
                    };

                    Serializer.readArray = function (array) {
                        var resultArray = [];

                        array.forEach(function (element, i) {
                            Serializer.readAny(element, i, resultArray, Serializer.getSerializableRegisterData(element));
                        });
                        return resultArray;
                    };

                    Serializer.readAny = function (element, key, target, SerializerDataClass) {
                        if (SerializerDataClass && typeof SerializerDataClass.prototype["get_" + key] == "function") {
                            target[key] = SerializerDataClass.prototype["get_" + key](element);
                            return;
                        }

                        var type = typeof element;
                        switch (true) {
                            case type == "boolean":
                            case type == "string":
                            case type == "number":
                                target[key] = element;
                                break;
                            case Array.isArray(element):
                                target[key] = Serializer.readArray(element);
                                break;
                            case type == "object" && !Array.isArray(element):
                                if (element.hasOwnProperty('@serializable')) {
                                    var moduleParts = element['@serializable'].split('.');
                                    var classPath = moduleParts.join('.');
                                    if (!target[key])
                                        target[key] = Serializer.getClass(classPath);
                                    target[key].readObject(element);
                                } else {
                                    target[key] = element;
                                }
                                break;
                        }
                    };

                    Serializer.getMixedNames = function (SerializerDataClass) {
                        return Object.getOwnPropertyNames(new SerializerDataClass()).concat("@serializable");
                    };

                    Serializer.isExternalizable = function (instance) {
                        return '@serializable' in instance && typeof instance.writeObject == "function" && typeof instance.readObject == "function";
                    };

                    Serializer.getClassFromPath = function (name, context) {
                        if (typeof context === "undefined") { context = window; }
                        name.split('.').forEach(function (ctx) {
                            return context = context[ctx];
                        });
                        return context;
                    };

                    Serializer.getClass = function (name, context) {
                        if (typeof context === "undefined") { context = window; }
                        name.split('.').forEach(function (ctx) {
                            return context = context[ctx];
                        });
                        return new context;
                    };

                    Serializer.getSerializableRegister = function (instance) {
                        var props = Serializer.serializableRegisters[instance['@serializable']] || null;
                        return props;
                    };

                    Serializer.getSerializableRegisterData = function (instance) {
                        var register = Serializer.getSerializableRegister(instance);
                        return register ? register.serializerData : null;
                    };

                    Serializer.isNumeric = function (n) {
                        return !isNaN(parseFloat(n)) && isFinite(n);
                    };
                    Serializer.serializableRegisters = {};
                    return Serializer;
                })();
                serialize.Serializer = Serializer;
            })(utils.serialize || (utils.serialize = {}));
            var serialize = utils.serialize;
        })(xperiments.utils || (xperiments.utils = {}));
        var utils = xperiments.utils;
    })(io.xperiments || (io.xperiments = {}));
    var xperiments = io.xperiments;
})(io || (io = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var io;
(function (io) {
    (function (xperiments) {
        (function (csseditor) {
            (function (models) {
                var Serializable = io.xperiments.utils.serialize.Serializable;

                var Serializer = io.xperiments.utils.serialize.Serializer;

                var PlaygroundProjectOptions = (function (_super) {
                    __extends(PlaygroundProjectOptions, _super);
                    function PlaygroundProjectOptions() {
                        _super.apply(this, arguments);
                        this.inlineFiles = false;
                        this.inlineProxyURL = "";
                        this.cssRenderMode = "";
                        this.jsRenderMode = "";
                        this.js_wrap_mode = "";
                        this.framework = null;
                    }
                    return PlaygroundProjectOptions;
                })(Serializable);
                models.PlaygroundProjectOptions = PlaygroundProjectOptions;

                var PlaygroundProjectOptionsSerializer = (function () {
                    function PlaygroundProjectOptionsSerializer() {
                        this["@serializer"] = null;
                        this.inlineFiles = null;
                        this.inlineProxyURL = null;
                        this.cssRenderMode = null;
                        this.jsRenderMode = null;
                        this.js_wrap_mode = null;
                    }
                    return PlaygroundProjectOptionsSerializer;
                })();
                models.PlaygroundProjectOptionsSerializer = PlaygroundProjectOptionsSerializer;
                var PlaygroundProject = (function (_super) {
                    __extends(PlaygroundProject, _super);
                    function PlaygroundProject() {
                        _super.apply(this, arguments);
                        this.css = "";
                        this.js = "";
                        this.body = "";
                    }
                    return PlaygroundProject;
                })(Serializable);
                models.PlaygroundProject = PlaygroundProject;
                var PlaygroundProjectSerializer = (function () {
                    function PlaygroundProjectSerializer() {
                        this["@serializer"] = null;
                        this.css = null;
                        this.js = null;
                        this.body = null;
                    }
                    return PlaygroundProjectSerializer;
                })();
                models.PlaygroundProjectSerializer = PlaygroundProjectSerializer;
                Serializer.registerClass(function () {
                    return io.xperiments.csseditor.models.PlaygroundProjectOptions;
                }, PlaygroundProjectOptionsSerializer);
                Serializer.registerClass(function () {
                    return io.xperiments.csseditor.models.PlaygroundProject;
                }, PlaygroundProjectSerializer);
            })(csseditor.models || (csseditor.models = {}));
            var models = csseditor.models;
        })(xperiments.csseditor || (xperiments.csseditor = {}));
        var csseditor = xperiments.csseditor;
    })(io.xperiments || (io.xperiments = {}));
    var xperiments = io.xperiments;
})(io || (io = {}));
var io;
(function (io) {
    (function (xperiments) {
        (function (csseditor) {
            (function (models) {
                var RenderDevices = (function () {
                    function RenderDevices() {
                        this.tablets = [
                            { title: "Amazon Kindle Fire HDX 7″", width: 1920, height: 1200, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (Linux; U; en-us; KFTHWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.13 Safari/535.19 Silk-Accelerated=true", touch: true, mobile: true },
                            { title: "Amazon Kindle Fire HDX 8.9″", width: 2560, height: 1600, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (Linux; U; en-us; KFAPWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.13 Safari/535.19 Silk-Accelerated=true", touch: true, mobile: true },
                            { title: "Amazon Kindle Fire (First Generation)", width: 1024, height: 600, deviceScaleFactor: 1, userAgent: "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us; Silk/1.0.141.16-Gen4_11004310) AppleWebkit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16 Silk-Accelerated=true", touch: true, mobile: true },
                            { title: "Apple iPad 1 / 2 / iPad Mini", width: 1024, height: 768, deviceScaleFactor: 1, userAgent: "Mozilla/5.0 (iPad; CPU OS 4_3_5 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8L1 Safari/6533.18.5", touch: true, mobile: true },
                            { title: "Apple iPad 3 / 4", width: 1024, height: 768, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53", touch: true, mobile: true },
                            { title: "BlackBerry PlayBook", width: 1024, height: 600, deviceScaleFactor: 1, userAgent: "Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.1.0; en-US) AppleWebKit/536.2+ (KHTML like Gecko) Version/7.2.1.0 Safari/536.2+", touch: true, mobile: true },
                            { title: "Google Nexus 10", width: 1280, height: 800, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (Linux; Android 4.3; Nexus 10 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.72 Safari/537.36", touch: true, mobile: true },
                            { title: "Google Nexus 7 2", width: 960, height: 600, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.72 Safari/537.36", touch: true, mobile: true },
                            { title: "Google Nexus 7", width: 966, height: 604, deviceScaleFactor: 1.325, userAgent: "Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.72 Safari/537.36", touch: true, mobile: true },
                            { title: "Motorola Xoom, Xyboard", width: 1280, height: 800, deviceScaleFactor: 1, userAgent: "Mozilla/5.0 (Linux; U; Android 3.0; en-us; Xoom Build/HRI39) AppleWebKit/525.10 (KHTML, like Gecko) Version/3.0.4 Mobile Safari/523.12.2", touch: true, mobile: true },
                            { title: "Samsung Galaxy Tab 7.7, 8.9, 10.1", width: 1280, height: 800, deviceScaleFactor: 1, userAgent: "Mozilla/5.0 (Linux; U; Android 2.2; en-us; SCH-I800 Build/FROYO) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1", touch: true, mobile: true },
                            { title: "Samsung Galaxy Tab", width: 1024, height: 600, deviceScaleFactor: 1, userAgent: "Mozilla/5.0 (Linux; U; Android 2.2; en-us; SCH-I800 Build/FROYO) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1", touch: true, mobile: true }
                        ];
                        this.phones = [
                            { title: "Apple iPhone 3GS", width: 320, height: 480, deviceScaleFactor: 1, userAgent: "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5", touch: true, mobile: true },
                            { title: "Apple iPhone 4", width: 320, height: 480, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5", touch: true, mobile: true },
                            { title: "Apple iPhone 5", width: 320, height: 568, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53", touch: true, mobile: true },
                            { title: "BlackBerry Z10", width: 384, height: 640, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+", touch: true, mobile: true },
                            { title: "BlackBerry Z30", width: 360, height: 640, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+", touch: true, mobile: true },
                            { title: "Google Nexus 4", width: 384, height: 640, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 4 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19", touch: true, mobile: true },
                            { title: "Google Nexus 5", width: 360, height: 640, deviceScaleFactor: 3, userAgent: "Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 5 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19", touch: true, mobile: true },
                            { title: "Google Nexus S", width: 320, height: 533, deviceScaleFactor: 1.5, userAgent: "Mozilla/5.0 (Linux; U; Android 2.3.4; en-us; Nexus S Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1", touch: true, mobile: true },
                            { title: "HTC Evo, Touch HD, Desire HD, Desire", width: 320, height: 533, deviceScaleFactor: 1.5, userAgent: "Mozilla/5.0 (Linux; U; Android 2.2; en-us; Sprint APA9292KT Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1", touch: true, mobile: true },
                            { title: "HTC One X, EVO LTE", width: 360, height: 640, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (Linux; Android 4.0.3; HTC One X Build/IML74K) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19", touch: true, mobile: true },
                            { title: "HTC Sensation, Evo 3D", width: 360, height: 640, deviceScaleFactor: 1.5, userAgent: "Mozilla/5.0 (Linux; U; Android 4.0.3; en-us; HTC Sensation Build/IML74K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30", touch: true, mobile: true },
                            { title: "LG Optimus 2X, Optimus 3D, Optimus Black", width: 320, height: 533, deviceScaleFactor: 1.5, userAgent: "Mozilla/5.0 (Linux; U; Android 2.2; en-us; LG-P990/V08c Build/FRG83) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1 MMS/LG-Android-MMS-V1.0/1.2", touch: true, mobile: true },
                            { title: "LG Optimus G", width: 384, height: 640, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (Linux; Android 4.0; LG-E975 Build/IMM76L) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19", touch: true, mobile: true },
                            { title: "LG Optimus LTE, Optimus 4X HD", width: 424, height: 753, deviceScaleFactor: 1.7, userAgent: "Mozilla/5.0 (Linux; U; Android 2.3; en-us; LG-P930 Build/GRJ90) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1", touch: true, mobile: true },
                            { title: "LG Optimus One", width: 213, height: 320, deviceScaleFactor: 1.5, userAgent: "Mozilla/5.0 (Linux; U; Android 2.2.1; en-us; LG-MS690 Build/FRG83) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1", touch: true, mobile: true },
                            { title: "Motorola Defy, Droid, Droid X, Milestone", width: 320, height: 569, deviceScaleFactor: 1.5, userAgent: "Mozilla/5.0 (Linux; U; Android 2.0; en-us; Milestone Build/ SHOLS_U2_01.03.1) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17", touch: true, mobile: true },
                            { title: "Motorola Droid 3, Droid 4, Droid Razr, Atrix 4G, Atrix 2", width: 540, height: 960, deviceScaleFactor: 1, userAgent: "Mozilla/5.0 (Linux; U; Android 2.2; en-us; Droid Build/FRG22D) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1", touch: true, mobile: true },
                            { title: "Motorola Droid Razr HD", width: 720, height: 1280, deviceScaleFactor: 1, userAgent: "Mozilla/5.0 (Linux; U; Android 2.3; en-us; DROID RAZR 4G Build/6.5.1-73_DHD-11_M1-29) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1", touch: true, mobile: true },
                            { title: "Nokia C5, C6, C7, N97, N8, X7", width: 360, height: 640, deviceScaleFactor: 1, userAgent: "NokiaN97/21.1.107 (SymbianOS/9.4; Series60/5.0 Mozilla/5.0; Profile/MIDP-2.1 Configuration/CLDC-1.1) AppleWebkit/525 (KHTML, like Gecko) BrowserNG/7.1.4", touch: true, mobile: true },
                            { title: "Nokia Lumia 7X0, Lumia 8XX, Lumia 900, N800, N810, N900", width: 320, height: 533, deviceScaleFactor: 1.5, userAgent: "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 820)", touch: true, mobile: true },
                            { title: "Samsung Galaxy Note 3", width: 540, height: 960, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (Linux; U; Android 4.3; en-us; SM-N900T Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30", touch: true, mobile: true },
                            { title: "Samsung Galaxy Note II", width: 360, height: 640, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (Linux; U; Android 4.1; en-us; GT-N7100 Build/JRO03C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30", touch: true, mobile: true },
                            { title: "Samsung Galaxy Note", width: 400, height: 640, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (Linux; U; Android 2.3; en-us; SAMSUNG-SGH-I717 Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1", touch: true, mobile: true },
                            { title: "Samsung Galaxy S III, Galaxy Nexus", width: 360, height: 640, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (Linux; U; Android 4.0; en-us; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30", touch: true, mobile: true },
                            { title: "Samsung Galaxy S, S II, W", width: 320, height: 533, deviceScaleFactor: 1.5, userAgent: "Mozilla/5.0 (Linux; U; Android 2.1; en-us; GT-I9000 Build/ECLAIR) AppleWebKit/525.10+ (KHTML, like Gecko) Version/3.0.4 Mobile Safari/523.12.2", touch: true, mobile: true },
                            { title: "Samsung Galaxy S4", width: 360, height: 640, deviceScaleFactor: 3, userAgent: "Mozilla/5.0 (Linux; Android 4.2.2; GT-I9505 Build/JDQ39) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.59 Mobile Safari/537.36", touch: true, mobile: true },
                            { title: "Sony Xperia S, Ion", width: 360, height: 640, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (Linux; U; Android 4.0; en-us; LT28at Build/6.1.C.1.111) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30", touch: true, mobile: true },
                            { title: "Sony Xperia Sola, U", width: 480, height: 854, deviceScaleFactor: 1, userAgent: "Mozilla/5.0 (Linux; U; Android 2.3; en-us; SonyEricssonST25i Build/6.0.B.1.564) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1", touch: true, mobile: true },
                            { title: "Sony Xperia Z, Z1", width: 360, height: 640, deviceScaleFactor: 3, userAgent: "Mozilla/5.0 (Linux; U; Android 4.2; en-us; SonyC6903 Build/14.1.G.1.518) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30", touch: true, mobile: true }
                        ];
                        this.notebooks = [
                            { title: "Notebook with touch", width: 1280, height: 950, deviceScaleFactor: 1, userAgent: "", touch: true, mobile: false },
                            { title: "Notebook with HiDPI screen", width: 1440, height: 900, deviceScaleFactor: 2, userAgent: "", touch: false, mobile: false },
                            { title: "Generic notebook", width: 1280, height: 800, deviceScaleFactor: 1, userAgent: "", touch: false, mobile: false }
                        ];
                    }
                    return RenderDevices;
                })();
                models.RenderDevices = RenderDevices;
            })(csseditor.models || (csseditor.models = {}));
            var models = csseditor.models;
        })(xperiments.csseditor || (xperiments.csseditor = {}));
        var csseditor = xperiments.csseditor;
    })(io.xperiments || (io.xperiments = {}));
    var xperiments = io.xperiments;
})(io || (io = {}));
var io;
(function (io) {
    (function (xperiments) {
        (function (csseditor) {
            (function (services) {
                var ResourceLoaderService = (function () {
                    function ResourceLoaderService($http, $q) {
                        this.$http = $http;
                        this.$q = $q;
                    }
                    ResourceLoaderService.prototype.load = function (urls, proxyURL) {
                        var _this = this;
                        var promises = [];
                        urls.forEach(function (url) {
                            console.log(url);
                            promises.push(_this.$http.get(proxyURL + url));
                        });

                        return this.$q.all(promises).then(function (results) {
                            var fileMaps = {};
                            results.forEach(function (fileData) {
                                fileMaps[fileData.config.url] = btoa(fileData.data);
                            });
                            return fileMaps;
                        });
                    };
                    ResourceLoaderService.$inject = [
                        $di.$ng.$http,
                        $di.$ng.$q
                    ];
                    return ResourceLoaderService;
                })();
                services.ResourceLoaderService = ResourceLoaderService;
            })(csseditor.services || (csseditor.services = {}));
            var services = csseditor.services;
        })(xperiments.csseditor || (xperiments.csseditor = {}));
        var csseditor = xperiments.csseditor;
    })(io.xperiments || (io.xperiments = {}));
    var xperiments = io.xperiments;
})(io || (io = {}));
var io;
(function (io) {
    (function (xperiments) {
        (function (csseditor) {
            (function (services) {
                var ConfigService = (function () {
                    function ConfigService($http, $q) {
                        this.$http = $http;
                        this.$q = $q;
                    }
                    ConfigService.prototype.load = function () {
                        var _this = this;
                        return this.$http.get('/config/config.json').then(function (data) {
                            _this.frameworks = data.data.frameworks;
                            _this.js_wrap_map = data.data.js_wrap_map;
                            return data.data;
                        });
                    };
                    ConfigService.$inject = [
                        $di.$ng.$http,
                        $di.$ng.$q
                    ];
                    return ConfigService;
                })();
                services.ConfigService = ConfigService;
            })(csseditor.services || (csseditor.services = {}));
            var services = csseditor.services;
        })(xperiments.csseditor || (xperiments.csseditor = {}));
        var csseditor = xperiments.csseditor;
    })(io.xperiments || (io.xperiments = {}));
    var xperiments = io.xperiments;
})(io || (io = {}));
var io;
(function (io) {
    (function (xperiments) {
        (function (csseditor) {
            (function (services) {
                var PlaygroundProject = io.xperiments.csseditor.models.PlaygroundProject;
                var PlaygroundProjectOptions = io.xperiments.csseditor.models.PlaygroundProjectOptions;
                var CurrentProjectService = (function () {
                    function CurrentProjectService() {
                        this.newProject();
                    }
                    CurrentProjectService.prototype.newProject = function () {
                        this.project = new PlaygroundProject();
                        this.project.cssFiles = [];
                        this.project.jsFiles = [];
                        this.project.options = new PlaygroundProjectOptions();
                        this.project.options.cssRenderMode = "css";
                        this.project.options.jsRenderMode = "javascript";
                        this.project.options.js_wrap_mode = "LoadTemplateView";
                        this.project.options.inlineFiles = false;
                        this.project.options.inlineProxyURL = "http://cors-anywhere.herokuapp.com/";
                    };
                    return CurrentProjectService;
                })();
                services.CurrentProjectService = CurrentProjectService;
            })(csseditor.services || (csseditor.services = {}));
            var services = csseditor.services;
        })(xperiments.csseditor || (xperiments.csseditor = {}));
        var csseditor = xperiments.csseditor;
    })(io.xperiments || (io.xperiments = {}));
    var xperiments = io.xperiments;
})(io || (io = {}));

var io;
(function (io) {
    (function (xperiments) {
        (function (csseditor) {
            (function (services) {
                var HTMLRendererService = (function () {
                    function HTMLRendererService($q, $interpolate, resourceLoaderService, configService) {
                        this.$q = $q;
                        this.$interpolate = $interpolate;
                        this.resourceLoaderService = resourceLoaderService;
                        this.configService = configService;
                        this.iframeTemplateRenderers = {};
                        this.tsCompiler = new TypeScript.TypeScriptCompiler();
                    }
                    HTMLRendererService.prototype.configLoaded = function () {
                        var _this = this;
                        Object.keys(this.configService.js_wrap_map).forEach(function (key) {
                            console.log(_this.configService.js_wrap_map[key]);
                            _this.iframeTemplateRenderers[_this.configService.js_wrap_map[key]] = _this.$interpolate(window[_this.configService.js_wrap_map[key]].html);
                        });
                    };

                    HTMLRendererService.prototype.render = function (project) {
                        var _this = this;
                        var allPromises = [this.renderCss(project), this.renderJs(project), this.renderBody(project)];

                        if (project.options.inlineFiles && project.options.inlineProxyURL != "") {
                            var frameworkFiles = this.getFrameworkFiles(project);
                            frameworkFiles.css.concat(project.cssFiles);
                            frameworkFiles.js.concat(project.jsFiles);
                            var filesToInline = [].concat(frameworkFiles.css).concat(frameworkFiles.js);
                            allPromises.push(this.resourceLoaderService.load(filesToInline, project.options.inlineProxyURL));
                        }

                        return this.$q.all(allPromises).then(function (results) {
                            var css = results[0];
                            var js = results[1];
                            var body = results[2];
                            var resourceResult = results[3];

                            return _this.renderPage(project, css, js, body, resourceResult);
                        });
                    };

                    HTMLRendererService.prototype.renderCss = function (project) {
                        var defer = this.$q.defer();
                        var promise = defer.promise;
                        if (project.options.cssRenderMode == "css") {
                            defer.resolve(project.css);
                            return promise;
                        }
                        stylus(project.css).render(function (err, css) {
                            err ? defer.reject("/*Stylus Error CHECK YOUR CODE*/") : defer.resolve(css);
                        });
                        return promise;
                    };
                    HTMLRendererService.prototype.renderJs = function (project) {
                        var defer = this.$q.defer();
                        var promise = defer.promise;
                        if (project.options.jsRenderMode == "javascript") {
                            defer.resolve(project.js);
                        }
                        this.tsCompiler && this.tsCompiler.removeFile("output.ts");
                        this.tsCompiler.addFile("output.ts", TypeScript.ScriptSnapshot.fromString(project.js), null, null, null);
                        var output = "";
                        var iter = this.tsCompiler.compile(null, null);
                        while (iter.moveNext()) {
                            var current = iter.current().outputFiles[0];
                            output += !!current ? current.text : '';
                        }
                        defer.resolve(output);
                        return promise;
                    };

                    HTMLRendererService.prototype.renderBody = function (project) {
                        var defer = this.$q.defer();
                        var promise = defer.promise;
                        defer.resolve(project.body);
                        return promise;
                    };

                    HTMLRendererService.prototype.renderPage = function (project, css, js, body, resourceResult) {
                        console.log('RAP', project.options.js_wrap_mode);
                        var frameworkFiles = this.getFrameworkFiles(project);
                        frameworkFiles.css.concat(project.cssFiles);
                        frameworkFiles.js.concat(project.jsFiles);

                        var htmlContext;
                        if (resourceResult) {
                            htmlContext = {
                                body: body,
                                css: css,
                                styles: frameworkFiles.css.map(function (cssFile) {
                                    return '<link rel="stylesheet" type="text/css" href="data:text/html;base64,' + resourceResult[project.options.inlineProxyURL + cssFile] + '"/>\n';
                                }).join(''),
                                js: js,
                                scripts: frameworkFiles.js.map(function (jsFile) {
                                    return '<script src="data:text/html;base64,' + resourceResult[project.options.inlineProxyURL + jsFile] + '"></script>\n';
                                }).join('')
                            };

                            return this.iframeTemplateRenderers[project.options.js_wrap_mode](htmlContext);
                        }

                        htmlContext = {
                            body: body,
                            css: css,
                            styles: frameworkFiles.css.map(function (cssFile) {
                                return '<link rel="stylesheet" type="text/css" href="' + cssFile + '"/>\n';
                            }).join(''),
                            js: js,
                            scripts: frameworkFiles.js.map(function (jsFile) {
                                return '<script src="' + jsFile + '"></script>\n';
                            }).join('')
                        };
                        return this.iframeTemplateRenderers[project.options.js_wrap_mode](htmlContext);
                    };

                    HTMLRendererService.prototype.getFrameworkFiles = function (project) {
                        var _this = this;
                        var resultFiles = {
                            css: [],
                            js: []
                        };
                        if (!project.options.framework)
                            return resultFiles;

                        var currentFrameworkFiles = project.options.framework.url;
                        var target;
                        currentFrameworkFiles.forEach(function (file) {
                            target = _this.getFileExtension(file) == "css" ? resultFiles.css : resultFiles.js;
                            target.push(file);
                        });
                        console.log(resultFiles);
                        return resultFiles;
                    };

                    HTMLRendererService.prototype.getFileExtension = function (url) {
                        return url.split('/').pop().split('.').pop();
                    };
                    HTMLRendererService.$inject = [
                        $di.$ng.$q,
                        $di.$ng.$interpolate,
                        $di.$app.ResourceLoaderService,
                        $di.$app.ConfigService
                    ];
                    return HTMLRendererService;
                })();
                services.HTMLRendererService = HTMLRendererService;
                $di.checkDI(HTMLRendererService);
            })(csseditor.services || (csseditor.services = {}));
            var services = csseditor.services;
        })(xperiments.csseditor || (xperiments.csseditor = {}));
        var csseditor = xperiments.csseditor;
    })(io.xperiments || (io.xperiments = {}));
    var xperiments = io.xperiments;
})(io || (io = {}));
var io;
(function (io) {
    (function (xperiments) {
        (function (csseditor) {
            (function (controllers) {
                var EditorController = (function () {
                    function EditorController($rootScope, $sce, $interpolate, $q, HTMLRendererService, currentProjectService, configService) {
                        var _this = this;
                        this.$rootScope = $rootScope;
                        this.$sce = $sce;
                        this.$interpolate = $interpolate;
                        this.$q = $q;
                        this.HTMLRendererService = HTMLRendererService;
                        this.currentProjectService = currentProjectService;
                        this.configService = configService;
                        this.iframeSource = "";
                        this.compiledResult = "";
                        this.currentProject = currentProjectService.project;
                        this.configService.load().then(function (data) {
                            _this.frameworks = data.frameworks;
                            _this.js_wrap_modes = data.js_wrap_map;
                            _this.HTMLRendererService.configLoaded();
                        });
                    }
                    EditorController.prototype.run = function () {
                        var _this = this;
                        this.HTMLRendererService.render(this.currentProject).then(function (result) {
                            _this.$rootScope.$emit('uiLayout.update');
                            _this.compiledResult = 'data:text/html;base64,' + btoa(result);
                            _this.iframeSource = _this.$sce.trustAsResourceUrl(_this.compiledResult);
                        });
                    };

                    EditorController.prototype.setLayout = function () {
                        var dragBars = angular.element(document.getElementsByClassName('ui-splitbar')).each(function (el) {
                            console.log(el);
                        });
                    };
                    EditorController.$inject = [
                        $di.$ng.$rootScope,
                        $di.$ng.$sce,
                        $di.$ng.$interpolate,
                        $di.$ng.$q,
                        $di.$app.HTMLRendererService,
                        $di.$app.CurrentProjectService,
                        $di.$app.ConfigService
                    ];
                    return EditorController;
                })();
                controllers.EditorController = EditorController;
                $di.checkDI(EditorController);
            })(csseditor.controllers || (csseditor.controllers = {}));
            var controllers = csseditor.controllers;
        })(xperiments.csseditor || (xperiments.csseditor = {}));
        var csseditor = xperiments.csseditor;
    })(io.xperiments || (io.xperiments = {}));
    var xperiments = io.xperiments;
})(io || (io = {}));
var io;
(function (io) {
    (function (xperiments) {
        (function (csseditor) {
            (function (controllers) {
                var PanelConfigController = (function () {
                    function PanelConfigController($rootScope) {
                        var _this = this;
                        this.$rootScope = $rootScope;
                        this.showPanel = false;
                        this.editorLoaded = function (editor) {
                            _this._editorLoaded(editor);
                        };
                        this._editorLoaded = function (editor) {
                            if (!_this.editor) {
                                _this.editor = editor;
                                editor['setOptions']({
                                    enableBasicAutocompletion: true,
                                    enableSnippets: true,
                                    enableLiveAutocompletion: true
                                });
                                _this.$rootScope.$on('ui-layout.resize', function () {
                                    editor.resize();
                                });
                                editor.resize();
                            }
                        };
                    }
                    PanelConfigController.prototype.toggleConfig = function () {
                        this.showPanel = !this.showPanel;
                        !this.showPanel && this.updateEditorRenderer();
                    };

                    PanelConfigController.prototype.moveFileOrder = function (key, table, dir) {
                        if ((dir == 1 && key + 1 == table.length + 1) || (dir == -1 && key - 1 < 0))
                            return;
                        var source = table[key];
                        var swap = table[key + dir];
                        table[key] = swap;
                        table[key + dir] = source;
                    };
                    PanelConfigController.prototype.removeFile = function (table, id) {
                        table.splice(id, 1);
                    };
                    PanelConfigController.prototype.addFile = function (table, file) {
                        if (typeof file === "undefined") { file = ""; }
                        if (file != "" && table.indexOf(file) == -1) {
                            table.push(file);
                        }
                    };
                    PanelConfigController.prototype.updateEditorRenderer = function () {
                    };
                    PanelConfigController.$inject = [
                        $di.$ng.$rootScope
                    ];
                    return PanelConfigController;
                })();
                controllers.PanelConfigController = PanelConfigController;
            })(csseditor.controllers || (csseditor.controllers = {}));
            var controllers = csseditor.controllers;
        })(xperiments.csseditor || (xperiments.csseditor = {}));
        var csseditor = xperiments.csseditor;
    })(io.xperiments || (io.xperiments = {}));
    var xperiments = io.xperiments;
})(io || (io = {}));
var io;
(function (io) {
    (function (xperiments) {
        (function (csseditor) {
            (function (controllers) {
                var BodyPanelConfigController = (function (_super) {
                    __extends(BodyPanelConfigController, _super);
                    function BodyPanelConfigController($rootScope, currentProjectService) {
                        _super.call(this, $rootScope);
                        this.currentProjectService = currentProjectService;
                    }
                    BodyPanelConfigController.prototype.toggleConfig = function () {
                        this.showPanel = !this.showPanel;
                    };
                    BodyPanelConfigController.$inject = [
                        $di.$ng.$rootScope,
                        $di.$app.CurrentProjectService
                    ];
                    return BodyPanelConfigController;
                })(controllers.PanelConfigController);
                controllers.BodyPanelConfigController = BodyPanelConfigController;
            })(csseditor.controllers || (csseditor.controllers = {}));
            var controllers = csseditor.controllers;
        })(xperiments.csseditor || (xperiments.csseditor = {}));
        var csseditor = xperiments.csseditor;
    })(io.xperiments || (io.xperiments = {}));
    var xperiments = io.xperiments;
})(io || (io = {}));
var io;
(function (io) {
    (function (xperiments) {
        (function (csseditor) {
            (function (controllers) {
                var CssPanelConfigController = (function (_super) {
                    __extends(CssPanelConfigController, _super);
                    function CssPanelConfigController($rootScope, currentProjectService) {
                        _super.call(this, $rootScope);
                        this.currentProjectService = currentProjectService;
                        this.renderMode = "css";
                    }
                    CssPanelConfigController.prototype.updateEditorRenderer = function () {
                        this.editor.getSession().setMode(this.currentProjectService.project.options.cssRenderMode == "css" ? "ace/mode/css" : "ace/mode/stylus");
                    };
                    CssPanelConfigController.$inject = [
                        $di.$ng.$rootScope,
                        $di.$app.CurrentProjectService
                    ];
                    return CssPanelConfigController;
                })(controllers.PanelConfigController);
                controllers.CssPanelConfigController = CssPanelConfigController;
            })(csseditor.controllers || (csseditor.controllers = {}));
            var controllers = csseditor.controllers;
        })(xperiments.csseditor || (xperiments.csseditor = {}));
        var csseditor = xperiments.csseditor;
    })(io.xperiments || (io.xperiments = {}));
    var xperiments = io.xperiments;
})(io || (io = {}));
var io;
(function (io) {
    (function (xperiments) {
        (function (csseditor) {
            (function (controllers) {
                var JsPanelConfigController = (function (_super) {
                    __extends(JsPanelConfigController, _super);
                    function JsPanelConfigController($rootScope, currentProjectService) {
                        _super.call(this, $rootScope);
                        this.currentProjectService = currentProjectService;
                        this.renderMode = "javascript";
                    }
                    JsPanelConfigController.prototype.updateEditorRenderer = function () {
                        this.editor.getSession().setMode(this.currentProjectService.project.options.jsRenderMode == "javascript" ? "ace/mode/javascript" : "ace/mode/typescript");
                    };
                    JsPanelConfigController.$inject = [
                        $di.$ng.$rootScope,
                        $di.$app.CurrentProjectService
                    ];
                    return JsPanelConfigController;
                })(controllers.PanelConfigController);
                controllers.JsPanelConfigController = JsPanelConfigController;
            })(csseditor.controllers || (csseditor.controllers = {}));
            var controllers = csseditor.controllers;
        })(xperiments.csseditor || (xperiments.csseditor = {}));
        var csseditor = xperiments.csseditor;
    })(io.xperiments || (io.xperiments = {}));
    var xperiments = io.xperiments;
})(io || (io = {}));
var io;
(function (io) {
    (function (xperiments) {
        (function (csseditor) {
            (function (controllers) {
                var RenderDevicesController = (function () {
                    function RenderDevicesController($rootScope, currentProjectService) {
                        this.currentProjectService = currentProjectService;
                        this.responseModes = {
                            "full": true,
                            "desktop": false,
                            "tablet": false,
                            "mobile": false
                        };
                    }
                    RenderDevicesController.prototype.setResponsiveMode = function (mode) {
                        var _this = this;
                        Object.keys(this.responseModes).forEach(function (key) {
                            _this.responseModes[key] = false;
                        });
                        this.responseModes[mode] = true;
                    };
                    RenderDevicesController.$inject = [
                        $di.$ng.$rootScope,
                        $di.$app.CurrentProjectService
                    ];
                    return RenderDevicesController;
                })();
                controllers.RenderDevicesController = RenderDevicesController;
            })(csseditor.controllers || (csseditor.controllers = {}));
            var controllers = csseditor.controllers;
        })(xperiments.csseditor || (xperiments.csseditor = {}));
        var csseditor = xperiments.csseditor;
    })(io.xperiments || (io.xperiments = {}));
    var xperiments = io.xperiments;
})(io || (io = {}));
var RenderDevices = io.xperiments.csseditor.models.RenderDevices;
var app = angular.module('PulsarCodeEditor', ['ui.layout', 'ui.ace']);
app.controller(io.xperiments.csseditor.controllers);
app.service(io.xperiments.csseditor.services);
app.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});

app.filter({ "pathFileName": function () {
        return function (path) {
            return path.split('/').pop();
        };
    } });

app.config([
    '$compileProvider',
    function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|data):/);
    }
]);

app.value('RenderDevices', new RenderDevices());
