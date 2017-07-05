var agence;
(function (agence) {
    var common;
    (function (common) {
        var directives;
        (function (directives) {
            var HeaderDirective = (function () {
                function HeaderDirective() {
                    this.restrict = "A";
                    this.templateUrl = 'app/components/common/views/header.html';
                    this.controllerAs = "vm";
                }
                return HeaderDirective;
            }());
            directives.HeaderDirective = HeaderDirective;
            angular.module(common.moduleName).directive("header", [function () { return new HeaderDirective(); }]);
        })(directives = common.directives || (common.directives = {}));
    })(common = agence.common || (agence.common = {}));
})(agence || (agence = {}));
//# sourceMappingURL=header-directive.js.map