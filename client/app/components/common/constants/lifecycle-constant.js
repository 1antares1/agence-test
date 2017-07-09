var agence;
(function (agence) {
    var common;
    (function (common) {
        var constants;
        (function (constants) {
            var CRUD;
            (function (CRUD) {
                CRUD[CRUD["create"] = 0] = "create";
                CRUD[CRUD["read"] = 1] = "read";
                CRUD[CRUD["update"] = 2] = "update";
                CRUD[CRUD["delete"] = 3] = "delete";
            })(CRUD = constants.CRUD || (constants.CRUD = {}));
            var LifeCycleConstant = (function () {
                function LifeCycleConstant() {
                }
                LifeCycleConstant.lifeCycleApp = {
                    IS_HTTP_REQUEST_VALID: false,
                    DEFAULT_BRANDING_LINK_ID: "brandingLogoLink",
                    DEFAULT_IMAGE_SRC: "./content/images/image-default.png",
                    DEFAULT_HEADER_LOGO_ID: "companyLogo",
                    DEFAULT_HEADER_LOGO_SRC: "/content/images/logo.png",
                    CONSULTANT_INFORMATION: null
                };
                return LifeCycleConstant;
            }());
            constants.LifeCycleConstant = LifeCycleConstant;
            angular.module(common.moduleName).constant("lifeCycle", [function () { return new LifeCycleConstant(); }]);
        })(constants = common.constants || (common.constants = {}));
    })(common = agence.common || (agence.common = {}));
})(agence || (agence = {}));
//# sourceMappingURL=lifecycle-constant.js.map