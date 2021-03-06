var Hanson;
(function (Hanson) {
    function toJSON(input) {
        var UNESCAPE_MAP = { '\\"': '"', "\\`": "`", "\\'": "'" };
        var ML_ESCAPE_MAP = { '\n': '\\n', "\r": '\\r', "\t": '\\t', '"': '\\"' };
        function unescapeQuotes(r) {
            return UNESCAPE_MAP[r] || r;
        }

        return input.replace(/`(?:\\.|[^`])*`|'(?:\\.|[^'])*'|"(?:\\.|[^"])*"|\/\*[^]*?\*\/|\/\/.*\n?/g, function (s) {
            if (s.charAt(0) == '/')
                return '';
            else
                return s;
        }).replace(/(?:true|false|null)(?=[^\w_$]|$)|([a-zA-Z_$][\w_$]*)|`((?:\\.|[^`])*)`|'((?:\\.|[^'])*)'|"(?:\\.|[^"])*"|(,)(?=\s*[}\]])/g, function (s, identifier, multilineQuote, singleQuote, lonelyComma) {
            if (lonelyComma)
                return '';
            else if (identifier != null)
                return '"' + identifier + '"';
            else if (multilineQuote != null)
                return '"' + multilineQuote.replace(/\\./g, unescapeQuotes).replace(/[\n\r\t"]/g, function (r) {
                    return ML_ESCAPE_MAP[r];
                }) + '"';
            else if (singleQuote != null)
                return '"' + singleQuote.replace(/\\./g, unescapeQuotes).replace(/"/g, '\\"') + '"';
            else
                return s;
        });
    }
    Hanson.toJSON = toJSON;
})(Hanson || (Hanson = {}));
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
    ;

    function initStaticClass(Class) {
        Object.keys(Class).forEach(function (key) {
            (Class[key] === null) && (Class[key] = key);
        });
    }
    $di.initStaticClass = initStaticClass;
    ;

    function checkDI(Class) {
        if (!__dev_mode) {
            return;
        }
        ;

        var className = getClassName(Class);
        if (annotate(Class).toString().toLowerCase() !== Class.$inject.toString().toLowerCase()) {
            var err = ('\n\nPlease check the injection in class $className$\n\n').replace('$className$', className);
            throw new Error(err);
        }
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

        if (typeof fn === 'function') {
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
        $app.DropboxService = null;
        $app.GistService = null;
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
                        return this.$http.get('/config/config.hson', {
                            transformResponse: [function (data, headersGetter) {
                                    return JSON.parse(Hanson.toJSON(data));
                                }]
                        }).then(function (data) {
                            _this.endPoints = data.data.endPoints;
                            _this.frameworks = data.data.frameworks;
                            _this.js_wrap_map = data.data.js_wrap_map;

                            return { frameworks: data.data.frameworks, js_wrap_map: data.data.js_wrap_map };
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
                        this.inlineProxyURL = '';
                        this.cssRenderMode = '';
                        this.jsRenderMode = '';
                        this.js_wrap_mode = '';
                        this.framework = null;
                    }
                    return PlaygroundProjectOptions;
                })(Serializable);
                models.PlaygroundProjectOptions = PlaygroundProjectOptions;

                var PlaygroundProjectOptionsSerializer = (function () {
                    function PlaygroundProjectOptionsSerializer() {
                        this['@serializer'] = null;
                        this.inlineFiles = null;
                        this.inlineProxyURL = null;
                        this.cssRenderMode = null;
                        this.jsRenderMode = null;
                        this.js_wrap_mode = null;
                        this.framework = null;
                    }
                    PlaygroundProjectOptionsSerializer.prototype.set_framework = function (framework) {
                        return framework.label;
                    };
                    PlaygroundProjectOptionsSerializer.prototype.get_framework = function (label) {
                        console.log('busco ' + label);

                        var configService = angular.element(document.body).injector().get($di.$app.ConfigService);
                        var framework = configService.frameworks.filter(function (framework) {
                            return framework.label === label;
                        });
                        return framework[0];
                    };
                    return PlaygroundProjectOptionsSerializer;
                })();
                models.PlaygroundProjectOptionsSerializer = PlaygroundProjectOptionsSerializer;
                var PlaygroundProject = (function (_super) {
                    __extends(PlaygroundProject, _super);
                    function PlaygroundProject() {
                        _super.apply(this, arguments);
                        this.css = '';
                        this.js = '';
                        this.body = '';
                        this.cssFiles = null;
                        this.jsFiles = null;
                        this.options = null;
                    }
                    return PlaygroundProject;
                })(Serializable);
                models.PlaygroundProject = PlaygroundProject;
                var PlaygroundProjectSerializer = (function () {
                    function PlaygroundProjectSerializer() {
                        this['@serializer'] = null;
                        this.css = null;
                        this.js = null;
                        this.body = null;
                        this.cssFiles = null;
                        this.jsFiles = null;
                        this.options = null;
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
                        this.project.options.cssRenderMode = 'css';
                        this.project.options.jsRenderMode = 'javascript';
                        this.project.options.js_wrap_mode = 'onLoad';
                        this.project.options.inlineFiles = false;
                        this.project.options.inlineProxyURL = 'http://cors-anywhere.herokuapp.com/';
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
                        var template;
                        Object.keys(this.configService.js_wrap_map).forEach(function (key) {
                            template = _this.configService.js_wrap_map[key];
                            _this.iframeTemplateRenderers[key] = _this.$interpolate(template);
                        });
                    };

                    HTMLRendererService.prototype.render = function (project) {
                        var _this = this;
                        var allPromises = [this.renderCss(project), this.renderJs(project), this.renderBody(project)];

                        if (project.options.inlineFiles && project.options.inlineProxyURL !== '') {
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
                        if (project.options.cssRenderMode === 'css') {
                            defer.resolve(project.css);
                            return promise;
                        }
                        stylus(project.css).render(function (err, css) {
                            err ? defer.reject('/* Stylus Error CHECK YOUR CODE */') : defer.resolve(css);
                        });
                        return promise;
                    };
                    HTMLRendererService.prototype.renderJs = function (project) {
                        var defer = this.$q.defer();
                        var promise = defer.promise;
                        if (project.options.jsRenderMode === 'javascript') {
                            defer.resolve(project.js);
                        }
                        this.tsCompiler && this.tsCompiler.removeFile('output.ts');
                        this.tsCompiler.addFile('output.ts', TypeScript.ScriptSnapshot.fromString(project.js), null, null, null);
                        var output = '';
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
                        if (!project.options.framework) {
                            return resultFiles;
                        }
                        ;

                        var currentFrameworkFiles = project.options.framework.url;
                        var target;
                        currentFrameworkFiles.forEach(function (file) {
                            target = _this.getFileExtension(file) === 'css' ? resultFiles.css : resultFiles.js;
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
            (function (services) {
                var DropboxService = (function () {
                    function DropboxService() {
                        var _this = this;
                        this._isAuthenticated = false;
                        this._dropBox = new Dropbox.Client({ key: 'mize1oifvzi72sd' });
                        this._dropBox.authenticate({ interactive: false }, function (error) {
                            _this._onAuthFinish(error);
                        });
                        if (this._dropBox.isAuthenticated()) {
                            this._isAuthenticated = true;
                        }
                    }
                    DropboxService.prototype.authenticate = function () {
                        this._dropBox.authenticate();
                    };

                    DropboxService.prototype._onAuthFinish = function (error) {
                        if (error) {
                            console.log(error);
                        }
                        ;
                    };
                    return DropboxService;
                })();
                services.DropboxService = DropboxService;
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
                var GistService = (function () {
                    function GistService($http, configService, currentProjectService) {
                        this.$http = $http;
                        this.configService = configService;
                        this.currentProjectService = currentProjectService;
                    }
                    GistService.prototype.publish = function () {
                        var playgroundProject = this.currentProjectService.project;
                        var serialized = playgroundProject.stringify(false);
                        var data = {
                            description: 'x-playground anonymous gist save test',
                            public: true,
                            files: {
                                'x-playground.xpl': {
                                    content: serialized
                                }
                            }
                        };
                        this.$http.post(this.configService.endPoints['gist'], data).then(function (data) {
                            console.log(data);
                        });
                    };
                    GistService.prototype.loadGist = function (raw_url) {
                        var _this = this;
                        this.$http.jsonp('https://api.github.com/gists/' + raw_url + '?callback=JSON_CALLBACK').success(function (data) {
                            alert(1);
                            console.log(typeof data.data.files['x-playground.xpl'].content);
                            _this.currentProjectService.project.parse(data.data.files['x-playground.xpl'].content);
                        });
                    };
                    GistService.$inject = [
                        $di.$ng.$http,
                        $di.$app.ConfigService,
                        $di.$app.CurrentProjectService
                    ];
                    return GistService;
                })();
                services.GistService = GistService;
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
                    function EditorController($rootScope, $sce, $interpolate, $q, HTMLRendererService, currentProjectService, configService, dropboxService, gistService) {
                        var _this = this;
                        this.$rootScope = $rootScope;
                        this.$sce = $sce;
                        this.$interpolate = $interpolate;
                        this.$q = $q;
                        this.HTMLRendererService = HTMLRendererService;
                        this.currentProjectService = currentProjectService;
                        this.configService = configService;
                        this.dropboxService = dropboxService;
                        this.gistService = gistService;
                        this.iframeSource = '';
                        this.compiledResult = '';
                        this.currentProject = currentProjectService.project;
                        this.configService.load().then(function (data) {
                            _this.frameworks = data.frameworks;
                            _this.js_wrap_modes = data.js_wrap_map;
                            _this.HTMLRendererService.configLoaded();
                        });
                    }
                    EditorController.prototype.dropboxConnect = function () {
                        this.dropboxService.authenticate();
                    };
                    EditorController.prototype.gistPublish = function () {
                        this.gistService.publish();
                    };
                    EditorController.prototype.loadGist = function (raw_url) {
                        this.gistService.loadGist(raw_url);
                    };
                    EditorController.prototype.run = function () {
                        var _this = this;
                        this.HTMLRendererService.render(this.currentProject).then(function (result) {
                            _this.$rootScope.$emit('uiLayout.update');
                            _this.compiledResult = 'data:text/html;base64,' + btoa(result);
                            _this.iframeSource = _this.$sce.trustAsResourceUrl(_this.compiledResult);
                        });
                    };
                    EditorController.$inject = [
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
                        this.editorLoaded = function (editor) {
                            _this._editorLoaded(editor);
                        };
                    }
                    PanelConfigController.prototype.toggleConfig = function () {
                        this.showPanel = !this.showPanel;
                        !this.showPanel && this.updateEditorRenderer();
                    };

                    PanelConfigController.prototype.moveFileOrder = function (key, table, dir) {
                        if ((dir === 1 && key + 1 === table.length + 1) || (dir === -1 && key - 1 < 0)) {
                            return;
                        }
                        ;
                        var source = table[key];
                        var swap = table[key + dir];
                        table[key] = swap;
                        table[key + dir] = source;
                    };
                    PanelConfigController.prototype.removeFile = function (table, id) {
                        table.splice(id, 1);
                    };
                    PanelConfigController.prototype.addFile = function (table, file) {
                        if (typeof file === "undefined") { file = ''; }
                        if (file !== '' && table.indexOf(file) === -1) {
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
                        this.renderMode = 'css';
                    }
                    CssPanelConfigController.prototype.updateEditorRenderer = function () {
                        var mode = this.currentProjectService.project.options.cssRenderMode;
                        this.editor.getSession().setMode(mode === 'css' ? 'ace/mode/css' : 'ace/mode/stylus');
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
                        this.renderMode = 'javascript';
                    }
                    JsPanelConfigController.prototype.updateEditorRenderer = function () {
                        var mode = this.currentProjectService.project.options.jsRenderMode;
                        this.editor.getSession().setMode(mode === 'javascript' ? 'ace/mode/javascript' : 'ace/mode/typescript');
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
                            'full': true,
                            'desktop': false,
                            'tablet': false,
                            'mobile': false
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
var app = angular.module('PulsarCodeEditor', ['ui.layout', 'ui.ace']);
app.controller(io.xperiments.csseditor.controllers);
app.service(io.xperiments.csseditor.services);
app.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});

app.filter({
    'pathFileName': function () {
        return function (path) {
            return path.split('/').pop();
        };
    }
});

app.config([
    '$compileProvider',
    function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|data):/);
    }
]);
