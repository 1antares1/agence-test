var agence;
(function (agence) {
    var customer;
    (function (customer) {
        customer.moduleName = "agence-customer";
        angular.module(customer.moduleName, []);
    })(customer = agence.customer || (agence.customer = {}));
})(agence || (agence = {}));
