module agence.common.directives{
    "use strict";
    export class BusyDirective implements ng.IDirective {
        public restrict: string = "AE";
        public template = `<aside class="nna-layer-loading" ng-if="vm.loading || vmn.loading">
                                <div class="busy-container"></div>
                                <div class="spinner-background-2 nna-left-50">
                                    <label i18n="_Loading_"></label><br>
                                    <div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div>
                                </div>
                           </aside>`;
        constructor() { }
    }
    
    angular.module(moduleName).directive("busy", [()=>new agence.common.directives.BusyDirective()]);
}