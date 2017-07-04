module agence.consultant {
    "use strict";

    export class ConsultantsDirective implements ng.IDirective {
        public restrict: string = "AE";
        public templateUrl: any = 'app/components/consultant/views/consultants.html';
        public controller = ConsultantsController;
        public controllerAs = "vmn";
        constructor() {}
    }
    angular.module(moduleName).directive("consultants", [() => new ConsultantsDirective()]);
}