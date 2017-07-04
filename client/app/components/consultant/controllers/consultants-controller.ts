namespace agence.consultant {

    import services = agence.common.services;
    import models = agence.common.models;
    import controllers = agence.common.controllers;
    declare var _: any;
    
    let $self: ConsultantsController;

    enum List {
        available,
        selected
    }

    enum ActionType {
        report,
        graphic,
        cake
    }

    export interface ConsultantsControllerScope extends agence.performance.PerformanceControllerScope {
        consultants: ConsultantsController;
    }

    export class ConsultantsController {
        public performanceController: agence.performance.PerformanceController;

        // business data
        originalModels: models.IConsultant[];
        selectedUsers: models.IConsultant[];
        fromUsers: models.IConsultant[];
        toUsers: models.IConsultant[];
        modelDetails: models.IConsultantDetails;
        userAmounts: models.IPerformanceReport[];

        // dependency data
        fromSubmissionDate: Date;
        toSubmissionDate: Date;
        typeReports: models.ITuple[];
        actionName: string;
        consultantAction: number;

        // logical variables
        baseRoute: string = "app.consultant";

        // system variables
        dtOptions: any;
        dtColumns: any;
        dtInstance: any = {};

        static $inject = [
            "$state", "$stateParams", "serviceFacade", "utilService", "localize", "DTOptionsBuilder", "DTColumnBuilder", "$compile", "$scope"
        ];

        constructor(
            protected $state: ng.ui.IStateService, private $stateParams: models.IConsultantParams, protected serviceFacade: services.IServiceFacade, protected ngUtil: services.IUtilService, protected localize: any, private DTOptionsBuilder: any, private DTColumnBuilder: any, private $compile: ng.ICompileService, public $scope: ConsultantsControllerScope
        ) {
            this.init();
        }

        init(): void {
            $self = this;
            $self.$scope.consultants = $self;
            $self.$scope.performance.loading = true;
            $self.loadDependencyData();
            $self.refresh();
        }

        loadDependencyData(): void {
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
        }

        toggleItem(to: List, item: models.IConsultant) {
            $self = this;
            let _user: models.IConsultant;
            let _switchElements = (fromModels: models.IConsultant[], toModels: models.IConsultant[]): void => {
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
            }

            switch (to) {
                case List.available:
                    _switchElements($self.fromUsers, $self.toUsers);
                    break;
                case List.selected:
                    _switchElements($self.toUsers, $self.fromUsers);
                    break;
            }
        }

        refresh() {
            let $self = this;
            $self.$scope.performance.onReadyStateChange(false, "Loading...");
            $self.serviceFacade.consultant.getConsultantResource(true).query((consultants: models.IConsultant[]) => {
                $self.originalModels = consultants;
                $self.fromUsers = angular.copy($self.originalModels);
                $self.$scope.performance.onProcessing(false);
                $self.$scope.performance.loadDependencyData();

            }, (reason: any) => {
                $self.$scope.performance.onFailed(reason);
            });
        }

        executeReport(type: ActionType): void {
            $self = this;
            let _name: string;
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
        }

        getPerformanceReport(): void {
            $self = this;
            $self.$scope.performance.onReadyStateChange(false, "Carregando...");
            if ($self.toUsers && $self.toUsers.length) {
                let _userList: string[] = $self.toUsers.map((value: models.IConsultant, index: number, array: models.IConsultant[]) => {
                    return value.co_usuario;
                });

                $self.serviceFacade.consultant.getConsultantsReportResource().save(({
                    fromDate: ($self.fromSubmissionDate) ? moment($self.fromSubmissionDate).format("YYYY-MM-DD") : moment("1976-01-01").format("YYYY-MM-DD"),
                    toDate: ($self.toSubmissionDate) ? moment($self.toSubmissionDate).format("YYYY-MM-DD") : moment(new Date()).format("YYYY-MM-DD"),
                    userList: _userList.join("|")
                }), (consultantReport: models.IPerformanceReport[]) => {
                    $self.userAmounts = (Object.keys(consultantReport).length && Object.keys(consultantReport).length > 2) ? consultantReport : null;
                    $self.$scope.performance.onProcessing(false);
                }, (reason: any) => {
                    $self.userAmounts = null;
                    $self.$scope.performance.onFailed(reason);
                });
            }
        }

        getMonthName(monthNumber: number): string {
            $self = this;
            let _name: string;
            let _months: string[] = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro", "Unknown"];
            return _months[(!isNaN(monthNumber) ? monthNumber : 12)];
        }

        getBalance(key: string, data: models.IPerformanceReportMonth[]): string {
            $self = this;
            let _balance: number = 0;

            if(data && data.length) {
                for(let i = 0; i < data.length; i++) {
                    if(!(data[i].information as any)[key]) {
                        break;
                    }
                    _balance += (data[i].information as any)[key] || 0;
                }
            }
            return _balance.toFixed(2);
        }

        remove(notary: agence.common.models.IConsultant): void {
            let $self = this,
                _content = {
                    name: notary.co_usuario + ' ' + notary.co_usuario
                },
                _callbackResult = (reason: any, success: boolean) => {
                    if (success) {
                        this.serviceFacade.notification.success(reason as string);
                    } else {
                        $self.$scope.members.onFailed(reason);
                    }
                    angular.element('.dataTables_processing').hide();
                };
        }
    }

    angular.module(moduleName).controller("consultantsController", ConsultantsController);
}