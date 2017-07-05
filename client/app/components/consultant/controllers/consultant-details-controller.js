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
    var consultant;
    (function (consultant) {
        var $self;
        var controllers = agence.common.controllers;
        var NotaryDetailsController = (function (_super) {
            __extends(NotaryDetailsController, _super);
            function NotaryDetailsController(notaryScope, $compile, $state, $stateParams, $q, $timeout, $window, configService, serviceFacade, lifeCycle, ngUtil, localize, DTOptionsBuilder, DTColumnBuilder) {
                var _this = _super.call(this, serviceFacade) || this;
                _this.notaryScope = notaryScope;
                _this.$compile = $compile;
                _this.$state = $state;
                _this.$stateParams = $stateParams;
                _this.$q = $q;
                _this.$timeout = $timeout;
                _this.$window = $window;
                _this.configService = configService;
                _this.serviceFacade = serviceFacade;
                _this.lifeCycle = lifeCycle;
                _this.ngUtil = ngUtil;
                _this.localize = localize;
                _this.DTOptionsBuilder = DTOptionsBuilder;
                _this.DTColumnBuilder = DTColumnBuilder;
                _this.baseRoute = "app.consultant";
                _this.notaryDefaultState = "app.consultant.general";
                _this.baseRouteWizard = "app.consultant".concat(".");
                _this.ageLimit = 21;
                _this.isExternalEmployeeIdRequired = true;
                _this.dtInstance = {};
                _super.prototype.init.call(_this);
                _this.init();
                return _this;
            }
            NotaryDetailsController.prototype.init = function () {
                var _this = this;
                $self = this;
                $self.notaryScope.notaryDetails = this;
                $self.model = {};
                this.isAgeOk = true;
                if (this.$stateParams.id) {
                    this.loading = true;
                    this.notaryDetailsRefresh(function (success, message) {
                        if (!success) {
                            if (!$self.ngUtil.isNullOrEmpty(message) && message.toLowerCase().indexOf("notary not found") !== -1) {
                                var _params = {
                                    obj: {
                                        indexTab: 1,
                                        notaryStatus: 0
                                    }
                                };
                                $self.$state.go("app.members", _params);
                            }
                            else {
                                _this.$window.history.back();
                            }
                        }
                    });
                }
                else {
                }
                $self.loadDependencyData();
                this.returnUrl += "members";
                $self.scrollBarConfig = {
                    autoHideScrollbar: true,
                    theme: "dark-3",
                    advanced: {
                        updateOnContentResize: true
                    },
                    setHeight: 150,
                    scrollInertia: 350,
                    axis: "yx"
                };
                $self.initNotaryLogicVariables();
            };
            NotaryDetailsController.prototype.initNotaryLogicVariables = function () {
                $self = this;
                this.sendInvitation = false;
                this.calendars = new Array();
                var _now = new Date();
                var _fromDate = new Date((_now.getFullYear() - $self.ageLimit), _now.getMonth(), _now.getDate());
                $self.notaryScope.$on("localizeResourcesUpdated", function (event) {
                    $self.setupNotaryTabs();
                });
                if ($self.localize.resourceFileLoaded) {
                    $self.setupNotaryTabs();
                }
            };
            NotaryDetailsController.prototype.setupNotaryTabs = function () {
                $self = this;
                var _newConsultantTabs;
                _newConsultantTabs = [
                    new controllers.Tab("general", "app.consultant.general", $self.localize.getLocalizedString("_ConsultantGeneralTitle_"), "")
                ];
                _newConsultantTabs.some(function (value, index, array) {
                    $self.activeTab = null;
                    if (angular.equals($self.$state.current.name, $self.baseRoute)) {
                        $self.activeTab = 0;
                    }
                    else if ($self.$state.current.name === value.url) {
                        $self.activeTab = index;
                    }
                    if (!angular.equals($self.activeTab, null)) {
                        return true;
                    }
                });
                $self.notaryTabs = _newConsultantTabs;
            };
            NotaryDetailsController.prototype.loadDependencyData = function () {
                $self = this;
                $self.notaryActions = $self.getNotaryActions();
                $self.notaryActions = $self.notaryActions.filter(function (val, idx, arr) {
                    return val.key !== 3;
                });
            };
            NotaryDetailsController.prototype.getNotaryItems = function () {
                var $self = this;
                var _consultantDetailsItems;
                return _consultantDetailsItems;
            };
            NotaryDetailsController.prototype.notaryDetailsRefresh = function (callback) {
            };
            NotaryDetailsController.prototype.dtInstanceCallback = function (dtInstance) {
                $self.dtInstance = dtInstance;
                var _settings = $self.dtInstance.dataTable.fnSettings();
                var _dtSetup = {
                    inputSearchClass: "form-control",
                    inputSearchPlaceholder: "Type any...",
                    isProcessing: false,
                    isServerSide: false
                };
                $self.datatableSetup(_settings, _dtSetup);
            };
            NotaryDetailsController.prototype.isOlder = function (age) {
                $self = this;
                if (!$self.ngUtil.isNullOrEmpty(age)) {
                    var timeDiff = Math.abs(age.getTime() - new Date().getTime());
                    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    if ((diffDays / 365) >= 21) {
                        return $self.isAgeOk = true;
                    }
                }
                return $self.isAgeOk = false;
            };
            NotaryDetailsController.prototype.toggleLoading = function () {
                $self = this;
                $self.loading = (!$self.ngUtil.isUndefinedOrNull($self.loading)) ? !$self.loading : true;
                $self.isProcessing = (!$self.ngUtil.isUndefinedOrNull($self.isProcessing)) ? !$self.isProcessing : true;
            };
            NotaryDetailsController.prototype.togglePhoneForm = function () {
                $self = this;
                $self.isPhoneFormShown = !$self.isPhoneFormShown;
                $self.phoneFormToggleMessage = (($self.isPhoneFormShown) ? $self.localize.getLocalizedString("_LandingPageFormShownTooltip_") : $self.localize.getLocalizedString("_LandingPageFormHiddenTooltip_"));
                return $self.isPhoneFormShown;
            };
            NotaryDetailsController.prototype.do = function (generalFormValid, addressFormValid, phoneFormValid) {
                $self = this;
            };
            NotaryDetailsController.prototype.go = function (route) {
                $self = this;
                if (!$self.ngUtil.isUndefinedOrNull(route)) {
                    var _idParam = $self.$stateParams.id;
                    $self.oldStepWizard = $self.activeTab;
                }
            };
            NotaryDetailsController.prototype.goNext = function () {
                $self = this;
                $self.$state.go($self.baseRouteWizard.concat($self.notaryTabs[$self.currentStepWizard].name));
            };
            NotaryDetailsController.prototype.back = function () {
                var self = this;
                self.$state.transitionTo(this.returnUrl);
            };
            NotaryDetailsController.prototype.add = function (additionalInfoOnly) {
                $self = this;
                var _promises = new Array();
                var _isAnyPromise;
            };
            NotaryDetailsController.prototype.edit = function () {
            };
            NotaryDetailsController.prototype.switchTab = function (newTabId) {
                $self = this;
            };
            NotaryDetailsController.prototype.onNotaryDetailsSuccess = function (type, model) {
                $self = this;
                _super.prototype.onSuccess.call(this);
            };
            NotaryDetailsController.prototype.onFailed = function (response) {
                $self.toggleLoading();
                if (response instanceof String) {
                    $self.message = response.toString();
                    $self.serviceFacade.notification.failed(response.toString());
                }
            };
            return NotaryDetailsController;
        }(agence.common.controllers.BaseController));
        NotaryDetailsController.$inject = [
            "$scope",
            "$compile",
            "$state",
            "$stateParams",
            "$q",
            "$timeout",
            "$window",
            "configService",
            "serviceFacade",
            "lifeCycle",
            "utilService",
            "localize",
            "DTOptionsBuilder",
            "DTColumnBuilder"
        ];
        consultant.NotaryDetailsController = NotaryDetailsController;
        angular.module(consultant.moduleName).controller("notaryDetailsController", NotaryDetailsController);
    })(consultant = agence.consultant || (agence.consultant = {}));
})(agence || (agence = {}));
//# sourceMappingURL=consultant-details-controller.js.map