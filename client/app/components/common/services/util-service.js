var agence;
(function (agence) {
    var common;
    (function (common) {
        var services;
        (function (services) {
            var Browser;
            (function (Browser) {
                Browser[Browser["msie"] = 0] = "msie";
                Browser[Browser["edge"] = 1] = "edge";
                Browser[Browser["chrome"] = 2] = "chrome";
                Browser[Browser["firefox"] = 3] = "firefox";
                Browser[Browser["safari"] = 4] = "safari";
            })(Browser = services.Browser || (services.Browser = {}));
            var UtilService = (function () {
                function UtilService($templateCache, $window) {
                    this.$templateCache = $templateCache;
                    this.$window = $window;
                }
                UtilService.prototype.s4 = function () {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                };
                UtilService.prototype.isUndefinedOrNull = function (val) {
                    return angular.isUndefined(val) || val === null;
                };
                UtilService.prototype.isNullOrEmpty = function (val) {
                    return angular.isUndefined(val) || val === null || val.toString() === "";
                };
                UtilService.prototype.startsWith = function (text, pattern) {
                    var $self = this;
                    var _result = false;
                    if (!$self.isNullOrEmpty(text) && !$self.isNullOrEmpty(pattern)) {
                        _result = text.slice(-pattern.length) === pattern;
                    }
                    return _result;
                };
                UtilService.prototype.generateGuid = function () {
                    return this.s4() + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" +
                        this.s4() + "-" + this.s4() + this.s4() + this.s4();
                };
                UtilService.prototype.getDeviceName = function () {
                    var $self = this, name = "unknown", userAgent = $self.$window.navigator.userAgent, browsers = { msie: /internet explorer/i, ie11: /Trident\/7\./, edge: /edge/i, chrome: /chrome/i, safari: /safari/i, firefox: /firefox/i };
                    for (var key in browsers) {
                        if (browsers[key].test(userAgent)) {
                            if (key === "internet explorer" || key === "ie11") {
                                return Browser.msie;
                            }
                            return Browser[parseInt(key)];
                        }
                    }
                    ;
                };
                UtilService.prototype.format = function (sentence) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    var newString, argsCount = args.length;
                    return sentence.replace(/\{\{|\}\}|\{(\d+)\}/g, function (m, n) {
                        if (m == "{{") {
                            return "{";
                        }
                        if (m == "}}") {
                            return "}";
                        }
                        return args[n];
                    });
                };
                UtilService.prototype.stringToDate = function (text) {
                    var _strToNum = Date.parse(text);
                    if (isNaN(_strToNum)) {
                        return null;
                    }
                    var _newDate = new Date(text);
                    return _newDate = new Date(_newDate.setDate(_newDate.getDate() + 1));
                };
                UtilService.prototype.timeToDate = function (text) {
                    if (this.isNullOrEmpty(text)) {
                        return null;
                    }
                    var _newDate;
                    return moment(text, ["h:m A", "H:m"]).toDate();
                };
                UtilService.prototype.concatDateWithTime = function (dateValue, timeValue) {
                    if (this.isNullOrEmpty(dateValue) || this.isNullOrEmpty(timeValue) || isNaN(Date.parse(dateValue.toDateString())) || isNaN(Date.parse(timeValue.toDateString()))) {
                        return null;
                    }
                    return new Date(dateValue.getFullYear(), dateValue.getMonth(), dateValue.getDate(), timeValue.getHours(), timeValue.getMinutes(), timeValue.getSeconds(), timeValue.getMilliseconds());
                };
                UtilService.prototype.paddy = function (value, padCount, character) {
                    var pad_char = (!this.isNullOrEmpty(character)) ? character : "0";
                    var pad = new Array(1 + padCount).join(pad_char);
                    return (pad + value).slice(-pad.length);
                };
                UtilService.prototype.compare = function (phrase, compareTo) {
                    var _result = false;
                    if (phrase && compareTo && compareTo !== "") {
                        _result = phrase.toLowerCase().indexOf(compareTo.toLowerCase()) !== -1;
                    }
                    return _result;
                };
                UtilService.prototype.cleanText = function (value) {
                    return (!this.isNullOrEmpty(value)) ? value : "";
                };
                UtilService.prototype.execLeavePageConfirm = function (confirmMessage) {
                    var _this = this;
                    var _confirmEvent = function () {
                        if (_this.confirmPageExit) {
                            return confirmMessage;
                        }
                        else {
                            _clearEvents();
                        }
                    };
                    var _clearPageSession = function () {
                        if (_this.clearPageSesion) {
                            _clearEvents();
                        }
                        else {
                            _this.$window.onbeforeunload = function () { return _confirmEvent(); };
                            _this.$window.onunload = function () { return _clearPageSession(); };
                        }
                    };
                    var _clearEvents = function () {
                        _this.$window.onbeforeunload = null;
                        _this.$window.onunload = null;
                    };
                    _clearPageSession();
                };
                UtilService.prototype.togglePageSessionVariables = function (value) {
                    this.confirmPageExit = value;
                    this.clearPageSesion = value;
                };
                UtilService.$inject = ["$templateCache", "$window"];
                return UtilService;
            }());
            services.UtilService = UtilService;
            angular.module(agence.appName).service("utilService", UtilService);
        })(services = common.services || (common.services = {}));
    })(common = agence.common || (agence.common = {}));
})(agence || (agence = {}));
