var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var agence;
(function (agence) {
    var common;
    (function (common) {
        var controllers;
        (function (controllers) {
            var $self;
            var Tab = (function () {
                function Tab(name, url, i18n, status) {
                    this.name = name;
                    this.url = url;
                    this.i18n = i18n;
                    this.status = status;
                }
                return Tab;
            }());
            controllers.Tab = Tab;
            var TopMenu = (function (_super) {
                __extends(TopMenu, _super);
                function TopMenu() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return TopMenu;
            }(Tab));
            controllers.TopMenu = TopMenu;
            var MenuController = (function (_super) {
                __extends(MenuController, _super);
                function MenuController($rootScope, $scope, $state, serviceFacade, ngUtil, lifeCycle, localize, branding) {
                    var _this = _super.call(this, serviceFacade) || this;
                    _this.$rootScope = $rootScope;
                    _this.$scope = $scope;
                    _this.$state = $state;
                    _this.serviceFacade = serviceFacade;
                    _this.ngUtil = ngUtil;
                    _this.lifeCycle = lifeCycle;
                    _this.localize = localize;
                    _this.branding = branding;
                    _this.appRoute = "app".concat(".");
                    _this.userIsNotary = false;
                    _this.composeTabs = new Array("app.performance");
                    _this.staticViews = new Array();
                    $self = _this;
                    _this.init();
                    _this.initSettings();
                    return _this;
                }
                MenuController.getTabs = function () {
                    var _tabs, _isTab;
                    var _filterTabs = function () {
                        _tabs = _tabs.filter(function (tabValue, tabIdx, tabArray) {
                            _isTab = false;
                            return _isTab;
                        });
                    };
                    return _tabs;
                };
                MenuController.prototype.init = function () {
                    var _this = this;
                    $self = this;
                    this.$rootScope.$on('$stateChangeSuccess', function (event, args) {
                        if (_this.staticViews.lastIndexOf(args.name) === -1) {
                            document.body.scrollTop = document.documentElement.scrollTop = 0;
                        }
                        if (!$self.ngUtil.isUndefinedOrNull(_this.current) && _this.current.name !== _this.$state.current.name) {
                            _this.initContext();
                        }
                    });
                };
                MenuController.prototype.initSettings = function () {
                    $self = this;
                    $self.branding.logoId = common.constants.LifeCycleConstant.lifeCycleApp.DEFAULT_HEADER_LOGO_ID;
                };
                MenuController.prototype.initContext = function () {
                    var _this = this;
                    $self = this;
                    this.tabs = MenuController.getTabs();
                    if (!$self.ngUtil.isUndefinedOrNull($self.$state.current) && !$self.ngUtil.isUndefinedOrNull(this.tabs)) {
                        $self.current = this.tabs.filter(function (value, index, array) {
                            return (value.url === $self.$state.current.name)
                                || (_this.tabs[2] != null && value.name === _this.tabs[2].name && ($self.$state.current.name.indexOf($self.composeTabs[0]) != -1))
                                || ($self.$state.current.name.indexOf($self.composeTabs[0]) != -1
                                    && (_this.tabs[1] != null && value.url === _this.tabs[1].url));
                        })[0];
                    }
                    if ($self.ngUtil.isUndefinedOrNull($self.current)) {
                        $self.current = (!$self.ngUtil.isUndefinedOrNull(this.tabs) ? this.tabs[0] : null);
                    }
                };
                return MenuController;
            }(controllers.BaseController));
            MenuController.$inject = [
                "$rootScope",
                "$scope",
                "$state",
                "serviceFacade",
                "utilService",
                "lifeCycle",
                "localize",
                "branding"
            ];
            controllers.MenuController = MenuController;
        })(controllers = common.controllers || (common.controllers = {}));
    })(common = agence.common || (agence.common = {}));
})(agence || (agence = {}));
//# sourceMappingURL=menu-controller.js.map