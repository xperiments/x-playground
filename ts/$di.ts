
module $di
{
	/* service */
	export class $ng
	{
		/* Services */
		static $anchorScroll:string = null;
		static $animate:string = null;
		static $cacheFactory:string = null;
		static $compile:string = null;
		static $controller:string = null;
		static $document:string = null;
		static $filter:string = null;
		static $http:string = null;
		static $interpolate:string = null;
		static $locale:string = null;
		static $location:string = null;
		static $parse:string = null;
		static $q:string = null;
		static $rootElement:string = null;
		static $rootScope:string = null;
		static $sce:string = null;
		static $sceDelegate:string = null;
		static $templateCache:string = null;
		static $window:string = null;
		static $exceptionHandler:string = null;
		static $httpBackend:string = null;
		static $interval:string = null;
		static $log:string = null;
		static $timeout:string = null;
		static $resource:string = null;
		static $sanitize:string = null;
		static $swipe:string = null;


		/* providers */
		static $animateProvider:string = null;
		static $compileProvider:string = null;
		static $controllerProvider:string = null;
		static $filterProvider:string = null;
		static $httpProvider:string = null;
		static $interpolateProvider:string = null;
		static $locationProvider:string = null;
		static $logProvider:string = null;
		static $parseProvider:string = null;
		static $rootScopeProvider:string = null;
		static $sceDelegateProvider:string = null;
		static $sceProvider:string = null;
		static $exceptionHandlerProvider:string = null;
		static $routeProvider:string = null;

		/* auto */
		static $injector:string = null;
		static $provide:string = null;

		/* ngCookies service */
		static $cookieStore:string = null;
		static $cookies:string = null;


		/* ngRoute service */
		static $route:string = null;
		static $routeParams:string = null;

		/* controller */
		static $scope:string = null;
		static $element:string = null;
		static $attrs:string = null;
		static $transclude:string = null;

	}
	export module $ng
	{
		initStaticClass( $ng );
	}



	var __dev_mode:boolean = false;
	export function setDevelopment(devMode:boolean){ __dev_mode = devMode }

	/* HELPERS */
	export function initStaticClass( Class:any ):void
	{
		// sets the same value from the keyname itself
		// bypassing not nulled properties
		Object.keys(Class).forEach((key:string)=> { (Class[key] === null) && ( Class[key] = key ); })
	}
	export function checkDI( Class:any ):void
	{
		if( !__dev_mode ) return; // Do nothing in production!!
		// do a dity check here :-(
		var className:string = getClassName(Class);
		if ( annotate(Class).toString().toLowerCase()!=Class.$inject.toString().toLowerCase() )
		{
			var err = ("\n\nPlease check the injection in class $className$\n\n").replace('$className$',className);
			throw new Error(err);
			return;
		}
		console.log('$di class checked: '+className)
	};

	// private methods
	function getClassName(Class:any):string
	{
		return Class.toString().match(/function (.*)\(/)[1];
	};


	//http://taoofcode.net/studying-the-angular-injector-annotate/
	var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
	var FN_ARG_SPLIT = /,/;
	var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
	var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

	function annotate(fn):string[]
	{
		var $inject,
			fnText,
			argDecl

		if (typeof fn == 'function') {

			$inject = [];
			if (fn.length) {
				fnText = fn.toString().replace(STRIP_COMMENTS, '');
				argDecl = fnText.match(FN_ARGS);
				argDecl[1].split(FN_ARG_SPLIT).forEach(function(arg){
					arg.replace(FN_ARG, function(all, underscore, name){
						$inject.push(name);
					});
				});
			}

		}
		return $inject;
	}
}
$di.setDevelopment(true);