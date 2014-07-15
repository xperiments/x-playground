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
var PreviewView;
(function (PreviewView) {
    PreviewView.html = '<!DOCTYPE html><html><head lang="en">	<meta charset="UTF-8">	<title></title>	{{styles}}	<style>{{css}}</style></head><body>{{body}}{{scripts}}<script>	{{js}}</script></body></html>';
})(PreviewView || (PreviewView = {}));
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
                    ResourceLoaderService.$inject = ["$http", "$q"];
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
            (function (controllers) {
                var EditorController = (function () {
                    function EditorController($scope, $rootScope, $sce, $interpolate, $q, HTMLRendererService, currentProjectService, librariesService) {
                        this.$scope = $scope;
                        this.$rootScope = $rootScope;
                        this.$sce = $sce;
                        this.$interpolate = $interpolate;
                        this.$q = $q;
                        this.HTMLRendererService = HTMLRendererService;
                        this.currentProjectService = currentProjectService;
                        this.librariesService = librariesService;
                        this.iframeSource = "";
                        this.compiledResult = "";
                        this.renderers = { css: 'css', js: 'javascript' };
                        this.cssFiles = [];
                        this.jsFiles = [];
                        this.currentProject = currentProjectService.project;
                        this.libraries = librariesService.libraries;
                    }
                    EditorController.prototype.run = function () {
                        var _this = this;
                        this.HTMLRendererService.render(this.currentProject).then(function (result) {
                            _this.$rootScope.$emit('uiLayout.update');
                            _this.compiledResult = 'data:text/html;base64,' + btoa(result);
                            _this.iframeSource = _this.$sce.trustAsResourceUrl(_this.compiledResult);
                        });
                    };
                    EditorController.$inject = ["$scope", "$rootScope", "$sce", "$interpolate", "$q", "HTMLRendererService", "CurrentProjectService", "LibrariesService"];
                    return EditorController;
                })();
                controllers.EditorController = EditorController;
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
                    PanelConfigController.$inject = ["$rootScope"];
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
                    BodyPanelConfigController.$inject = ["$rootScope", "CurrentProjectService"];
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
                    CssPanelConfigController.$inject = ["$rootScope", "CurrentProjectService"];
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
                    JsPanelConfigController.$inject = ["$rootScope", "CurrentProjectService"];
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
                    RenderDevicesController.$inject = ["$rootScope", "CurrentProjectService"];
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
                    function HTMLRendererService($q, $interpolate, resourceLoaderService) {
                        this.$q = $q;
                        this.$interpolate = $interpolate;
                        this.resourceLoaderService = resourceLoaderService;
                        this.tsCompiler = new TypeScript.TypeScriptCompiler();
                        this.iframeTemplateRenderer = $interpolate(PreviewView.html);
                    }
                    HTMLRendererService.prototype.render = function (project) {
                        var _this = this;
                        var allPromises = [this.renderCss(project), this.renderJs(project), this.renderBody(project)];

                        if (project.options.inlineFiles && project.options.inlineProxyURL != "") {
                            var filesToInline = [].concat(project.cssFiles).concat(project.jsFiles);
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
                        this.tsCompiler.addFile("output.ts", TypeScript.ScriptSnapshot.fromString(project.js));
                        var output = "";
                        var iter = this.tsCompiler.compile();
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
                        var htmlContext;
                        if (resourceResult) {
                            htmlContext = {
                                body: body,
                                css: css,
                                styles: project.cssFiles.map(function (cssFile) {
                                    return '<link rel="stylesheet" type="text/css" href="data:text/html;base64,' + resourceResult[project.options.inlineProxyURL + cssFile] + '"/>\n';
                                }).join(''),
                                js: js,
                                scripts: project.jsFiles.map(function (jsFile) {
                                    return '<script src="data:text/html;base64,' + resourceResult[project.options.inlineProxyURL + jsFile] + '"></script>\n';
                                }).join('')
                            };

                            return this.iframeTemplateRenderer(htmlContext);
                        }

                        htmlContext = {
                            body: body,
                            css: css,
                            styles: project.cssFiles.map(function (cssFile) {
                                return '<link rel="stylesheet" type="text/css" href="' + cssFile + '"/>\n';
                            }).join(''),
                            js: js,
                            scripts: project.jsFiles.map(function (jsFile) {
                                return '<script src="' + jsFile + '"></script>\n';
                            }).join('')
                        };
                        return this.iframeTemplateRenderer(htmlContext);
                    };
                    HTMLRendererService.$inject = ["$q", "$interpolate", "ResourceLoaderService"];
                    return HTMLRendererService;
                })();
                services.HTMLRendererService = HTMLRendererService;
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
                var LibrariesService = (function () {
                    function LibrariesService() {
                        this.libraries = [
                            {
                                "url": [
                                    "http://code.jquery.com/jquery-git2.js"
                                ],
                                "label": "jQuery 2.x WIP (via git)",
                                "group": "jQuery"
                            },
                            {
                                "url": [
                                    "http://code.jquery.com/jquery-2.1.0.min.js"
                                ],
                                "label": "jQuery 2.1.0",
                                "group": "jQuery"
                            },
                            {
                                "url": [
                                    "http://code.jquery.com/jquery-git1.js"
                                ],
                                "label": "jQuery 1.x WIP (via git)",
                                "group": "jQuery"
                            },
                            {
                                "url": [
                                    "http://code.jquery.com/jquery-1.11.0.min.js"
                                ],
                                "label": "jQuery 1.11.0",
                                "group": "jQuery"
                            },
                            {
                                "url": [
                                    "http://code.jquery.com/jquery-1.9.1.min.js"
                                ],
                                "label": "jQuery 1.9.1",
                                "group": "jQuery"
                            },
                            {
                                "url": [
                                    "http://code.jquery.com/ui/jquery-ui-git.css",
                                    "http://code.jquery.com/jquery-git.js",
                                    "http://code.jquery.com/ui/jquery-ui-git.js"
                                ],
                                "label": "jQuery UI WIP (via git)",
                                "group": "jQuery UI"
                            },
                            {
                                "url": [
                                    "http://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.min.css",
                                    "http://code.jquery.com/jquery-1.11.0.min.js",
                                    "http://code.jquery.com/ui/1.11.0/jquery-ui.min.js"
                                ],
                                "label": "jQuery UI 1.11.0",
                                "group": "jQuery UI"
                            },
                            {
                                "url": [
                                    "http://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.min.css",
                                    "http://code.jquery.com/jquery-1.11.0.min.js",
                                    "http://code.jquery.com/ui/1.10.4/jquery-ui.min.js"
                                ],
                                "label": "jQuery UI 1.10.4",
                                "group": "jQuery UI"
                            },
                            {
                                "url": [
                                    "http://code.jquery.com/ui/1.9.2/themes/smoothness/jquery-ui.css",
                                    "http://code.jquery.com/jquery-1.8.3.min.js",
                                    "http://code.jquery.com/ui/1.9.2/jquery-ui.js"
                                ],
                                "label": "jQuery UI 1.9.2",
                                "group": "jQuery UI"
                            },
                            {
                                "url": [
                                    "http://code.jquery.com/mobile/git/jquery.mobile-git.css",
                                    "http://code.jquery.com/jquery-1.11.0.min.js",
                                    "http://code.jquery.com/mobile/git/jquery.mobile-git.js"
                                ],
                                "label": "jQuery Mobile WIP (via git)",
                                "group": "jQuery Mobile"
                            },
                            {
                                "url": [
                                    "http://code.jquery.com/mobile/1.4.2/jquery.mobile-1.4.2.min.css",
                                    "http://code.jquery.com/jquery-1.11.0.min.js",
                                    "http://code.jquery.com/mobile/1.4.2/jquery.mobile-1.4.2.min.js"
                                ],
                                "label": "jQuery Mobile 1.4.2",
                                "group": "jQuery Mobile"
                            },
                            {
                                "url": [
                                    "http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.css",
                                    "http://code.jquery.com/jquery-1.9.1.min.js",
                                    "http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js"
                                ],
                                "label": "jQuery Mobile 1.3.2",
                                "group": "jQuery Mobile"
                            },
                            {
                                "url": [
                                    "http://code.jquery.com/mobile/1.2.1/jquery.mobile-1.2.1.min.css",
                                    "http://code.jquery.com/jquery-1.8.3.min.js",
                                    "http://code.jquery.com/mobile/1.2.1/jquery.mobile-1.2.1.min.js"
                                ],
                                "label": "jQuery Mobile 1.2.1",
                                "group": "jQuery Mobile"
                            },
                            {
                                "url": [
                                    "http://code.jquery.com/mobile/1.1.2/jquery.mobile-1.1.2.min.css",
                                    "http://code.jquery.com/jquery-1.6.4.min.js",
                                    "http://code.jquery.com/mobile/1.1.2/jquery.mobile-1.1.2.min.js"
                                ],
                                "label": "jQuery Mobile 1.1.2",
                                "group": "jQuery Mobile"
                            },
                            {
                                "url": [
                                    "http://code.jquery.com/jquery.min.js",
                                    "http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css",
                                    "http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"
                                ],
                                "label": "Bootstrap Latest",
                                "group": "Bootstrap"
                            },
                            {
                                "url": [
                                    "http://code.jquery.com/jquery.min.js",
                                    "http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css",
                                    "http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min.js"
                                ],
                                "label": "Bootstrap 2.3.2",
                                "group": "Bootstrap"
                            },
                            {
                                "url": [
                                    "http://ajax.googleapis.com/ajax/libs/prototype/1/prototype.js"
                                ],
                                "label": "Prototype latest",
                                "group": "Prototype"
                            },
                            {
                                "url": [
                                    "http://ajax.googleapis.com/ajax/libs/prototype/1.7/prototype.js"
                                ],
                                "label": "Prototype 1.7.1",
                                "group": "Prototype"
                            },
                            {
                                "url": [
                                    "http://ajax.googleapis.com/ajax/libs/prototype/1.6.1.0/prototype.js"
                                ],
                                "label": "Prototype 1.6.1.0",
                                "group": "Prototype"
                            },
                            {
                                "url": [
                                    "http://ajax.googleapis.com/ajax/libs/prototype/1/prototype.js",
                                    "http://ajax.googleapis.com/ajax/libs/scriptaculous/1/scriptaculous.js"
                                ],
                                "label": "script.aculo.us latest",
                                "group": "Prototype"
                            },
                            {
                                "url": [
                                    "http://ajax.googleapis.com/ajax/libs/prototype/1/prototype.js",
                                    "http://ajax.googleapis.com/ajax/libs/scriptaculous/1.8.3/scriptaculous.js"
                                ],
                                "label": "script.aculo.us 1.8.3",
                                "group": "Prototype"
                            },
                            {
                                "url": [
                                    "http://yui.yahooapis.com/3.10.0/build/yui/yui.js"
                                ],
                                "label": "YUI 3.10.0",
                                "group": "YUI"
                            },
                            {
                                "url": [
                                    "http://yui.yahooapis.com/2.9.0/build/yuiloader/yuiloader-min.js"
                                ],
                                "label": "YUI 2.9.0",
                                "group": "YUI"
                            },
                            {
                                "url": [
                                    "http://ajax.googleapis.com/ajax/libs/mootools/1.5.0/mootools-yui-compressed.js"
                                ],
                                "label": "MooTools 1.5.0",
                                "group": "MooTools"
                            },
                            {
                                "url": [
                                    "http://ajax.googleapis.com/ajax/libs/mootools/1.5.0/mootools-nocompat-yui-compressed.js"
                                ],
                                "label": "MooTools 1.5.0 (without 1.2+ compatibility layer)",
                                "group": "MooTools"
                            },
                            {
                                "url": [
                                    "http://ajax.googleapis.com/ajax/libs/mootools/1.4.5/mootools-yui-compressed.js"
                                ],
                                "label": "MooTools 1.4.5",
                                "group": "MooTools"
                            },
                            {
                                "url": [
                                    "http://ajax.googleapis.com/ajax/libs/dojo/1/dojo/dojo.js"
                                ],
                                "label": "Dojo latest",
                                "group": "Dojo"
                            },
                            {
                                "url": [
                                    "http://ajax.googleapis.com/ajax/libs/dojo/1.8/dojo/dojo.js"
                                ],
                                "label": "Dojo 1.8.4",
                                "group": "Dojo"
                            },
                            {
                                "url": [
                                    "http://ajax.googleapis.com/ajax/libs/dojo/1.7/dojo/dojo.js"
                                ],
                                "label": "Dojo 1.7.4",
                                "group": "Dojo"
                            },
                            {
                                "url": [
                                    "http://ajax.googleapis.com/ajax/libs/dojo/1/dijit/themes/claro/claro.css",
                                    "http://ajax.googleapis.com/ajax/libs/dojo/1/dojo/dojo.js"
                                ],
                                "label": "Dijit latest (Claro)",
                                "group": "Dojo"
                            },
                            {
                                "url": [
                                    "http://ajax.googleapis.com/ajax/libs/dojo/1.8.4/dijit/themes/claro/claro.css",
                                    "http://ajax.googleapis.com/ajax/libs/dojo/1.8.4/dojo/dojo.js"
                                ],
                                "label": "Dijit 1.8.4 (Claro)",
                                "group": "Dojo"
                            },
                            {
                                "url": [
                                    "http://ajax.googleapis.com/ajax/libs/dojo/1.7.4/dijit/themes/claro/claro.css",
                                    "http://ajax.googleapis.com/ajax/libs/dojo/1.7.4/dojo/dojo.xd.js"
                                ],
                                "label": "Dijit 1.7.4 (Claro)",
                                "group": "Dojo"
                            },
                            {
                                "url": [
                                    "http://cdn.kendostatic.com/2014.1.528/styles/kendo.common.min.css",
                                    "http://cdn.kendostatic.com/2014.1.528/styles/kendo.default.min.css",
                                    "http://code.jquery.com/jquery-1.9.1.min.js",
                                    "http://cdn.kendostatic.com/2014.1.528/js/kendo.ui.core.min.js"
                                ],
                                "label": "Kendo UI Core Q1 SP2",
                                "group": "Kendo UI"
                            },
                            {
                                "url": [
                                    "http://cdn.kendostatic.com/2014.1.318/styles/kendo.common.min.css",
                                    "http://cdn.kendostatic.com/2014.1.318/styles/kendo.rtl.min.css",
                                    "http://cdn.kendostatic.com/2014.1.318/styles/kendo.default.min.css",
                                    "http://cdn.kendostatic.com/2014.1.318/styles/kendo.dataviz.min.css",
                                    "http://cdn.kendostatic.com/2014.1.318/styles/kendo.dataviz.default.min.css",
                                    "http://cdn.kendostatic.com/2014.1.318/styles/kendo.mobile.all.min.css",
                                    "http://code.jquery.com/jquery-1.9.1.min.js",
                                    "http://cdn.kendostatic.com/2014.1.318/js/kendo.all.min.js"
                                ],
                                "label": "Kendo UI Q1 2014",
                                "group": "Kendo UI"
                            },
                            {
                                "url": [
                                    "http://cdn.kendostatic.com/2013.3.1119/styles/kendo.common.min.css",
                                    "http://cdn.kendostatic.com/2013.3.1119/styles/kendo.rtl.min.css",
                                    "http://cdn.kendostatic.com/2013.3.1119/styles/kendo.default.min.css",
                                    "http://cdn.kendostatic.com/2013.3.1119/styles/kendo.dataviz.min.css",
                                    "http://cdn.kendostatic.com/2013.3.1119/styles/kendo.dataviz.default.min.css",
                                    "http://cdn.kendostatic.com/2013.3.1119/styles/kendo.mobile.all.min.css",
                                    "http://code.jquery.com/jquery-1.9.1.min.js",
                                    "http://cdn.kendostatic.com/2013.3.1119/js/kendo.all.min.js"
                                ],
                                "label": "Kendo UI Q3 2013",
                                "group": "Kendo UI"
                            },
                            {
                                "url": [
                                    "http://code.jquery.com/qunit/qunit-git.css",
                                    "http://code.jquery.com/qunit/qunit-git.js"
                                ],
                                "label": "QUnit",
                                "group": "Testing"
                            },
                            {
                                "url": [
                                    "http://zeptojs.com/zepto.min.js"
                                ],
                                "label": "Zepto latest",
                                "group": "Zepto"
                            },
                            {
                                "url": [
                                    "http://cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.min.js"
                                ],
                                "label": "Zepto 1.0",
                                "group": "Zepto"
                            },
                            {
                                "url": [
                                    "https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0-beta.1/angular.min.js"
                                ],
                                "label": "Angular 1.3.0 beta 1 Unstable",
                                "group": "Angular"
                            },
                            {
                                "url": [
                                    "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.14/angular.min.js"
                                ],
                                "label": "Angular 1.2.14 Stable",
                                "group": "Angular"
                            },
                            {
                                "url": [
                                    "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.14/angular.js"
                                ],
                                "label": "Angular 1.2.14 Uncompressed",
                                "group": "Angular"
                            },
                            {
                                "url": [
                                    "https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"
                                ],
                                "label": "Angular 1.0.7 Stable",
                                "group": "Angular"
                            },
                            {
                                "url": [
                                    "//fb.me/react-0.9.0.js"
                                ],
                                "label": "React 0.9.0",
                                "group": "React"
                            },
                            {
                                "url": [
                                    "//fb.me/react-with-addons-0.9.0.js"
                                ],
                                "label": "React with Add-Ons 0.9.0",
                                "group": "React"
                            },
                            {
                                "url": [
                                    "http://nightly.enyojs.com/latest/enyo-nightly/enyo.css",
                                    "http://nightly.enyojs.com/latest/enyo-nightly/enyo.js",
                                    "http://nightly.enyojs.com/latest/lib/layout/package.js",
                                    "http://nightly.enyojs.com/latest/lib/onyx/package.js",
                                    "http://nightly.enyojs.com/latest/lib/g11n/package.js",
                                    "http://nightly.enyojs.com/latest/lib/canvas/package.js"
                                ],
                                "label": "Enyo latest",
                                "group": "Enyo"
                            },
                            {
                                "url": [
                                    "http://enyojs.com/enyo-2.2.0/enyo.css",
                                    "http://enyojs.com/enyo-2.2.0/enyo.js",
                                    "http://enyojs.com/enyo-2.2.0/lib/layout/package.js",
                                    "http://enyojs.com/enyo-2.2.0/lib/onyx/package.js",
                                    "http://enyojs.com/enyo-2.2.0/lib/g11n/package.js",
                                    "http://enyojs.com/enyo-2.2.0/lib/canvas/package.js"
                                ],
                                "label": "Enyo 2.2.0",
                                "group": "Enyo"
                            },
                            {
                                "url": [
                                    "//cdnjs.cloudflare.com/ajax/libs/bluebird/1.2.2/bluebird.js"
                                ],
                                "label": "Bluebird 1.2.2",
                                "group": "Promises"
                            },
                            {
                                "url": [
                                    "https://www.promisejs.org/polyfills/promise-4.0.0.js"
                                ],
                                "label": "Promise 4.0.0",
                                "group": "Promises"
                            },
                            {
                                "url": [
                                    "//cdnjs.cloudflare.com/ajax/libs/q.js/1.0.1/q.js"
                                ],
                                "label": "Q 1.0.1",
                                "group": "Promises"
                            },
                            {
                                "url": [
                                    "//cdn.jsdelivr.net/rsvp/3.0.6/rsvp.js"
                                ],
                                "label": "RSVP 3.0.6",
                                "group": "Promises"
                            },
                            {
                                "url": [
                                    "http://jashkenas.github.io/underscore/underscore-min.js",
                                    "http://jashkenas.github.io/backbone/backbone-min.js"
                                ],
                                "label": "Backbone latest",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "http://jashkenas.github.io/underscore/underscore-min.js",
                                    "http://jashkenas.github.io/backbone/backbone-min.js",
                                    "http://marionettejs.com/downloads/backbone.marionette.min.js"
                                ],
                                "label": "MarionetteJS latest",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "http://cdnjs.cloudflare.com/ajax/libs/bonsai/0.4/bonsai.min.js"
                                ],
                                "label": "Bonsai 0.4.latest",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "http://jashkenas.github.io/coffee-script/extras/coffee-script.js"
                                ],
                                "label": "CoffeeScript",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js",
                                    "http://cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0/handlebars.js",
                                    "http://builds.emberjs.com.s3.amazonaws.com/tags/v1.0.0/ember.js"
                                ],
                                "label": "Ember.js 1.0.0",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "http://cdnjs.cloudflare.com/ajax/libs/es5-shim/2.0.8/es5-shim.min.js"
                                ],
                                "label": "ES5 shim 2.0.8",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "http://extjs.cachefly.net/ext-3.1.0/resources/css/ext-all.css",
                                    "http://cdnjs.cloudflare.com/ajax/libs/ext-core/3.1.0/ext-core.min.js"
                                ],
                                "label": "ext-core 3.1.0",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "http://cdnjs.cloudflare.com/ajax/libs/foundation/5.0.3/css/normalize.min.css",
                                    "http://cdnjs.cloudflare.com/ajax/libs/foundation/5.0.3/css/foundation.min.css",
                                    "http://cdnjs.cloudflare.com/ajax/libs/foundation/5.0.3/js/vendor/jquery.min.js",
                                    "http://cdnjs.cloudflare.com/ajax/libs/foundation/5.0.3/js/foundation.min.js"
                                ],
                                "label": "Foundation 5.0.3",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "http://cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0/handlebars.js"
                                ],
                                "label": "Handlebars.js 1.0.0",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "http://cdnjs.cloudflare.com/ajax/libs/knockout/3.0.0/knockout-min.js"
                                ],
                                "label": "Knockout 3.0.0",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "http://cdnjs.cloudflare.com/ajax/libs/less.js/1.3.3/less.min.js"
                                ],
                                "label": "Less 1.3.3",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "http://cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min.js"
                                ],
                                "label": "Lo-Dash 2.4.1",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "http://modernizr.com/downloads/modernizr-latest.js"
                                ],
                                "label": "Modernizr Development latest",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "http://cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js",
                                    "http://cdnjs.cloudflare.com/ajax/libs/detectizr/1.5.0/detectizr.min.js"
                                ],
                                "label": "Detectizr 1.5.0",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "http://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js"
                                ],
                                "label": "Prefixfree 1.0.7",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "http://cdnjs.cloudflare.com/ajax/libs/processing.js/1.4.1/processing-api.min.js"
                                ],
                                "label": "Processing 1.4.1",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "http://d3js.org/d3.v3.min.js"
                                ],
                                "label": "D3 3.x",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "//code.highcharts.com/highcharts.js"
                                ],
                                "label": "Highcharts latest",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"
                                ],
                                "label": "Rapha&euml;l 2.1.0",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "http://cdnjs.cloudflare.com/ajax/libs/sammy.js/0.7.4/sammy.min.js"
                                ],
                                "label": "Sammy 0.7.4",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "http://cdn.sencha.io/touch/1.1.0/resources/css/sencha-touch.css",
                                    "http://cdn.sencha.io/touch/1.1.0/sencha-touch.js"
                                ],
                                "label": "Sencha Touch",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "http://remy.github.io/twitterlib/twitterlib.min.js"
                                ],
                                "label": "TwitterLib",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "http://jashkenas.github.io/underscore/underscore-min.js"
                                ],
                                "label": "underscore",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "http://code.jquery.com/jquery.min.js",
                                    "//canjs.com/release/2.0.3/can.jquery.min.js"
                                ],
                                "label": "CanJS 2.0.3",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "http://cdnjs.cloudflare.com/ajax/libs/three.js/r61/three.min.js"
                                ],
                                "label": "Three.js r61",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "http://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.6.2/html5shiv.js"
                                ],
                                "label": "HTML5 shiv",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "http://lungo.tapquo.com/demo/components/lungo/lungo.css",
                                    "http://lungo.tapquo.com/demo/components/lungo/lungo.theme.css",
                                    "http://lungo.tapquo.com/demo/components/lungo/lungo.icon.css",
                                    "http://lungo.tapquo.com/demo/components/quojs/quo.js",
                                    "http://lungo.tapquo.com/demo/components/lungo/lungo.js"
                                ],
                                "label": "Lungo",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "//cdnjs.cloudflare.com/ajax/libs/polymer/0.3.3/platform.js",
                                    "//cdnjs.cloudflare.com/ajax/libs/polymer/0.3.3/polymer.js"
                                ],
                                "label": "Polymer 0.3.3",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css"
                                ],
                                "label": "Font Awesome 4.0.3",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "//cdnjs.cloudflare.com/ajax/libs/paper.js/0.9.12/paper.js"
                                ],
                                "label": "Paper.js 0.9.12",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "http://cdnjs.cloudflare.com/ajax/libs/gsap/1.11.7/TweenMax.min.js"
                                ],
                                "label": "GSAP 1.11.7",
                                "group": "Standalone"
                            },
                            {
                                "url": [
                                    "//cdnjs.cloudflare.com/ajax/libs/phaser/2.0.5/phaser.min.js"
                                ],
                                "label": "Phaser 2.0.5",
                                "group": "Standalone"
                            }
                        ];
                    }
                    return LibrariesService;
                })();
                services.LibrariesService = LibrariesService;
            })(csseditor.services || (csseditor.services = {}));
            var services = csseditor.services;
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
