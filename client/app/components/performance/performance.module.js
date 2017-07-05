var agence;
(function (agence) {
    var performance;
    (function (performance) {
        performance.moduleName = "agence-performance";
        var dependencies = [
            "ui.router",
            "agence-consultant",
            "agence-customer"
        ];
        angular.module(performance.moduleName, dependencies);
    })(performance = agence.performance || (agence.performance = {}));
})(agence || (agence = {}));
//# sourceMappingURL=performance.module.js.map