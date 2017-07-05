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
    var dashboard;
    (function (dashboard) {
        var controllers = agence.common.controllers;
        var $self;
        var DashboardController = (function (_super) {
            __extends(DashboardController, _super);
            function DashboardController($state, serviceFacade, ngUtil) {
                var _this = _super.call(this, serviceFacade) || this;
                _this.$state = $state;
                _this.serviceFacade = serviceFacade;
                _this.ngUtil = ngUtil;
                _this.init();
                return _this;
            }
            DashboardController.prototype.init = function () {
                $self = this;
            };
            DashboardController.prototype.loadDependencyData = function () {
                $self = this;
            };
            DashboardController.prototype.go = function (tabName, tabIndex, statusId) {
            };
            DashboardController.prototype.onReadyStateChange = function (isReady, message) {
            };
            return DashboardController;
        }(controllers.BaseController));
        DashboardController.$inject = ["$state", "serviceFacade", "utilService"];
        angular.module(dashboard.moduleName).controller("dashboardController", DashboardController);
    })(dashboard = agence.dashboard || (agence.dashboard = {}));
})(agence || (agence = {}));
//# sourceMappingURL=dashboard-controller.js.map