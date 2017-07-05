var agence;
(function (agence) {
    var dashboard;
    (function (dashboard) {
        dashboard.moduleName = 'agence-dashboard';
        var dependencies = new Array();
        angular.module(dashboard.moduleName, dependencies);
    })(dashboard = agence.dashboard || (agence.dashboard = {}));
})(agence || (agence = {}));
//# sourceMappingURL=dashboard.module.js.map