var agence;
(function (agence) {
    var common;
    (function (common) {
        var services;
        (function (services) {
            var ServiceFacade = (function () {
                function ServiceFacade(consultantDatService, notificationService, utilService, appSettings, lifeCycle, branding) {
                    this.consultant = consultantDatService;
                    this.notification = notificationService;
                    this.util = utilService;
                    this.appSettings = appSettings;
                    this.lifeCycle = lifeCycle;
                    this.branding = branding;
                }
                return ServiceFacade;
            }());
            ServiceFacade.$inject = [
                "consultantDataService",
                "notificationService",
                "utilService",
                "appSettings",
                "lifeCycle",
                "branding"
            ];
            services.ServiceFacade = ServiceFacade;
            angular.module(agence.appName).service("serviceFacade", ServiceFacade);
        })(services = common.services || (common.services = {}));
    })(common = agence.common || (agence.common = {}));
})(agence || (agence = {}));
//# sourceMappingURL=service-facade.js.map