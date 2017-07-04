var agence;
(function (agence) {
    var common;
    (function (common) {
        var services;
        (function (services) {
            var MethodConfig = (function () {
                function MethodConfig(method, isArray, headers) {
                    this.method = method;
                    this.isArray = isArray;
                    this.headers = headers;
                }
                return MethodConfig;
            }());
            services.MethodConfig = MethodConfig;
            var MethodsConfig = (function () {
                function MethodsConfig() {
                }
                return MethodsConfig;
            }());
            services.MethodsConfig = MethodsConfig;
            var DataAccessService = (function () {
                function DataAccessService($resource, configService) {
                    this.$resource = $resource;
                    this.configService = configService;
                    this.init();
                }
                DataAccessService.prototype.init = function () {
                    this.initMethodConfig();
                };
                ;
                DataAccessService.prototype.initMethodConfig = function () {
                    var query = new MethodConfig("GET", true, {});
                    var save = new MethodConfig("POST", false, {});
                    var get = new MethodConfig("GET", false, {});
                    var update = new MethodConfig("PUT", false, {});
                    var del = new MethodConfig("DELETE", false, {});
                    this.anonymousMethodConfigs = new MethodsConfig();
                    this.anonymousMethodConfigs.query = query;
                    this.anonymousMethodConfigs.save = save;
                    this.anonymousMethodConfigs.get = get;
                    this.anonymousMethodConfigs.update = update;
                    this.anonymousMethodConfigs.delete = del;
                };
                ;
                DataAccessService.prototype.baseUrl = function () {
                    if (this instanceof services.ConsultantDataService)
                        return this.configService.appSettings.urls.consultant;
                };
                ;
                DataAccessService.prototype.create = function (url) {
                };
                DataAccessService.prototype.composeUrl = function (urlfragment) {
                    if (urlfragment.indexOf("/") === -1) {
                        urlfragment = this.configService.api.url.fragments[urlfragment];
                    }
                    return this.baseUrl() + this.configService.api.apiVersion + urlfragment;
                };
                ;
                DataAccessService.prototype.composeFragmentWithVersion = function (urlFragment) {
                    if (urlFragment.indexOf("/") === -1) {
                        urlFragment = this.configService.api.url.fragments[urlFragment];
                    }
                    return this.configService.api.apiVersion + urlFragment;
                };
                ;
                DataAccessService.prototype.signAnonymousRequest = function (url) {
                    return this.anonymousMethodConfigs;
                };
                ;
                DataAccessService.prototype.getAnonymousResource = function (urlFragment) {
                    var methodConfig = this.signAnonymousRequest(this.composeFragmentWithVersion(urlFragment));
                    var url = this.composeUrl(urlFragment);
                    return this.$resource(url, null, methodConfig);
                };
                ;
                DataAccessService.prototype.getAnonymousOptions = function (urlFragment) {
                    var methodsConfig = this.signAnonymousRequest(this.composeFragmentWithVersion(urlFragment));
                    var url = this.composeUrl(urlFragment);
                    var options;
                    return options = {
                        url: url,
                        paramsDefault: null,
                        headers: methodsConfig.get.headers.Authorization,
                        cancellable: true,
                        stripTrailingSlashes: true
                    };
                };
                ;
                DataAccessService.$inject = ["$resource", "configService"];
                return DataAccessService;
            }());
            services.DataAccessService = DataAccessService;
            angular.module(common.moduleName).service("dataService", DataAccessService);
        })(services = common.services || (common.services = {}));
    })(common = agence.common || (agence.common = {}));
})(agence || (agence = {}));
