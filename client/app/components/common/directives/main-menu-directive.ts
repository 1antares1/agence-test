namespace agence.common.directives {

    export class MainMenuDirective implements ng.IDirective {
        public restrict: string = "A";
        public templateUrl: any = 'app/components/common/views/main-menu.html';
        public controller = agence.common.controllers.MenuController;
        public controllerAs = "vm";
        constructor() {}
    }

    angular.module(moduleName).directive("mainMenu", [() => new agence.common.directives.MainMenuDirective()]);
}