var agence;
(function (agence) {
    var customer;
    (function (customer) {
        var CustomersController = (function () {
            function CustomersController($state, serviceFacade, utilService, localize, DTOptionsBuilder, DTColumnBuilder, $compile, $scope, $rootScope) {
                this.$state = $state;
                this.serviceFacade = serviceFacade;
                this.utilService = utilService;
                this.localize = localize;
                this.DTOptionsBuilder = DTOptionsBuilder;
                this.DTColumnBuilder = DTColumnBuilder;
                this.$compile = $compile;
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.dtInstance = {};
                this.init();
            }
            CustomersController.prototype.init = function () {
                var self = this;
                self.refresh();
                this.$scope.customers = self;
                var scopeMember = this.$scope.members.loading = true;
            };
            CustomersController.prototype.refresh = function () {
            };
            CustomersController.prototype.onError = function (reason) {
                this.serviceFacade.notification.failed(reason);
            };
            CustomersController.$inject = [
                "$state", "serviceFacade", "utilService", "localize", "DTOptionsBuilder", "DTColumnBuilder", "$compile", "$scope", "$rootScope"
            ];
            return CustomersController;
        }());
        customer.CustomersController = CustomersController;
        angular.module(customer.moduleName).controller("customersController", CustomersController);
    })(customer = agence.customer || (agence.customer = {}));
})(agence || (agence = {}));
//# sourceMappingURL=customers-controller.js.map