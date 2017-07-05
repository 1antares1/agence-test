var agence;
(function (agence) {
    var consultant;
    (function (consultant) {
        var $self;
        var List;
        (function (List) {
            List[List["available"] = 0] = "available";
            List[List["selected"] = 1] = "selected";
        })(List || (List = {}));
        var ActionType;
        (function (ActionType) {
            ActionType[ActionType["report"] = 0] = "report";
            ActionType[ActionType["graphic"] = 1] = "graphic";
            ActionType[ActionType["cake"] = 2] = "cake";
        })(ActionType || (ActionType = {}));
        var ConsultantsController = (function () {
            function ConsultantsController($state, $stateParams, serviceFacade, ngUtil, localize, DTOptionsBuilder, DTColumnBuilder, $compile, $scope) {
                this.$state = $state;
                this.$stateParams = $stateParams;
                this.serviceFacade = serviceFacade;
                this.ngUtil = ngUtil;
                this.localize = localize;
                this.DTOptionsBuilder = DTOptionsBuilder;
                this.DTColumnBuilder = DTColumnBuilder;
                this.$compile = $compile;
                this.$scope = $scope;
                this.baseRoute = "app.consultant";
                this.dtInstance = {};
                this.init();
            }
            ConsultantsController.prototype.init = function () {
                $self = this;
                $self.$scope.consultants = $self;
                $self.$scope.performance.loading = true;
                $self.loadDependencyData();
                $self.refresh();
            };
            ConsultantsController.prototype.loadDependencyData = function () {
                $self = this;
                $self.typeReports = [{
                        value: ActionType.report,
                        text: "Relátorio"
                    },
                    {
                        value: ActionType.graphic,
                        text: "Gráfico"
                    },
                    {
                        value: ActionType.cake,
                        text: "Pizza"
                    }
                ];
            };
            ConsultantsController.prototype.toggleItem = function (to, item) {
                $self = this;
                var _user;
                var _switchElements = function (fromModels, toModels) {
                    if (fromModels && fromModels.length) {
                        _user = _.remove(fromModels, {
                            "co_usuario": item.co_usuario
                        })[0];
                        if (_user) {
                            if (!toModels) {
                                switch (to) {
                                    case List.available:
                                        toModels = ($self.toUsers = new Array());
                                        break;
                                    case List.selected:
                                        toModels = ($self.fromUsers = new Array());
                                        break;
                                }
                            }
                            toModels.push(_user);
                        }
                    }
                };
                switch (to) {
                    case List.available:
                        _switchElements($self.fromUsers, $self.toUsers);
                        break;
                    case List.selected:
                        _switchElements($self.toUsers, $self.fromUsers);
                        break;
                }
            };
            ConsultantsController.prototype.refresh = function () {
                var $self = this;
                $self.$scope.performance.onReadyStateChange(false, "Loading...");
                $self.serviceFacade.consultant.getConsultantResource(true).query(function (consultants) {
                    $self.originalModels = consultants;
                    $self.fromUsers = angular.copy($self.originalModels);
                    $self.$scope.performance.onProcessing(false);
                    $self.$scope.performance.loadDependencyData();
                }, function (reason) {
                    $self.$scope.performance.onFailed(reason);
                });
            };
            ConsultantsController.prototype.executeReport = function (type) {
                $self = this;
                var _name;
                $self.consultantAction = type;
                $self.userAmounts = null;
                switch (type) {
                    case ActionType.report:
                        _name = "_PerformanceActionReport_";
                        $self.getPerformanceReport();
                        break;
                    case ActionType.graphic:
                        _name = "_PerformanceActionGraphic_";
                        break;
                    case ActionType.cake:
                        _name = "_PerformanceActionCake_";
                        break;
                }
                $self.actionName = $self.localize.getLocalizedString(_name);
            };
            ConsultantsController.prototype.getPerformanceReport = function () {
                $self = this;
                $self.$scope.performance.loading = true;
                $self.$scope.performance.onReadyStateChange(false, "Carregando...");
                if ($self.toUsers && $self.toUsers.length) {
                    var _userList = $self.toUsers.map(function (value, index, array) {
                        return value.co_usuario;
                    });
                    $self.serviceFacade.consultant.getConsultantsReportResource().save(({
                        fromDate: ($self.fromSubmissionDate) ? moment($self.fromSubmissionDate).format("YYYY-MM-DD") : moment("1976-01-01").format("YYYY-MM-DD"),
                        toDate: ($self.toSubmissionDate) ? moment($self.toSubmissionDate).format("YYYY-MM-DD") : moment(new Date()).format("YYYY-MM-DD"),
                        userList: _userList.join("|")
                    }), function (consultantReport) {
                        $self.userAmounts = (Object.keys(consultantReport).length && Object.keys(consultantReport).length > 2) ? consultantReport : null;
                        $self.$scope.performance.onProcessing(false);
                    }, function (reason) {
                        $self.userAmounts = null;
                        $self.$scope.performance.onFailed(reason);
                    });
                }
            };
            ConsultantsController.prototype.getMonthName = function (monthNumber) {
                $self = this;
                var _name;
                var _months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro", "Unknown"];
                return _months[(!isNaN(monthNumber) ? monthNumber : 12)];
            };
            ConsultantsController.prototype.getBalance = function (key, data) {
                $self = this;
                var _balance = 0;
                if (data && data.length) {
                    for (var i = 0; i < data.length; i++) {
                        if (!data[i].information[key]) {
                            break;
                        }
                        _balance += data[i].information[key] || 0;
                    }
                }
                return _balance.toFixed(2);
            };
            ConsultantsController.prototype.remove = function (notary) {
                var _this = this;
                var $self = this, _content = {
                    name: notary.co_usuario + ' ' + notary.co_usuario
                }, _callbackResult = function (reason, success) {
                    if (success) {
                        _this.serviceFacade.notification.success(reason);
                    }
                    else {
                        $self.$scope.members.onFailed(reason);
                    }
                    angular.element('.dataTables_processing').hide();
                };
            };
            return ConsultantsController;
        }());
        ConsultantsController.$inject = [
            "$state", "$stateParams", "serviceFacade", "utilService", "localize", "DTOptionsBuilder", "DTColumnBuilder", "$compile", "$scope"
        ];
        consultant.ConsultantsController = ConsultantsController;
        angular.module(consultant.moduleName).controller("consultantsController", ConsultantsController);
    })(consultant = agence.consultant || (agence.consultant = {}));
})(agence || (agence = {}));
//# sourceMappingURL=consultants-controller.js.map