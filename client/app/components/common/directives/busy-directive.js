var agence;
(function (agence) {
    var common;
    (function (common) {
        var directives;
        (function (directives) {
            "use strict";
            var BusyDirective = (function () {
                function BusyDirective() {
                    this.restrict = "AE";
                    this.template = "<aside class=\"nna-layer-loading\" ng-if=\"vm.loading || vmn.loading\">\n                                <div class=\"busy-container\"></div>\n                                <div class=\"spinner-background-2 nna-left-50\">\n                                    <label i18n=\"_Loading_\"></label><br>\n                                    <div class=\"bounce1\"></div><div class=\"bounce2\"></div><div class=\"bounce3\"></div>\n                                </div>\n                           </aside>";
                }
                return BusyDirective;
            }());
            directives.BusyDirective = BusyDirective;
            angular.module(common.moduleName).directive("busy", [function () { return new agence.common.directives.BusyDirective(); }]);
        })(directives = common.directives || (common.directives = {}));
    })(common = agence.common || (agence.common = {}));
})(agence || (agence = {}));
