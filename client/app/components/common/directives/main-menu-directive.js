var agence;
(function (agence) {
    var common;
    (function (common) {
        var directives;
        (function (directives) {
            var MainMenuDirective = (function () {
                function MainMenuDirective() {
                    this.restrict = "A";
                    this.templateUrl = 'app/components/common/views/main-menu.html';
                    this.controller = agence.common.controllers.MenuController;
                    this.controllerAs = "vm";
                }
                return MainMenuDirective;
            }());
            directives.MainMenuDirective = MainMenuDirective;
            angular.module(common.moduleName).directive("mainMenu", [function () { return new agence.common.directives.MainMenuDirective(); }]);
        })(directives = common.directives || (common.directives = {}));
    })(common = agence.common || (agence.common = {}));
})(agence || (agence = {}));
