namespace agence.common.directives {
    
    export class HeaderDirective implements ng.IDirective{
        public restrict: string = "A";
        public templateUrl: any = 'app/components/common/views/header.html';
        public controllerAs: string = "vm";
        constructor() {}
    }
    
    angular.module(moduleName).directive("header", [ () => new HeaderDirective()]);
}