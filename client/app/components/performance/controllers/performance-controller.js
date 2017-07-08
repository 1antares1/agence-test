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
    var performance;
    (function (performance) {
        "use strict";
        var common = agence.common;
        var $self;
        var PerformanceController = (function (_super) {
            __extends(PerformanceController, _super);
            function PerformanceController($scope, $state, serviceFacade, ngUtil, localize) {
                var _this = _super.call(this, serviceFacade) || this;
                _this.$scope = $scope;
                _this.$state = $state;
                _this.serviceFacade = serviceFacade;
                _this.ngUtil = ngUtil;
                _this.localize = localize;
                _this.addNotaryLabel = "_NotariesAddBtn_";
                _super.prototype.init.call(_this);
                _this.init();
                return _this;
            }
            PerformanceController.prototype.init = function () {
                var $self = this, _stateParams = $self.$state.params;
                this.$scope.performance = $self;
                $self.loading = false;
                $self.activeTab = 0;
                $self.onReadyStateChange(true, null);
                $self.loadDependencyData();
            };
            PerformanceController.prototype.loadDependencyData = function () {
                $self = this;
            };
            PerformanceController.prototype.getPerformanceItems = function () {
                var $self = this;
                var _performanceItems;
                var _baseCss = "btn btn-primary pull-right login-btn-top save ";
                return _performanceItems;
            };
            PerformanceController.prototype.getNotaryItems = function () {
                var $self = this;
                var _notaryDetailsItems;
                return _notaryDetailsItems;
            };
            PerformanceController.prototype.callAction = function (element) {
                var self = this;
                if (!self.ngUtil.isNullOrEmpty(element)) {
                    switch (element) {
                        case "exportNotaryList":
                            self.sendNotariesByEmail();
                            break;
                    }
                }
            };
            PerformanceController.prototype.getTabName = function (index) {
                $self = this;
                var _tabKeyNames = ["_PerformanceTabConsultant_", "_PerformanceTabCustomer_", "_SystemKeyErrorOrInvalid_"];
                var _getString = function (keyName) {
                    return $self.localize.getLocalizedString(keyName);
                };
                return _getString(_tabKeyNames[index]);
            };
            PerformanceController.prototype.sendNotariesByEmail = function () {
                var $self = this;
                var _callbackResult = function (isSucess, reason) {
                    if (isSucess) {
                        $self.onSuccess();
                        $self.notification(common.APIMessageType.success, reason.toString());
                    }
                    else {
                        $self.onFailed(reason);
                    }
                    $self.onReadyStateChange(true, null);
                };
            };
            PerformanceController.$inject = ["$scope", "$state", "serviceFacade", "utilService", "localize"];
            return PerformanceController;
        }(common.controllers.BaseController));
        performance.PerformanceController = PerformanceController;
        angular.module(performance.moduleName).controller("performanceController", PerformanceController);
    })(performance = agence.performance || (agence.performance = {}));
})(agence || (agence = {}));
//# sourceMappingURL=performance-controller.js.map