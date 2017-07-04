var agence;
(function (agence) {
    var common;
    (function (common) {
        var Services;
        (function (Services) {
            var InterceptorService = (function () {
                function InterceptorService($location, $q, lifeCycle) {
                    var _this = this;
                    this.$location = $location;
                    this.$q = $q;
                    this.lifeCycle = lifeCycle;
                    this.baseURI = "/dashboard/";
                    this.request = function (config) {
                        config.headers = config.headers || {};
                        return config;
                    };
                    this.responseError = function (rejection) {
                        return _this.$q.reject(rejection);
                    };
                }
                InterceptorService.Factory = function ($location, $q, lifeCycle) {
                    return new InterceptorService($location, $q, lifeCycle);
                };
                return InterceptorService;
            }());
            Services.InterceptorService = InterceptorService;
            ;
            InterceptorService.Factory.$inject = ["$location", "$q", "lifeCycle"];
            angular.module(agence.appName).factory("interceptorService", InterceptorService.Factory);
        })(Services = common.Services || (common.Services = {}));
    })(common = agence.common || (agence.common = {}));
})(agence || (agence = {}));
