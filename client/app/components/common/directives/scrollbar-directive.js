var agence;
(function (agence) {
    var common;
    (function (common) {
        var directives;
        (function (directives) {
            var ScrollOnDirective = (function () {
                function ScrollOnDirective() {
                    this.restrict = "A";
                }
                ScrollOnDirective.prototype.link = function ($scope, elem, attrs, controller) {
                    var element = angular.element(elem);
                    element.click(function (event) {
                        jQuery("body").animate({ scrollTop: (attrs["scrollOnClick"] === "bottom") ? -element.offset().top : element.offset().top }, "slow");
                    });
                };
                return ScrollOnDirective;
            }());
            directives.ScrollOnDirective = ScrollOnDirective;
            angular.module(agence.appName).directive("scrollOnClick", [function () { return new ScrollOnDirective(); }]);
        })(directives = common.directives || (common.directives = {}));
    })(common = agence.common || (agence.common = {}));
})(agence || (agence = {}));
//# sourceMappingURL=scrollbar-directive.js.map