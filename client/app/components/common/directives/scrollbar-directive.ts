module agence.common.directives {

    export class ScrollOnDirective implements ng.IDirective {
        public restrict: string = "A";

        public link($scope: ng.IScope, elem: models.IAugmentedJQueryExtend, attrs: ng.IAttributes, controller: ng.INgModelController): void {
            let element = angular.element(elem) as models.IAugmentedJQueryExtend;
            element.click((event: JQueryEventObject) => {
                jQuery("body").animate({ scrollTop: (attrs["scrollOnClick"] === "bottom") ? -element.offset().top : element.offset().top }, "slow");
            });
        }
    }

    angular.module(agence.appName).directive("scrollOnClick", [() => new ScrollOnDirective()]);
}