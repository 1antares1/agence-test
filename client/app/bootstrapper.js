var agence;
(function (agence) {
    var bootstrapper;
    (function (bootstrapper) {
        "use strict";
        var main = angular.module(agence.appName);
        var Route = (function () {
            function Route(name, URL, templateUrl, controller, controllerAs) {
                this.name = name;
                this.URL = URL;
                this.templateUrl = templateUrl;
                this.controller = controller;
                this.controllerAs = controllerAs;
            }
            return Route;
        }());
        bootstrapper.Route = Route;
        var RouteOptions = (function () {
            function RouteOptions(route, areUnnamedViews, nestedViews) {
                this.route = route;
                this.areUnnamedViews = areUnnamedViews;
                this.nestedViews = nestedViews;
            }
            return RouteOptions;
        }());
        bootstrapper.RouteOptions = RouteOptions;
        var RoutesConfig = (function () {
            function RoutesConfig($stateProvider, $urlRouterProvider) {
                this.$stateProvider = $stateProvider;
                this.$urlRouterProvider = $urlRouterProvider;
                this.routes = new Array();
                this.templateBaseUrl = "app/components/";
            }
            RoutesConfig.prototype.setup = function () {
                this.setupRoutes();
                this.setupState();
                this.init();
            };
            RoutesConfig.prototype.add = function (name, url, templateUrl, controller, controllerAs, areUnnamedViews, nestedViews) {
                if (controllerAs === void 0) { controllerAs = "vm"; }
                if (areUnnamedViews === void 0) { areUnnamedViews = true; }
                this.routes.push(new RouteOptions(new Route(name, url, this.templateBaseUrl + templateUrl, controller, controllerAs), areUnnamedViews, nestedViews));
            };
            RoutesConfig.prototype.setupRoutes = function () {
                this.add("app", "/app", "common/views/abstract.html", "");
                this.add("app.dashboard", "^/dashboard", "dashboard/views/dashboard.html", "dashboardController");
                this.add("app.performance", "^/performance", "performance/views/performance.html", "performanceController");
                this.add("app.consultants", "^/consultants", "consultant/views/consultants.html", "consultantsController");
                this.add("app.consultant", "^/consultant/:id", "consultant/views/consultant-details.html", "consultantDetailsController");
            };
            RoutesConfig.prototype.setupState = function () {
                var _this = this;
                this.routes.forEach(function (routeOption, index, array) {
                    _this.$stateProvider.state(routeOption.route.name, {
                        url: routeOption.route.URL,
                        templateUrl: routeOption.route.templateUrl,
                        controller: routeOption.route.controller,
                        controllerAs: routeOption.route.controllerAs,
                        params: {
                            obj: null
                        }
                    });
                    if (angular.isDefined(routeOption.nestedViews) && routeOption.nestedViews.length) {
                        routeOption.nestedViews.forEach(function (nestedView, nestedIndex, nestedArray) {
                            var _nestedViewName = (routeOption.areUnnamedViews) ? "@".concat(routeOption.route.name) : nestedView.name.concat("@", routeOption.route.name);
                            _this.$stateProvider.state(nestedView.name, {
                                views: (_a = {},
                                    _a[_nestedViewName] = {
                                        templateUrl: _this.templateBaseUrl + nestedView.templateUrl,
                                        controller: nestedView.controller,
                                        controllerAs: nestedView.controllerAs
                                    },
                                    _a)
                            });
                            var _a;
                        });
                    }
                });
            };
            RoutesConfig.prototype.init = function () {
                this.$urlRouterProvider.otherwise("/dashboard");
            };
            return RoutesConfig;
        }());
        bootstrapper.RoutesConfig = RoutesConfig;
        setup.$inject = ["$stateProvider", "$urlRouterProvider", "$httpProvider", "$provide"];
        function setup($stateProvider, $urlRouterProvider, $httpProvider, $provider) {
            var routeConfig = new RoutesConfig($stateProvider, $urlRouterProvider);
            routeConfig.setup();
            $httpProvider.interceptors.push("interceptorService");
        }
        var Init = (function () {
            function Init() {
            }
            Init.prototype.getAppSettings = function () {
                var initInjector = angular.injector(["ng"]);
                var $http = initInjector.get("$http");
                return $http.get("/api/settings").then(function (response) {
                    main.constant("appSettings", response.data);
                }, function (errorResponse) {
                });
            };
            return Init;
        }());
        new Init().getAppSettings().then(function () {
            angular.element(document).ready(function () {
                main.config(setup).run(function () { });
                angular.bootstrap(document, [agence.appName]);
            });
        });
    })(bootstrapper = agence.bootstrapper || (agence.bootstrapper = {}));
})(agence || (agence = {}));
//# sourceMappingURL=bootstrapper.js.map