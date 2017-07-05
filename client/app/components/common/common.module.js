var agence;
(function (agence) {
    var common;
    (function (common) {
        common.moduleName = "agence-common";
        var APIConcepts;
        (function (APIConcepts) {
            APIConcepts[APIConcepts["consultants"] = 0] = "consultants";
            APIConcepts[APIConcepts["report"] = 1] = "report";
        })(APIConcepts = common.APIConcepts || (common.APIConcepts = {}));
        var APIMessageType;
        (function (APIMessageType) {
            APIMessageType[APIMessageType["error"] = 0] = "error";
            APIMessageType[APIMessageType["failed"] = 1] = "failed";
            APIMessageType[APIMessageType["information"] = 2] = "information";
            APIMessageType[APIMessageType["success"] = 3] = "success";
            APIMessageType[APIMessageType["warning"] = 4] = "warning";
        })(APIMessageType = common.APIMessageType || (common.APIMessageType = {}));
        var _dependencies = ["toaster"];
        angular.module(common.moduleName, _dependencies);
    })(common = agence.common || (agence.common = {}));
})(agence || (agence = {}));
//# sourceMappingURL=common.module.js.map