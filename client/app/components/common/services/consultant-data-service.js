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
    var common;
    (function (common) {
        var services;
        (function (services) {
            var ConsultantDataService = (function (_super) {
                __extends(ConsultantDataService, _super);
                function ConsultantDataService($resource, configService, ngUtil) {
                    var _this = _super.call(this, $resource, configService) || this;
                    _this.$resource = $resource;
                    _this.configService = configService;
                    _this.ngUtil = ngUtil;
                    return _this;
                }
                ConsultantDataService.prototype.getConsultantResource = function (offUsers) {
                    var fragment = this.configService.api.url.fragments[common.APIConcepts[common.APIConcepts.consultants]];
                    var urlFragment = this.ngUtil.format("{0}/{1}", fragment, ((offUsers) ? 1 : 0));
                    return this.getAnonymousResource(urlFragment);
                };
                ConsultantDataService.prototype.getConsultantsReportResource = function () {
                    var fragment = this.configService.api.url.fragments[common.APIConcepts[common.APIConcepts.consultants]];
                    var urlFragment = this.ngUtil.format("{0}{1}", fragment, this.configService.api.url.fragments[common.APIConcepts[common.APIConcepts.report]]);
                    return this.getAnonymousResource(urlFragment);
                };
                ConsultantDataService.$inject = ["$resource", "configService", "utilService"];
                return ConsultantDataService;
            }(services.DataAccessService));
            services.ConsultantDataService = ConsultantDataService;
            angular.module(common.moduleName).service("consultantDataService", ConsultantDataService);
        })(services = common.services || (common.services = {}));
    })(common = agence.common || (agence.common = {}));
})(agence || (agence = {}));
//# sourceMappingURL=consultant-data-service.js.map