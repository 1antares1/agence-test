var agence;
(function (agence) {
    var common;
    (function (common) {
        var services;
        (function (services) {
            var UrlFragment = (function () {
                function UrlFragment(key, value) {
                    this.key = key;
                    this.value = value;
                }
                return UrlFragment;
            }());
            services.UrlFragment = UrlFragment;
            var Url = (function () {
                function Url() {
                    this.init();
                }
                Url.prototype.init = function () {
                    this.initFragments();
                };
                Url.prototype.initFragments = function () {
                    this.fragments = {};
                    this.fragments["consultants"] = "/consultants";
                    this.fragments["report"] = "/report";
                };
                return Url;
            }());
            services.Url = Url;
            var Api = (function () {
                function Api() {
                    this.url = new Url();
                    this.apiVersion = "/api";
                }
                return Api;
            }());
            services.Api = Api;
            var AppSettings = (function () {
                function AppSettings() {
                }
                return AppSettings;
            }());
            services.AppSettings = AppSettings;
            var ConfigService = (function () {
                function ConfigService(appsettings) {
                    this.appsettings = appsettings;
                    this.api = new Api();
                    this.appSettings = appsettings;
                }
                ConfigService.$inject = ["appSettings"];
                return ConfigService;
            }());
            services.ConfigService = ConfigService;
            angular.module(common.moduleName).service("configService", ConfigService);
        })(services = common.services || (common.services = {}));
    })(common = agence.common || (agence.common = {}));
})(agence || (agence = {}));
