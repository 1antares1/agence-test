namespace agence.customer {

    import services = agence.common.services;
    import models = agence.common.models;
    import common = agence.common;

    interface IUsers {
        DTOptionsBuilder: any;
        DTColumnBuilder: any;
    }

    export interface CustomersControllerScope extends agence.performance.PerformanceControllerScope {
        customers: CustomersController;
    }

    export class CustomersController {
        models: Array < models.ICustomer > ;
        originalModels: Array < models.ICustomer > ;
        dtOptions: any;
        dtColumns: any;
        dtInstance: any = {}

        static $inject = [
            "$state", "serviceFacade", "utilService", "localize", "DTOptionsBuilder", "DTColumnBuilder", "$compile", "$scope", "$rootScope"
        ]

        constructor(
            protected $state: angular.ui.IStateService, protected serviceFacade: services.IServiceFacade, protected utilService: services.IUtilService, protected localize: any, private DTOptionsBuilder: any, private DTColumnBuilder: any, private $compile: ng.ICompileService, public $scope: CustomersControllerScope, public $rootScope: ng.IRootScopeService
        ) {
            this.init();
        }

        init(): void {
            let self = this;
            self.refresh();
            this.$scope.customers = self;
            let scopeMember = this.$scope.members.loading = true;
        }
        refresh(): void {
            //
        }

        onError(reason: any) {
            this.serviceFacade.notification.failed(reason);
        }
    }
    angular.module(moduleName).controller("customersController", CustomersController);
}