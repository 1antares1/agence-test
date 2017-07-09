var agence;
(function (agence) {
    var common;
    (function (common) {
        var factories;
        (function (factories) {
            var $self;
            var Localize = (function () {
                function Localize($http, $rootScope, $window) {
                    this.$http = $http;
                    this.$rootScope = $rootScope;
                    this.$window = $window;
                    this.resourcesListenerName = "localizeResourcesUpdated";
                    $self = this;
                    $self.init();
                }
                Localize.prototype.init = function () {
                    $self.language = $self.$window.navigator.userLanguage || $self.$window.navigator.language;
                    $self.initLocalizedResources();
                };
                Localize.prototype.initLocalizedResources = function () {
                    var url = $self.url || $self.buildUrl();
                    $self.$http({ method: "GET", url: url, cache: false })
                        .then(function (promiseValue) {
                        $self.successCallback(promiseValue.data);
                    }).catch(function (reason) {
                        var url = "assets/i18n/resources-locale-en-US.js";
                        $self.$http({ method: "GET", url: url, cache: false }).then(function (promiseValue) {
                            $self.successCallback(promiseValue.data);
                        });
                    });
                };
                Localize.prototype.buildUrl = function () {
                    $self = this;
                    if (!$self.language) {
                        var lang = void 0, androidLang = void 0;
                        if ($self.$window.navigator && $self.$window.navigator.userAgent && (androidLang = $self.$window.navigator.userAgent.match(/android.*\W(\w\w)-(\w\w)\W/i))) {
                            lang = androidLang[1];
                        }
                        else {
                            lang = $self.$window.navigator.userLanguage || $self.$window.navigator.language;
                        }
                        $self.language = lang;
                    }
                    return "".concat("assets/i18n/resources-locale-", $self.language, ".js");
                };
                Localize.prototype.successCallback = function (response) {
                    $self.dictionary = (response != null && response.data != null) ? response.data : response;
                    if ($self.dictionary != undefined && $self.dictionary.length) {
                        $self.resourceFileLoaded = true;
                        $self.$rootScope.$broadcast($self.resourcesListenerName);
                    }
                };
                Localize.prototype.setLanguage = function (value) {
                    $self.language = value;
                    $self.initLocalizedResources();
                };
                Localize.prototype.setUrl = function (value) {
                    $self.url = value;
                    $self.initLocalizedResources();
                };
                Localize.prototype.getLocalizedString = function (value) {
                    var _result = "Value Not found";
                    var _entry;
                    if ($self.dictionary && $self.dictionary.length) {
                        _entry = $self.dictionary.filter(function (val, idx, arr) {
                            return val.key === value;
                        });
                        _result = (_entry && _entry.length) ? _entry[0].value : _result;
                    }
                    switch (value) {
                        case "_Copyright_":
                            _result = _result.replace(/\{\{|\}\}|\{(\d+)\}/g, new Date().getFullYear().toString());
                            break;
                        case "_CopyrightShort_":
                            _result = _result.replace(/\{\{|\}\}|\{(\d+)\}/g, new Date().getFullYear().toString());
                            break;
                    }
                    return _result;
                };
                Localize.$inject = ["$http", "$rootScope", "$window"];
                return Localize;
            }());
            factories.Localize = Localize;
            ;
            function factory($http, $rootScope, $window) {
                return new Localize($http, $rootScope, $window);
            }
            angular.module(common.moduleName).factory("localize", factory);
        })(factories = common.factories || (common.factories = {}));
    })(common = agence.common || (agence.common = {}));
})(agence || (agence = {}));
//# sourceMappingURL=localize-factory.js.map