module agence.common.directives {

    export class i18nDirective implements ng.IDirective {
        public restrict: string = "EAC";
        static $inject = ['localize'];
        constructor(private localize: factories.ILocalize) { }

        updateText(elm: Element, token: string) {
            try {
                var values = token.split("|");
                let keyRegex: RegExp = /\_([A-Z])\w+\_/g;
                let insertTo: string;

                if (values.length >= 1) {
                    // construct the tag to insert into the element
                    let tag: string = this.localize.getLocalizedString(values[0]);
                    // update the element only if data was returned
                    if (tag != null && tag != "" && tag != "Value Not found") {
                        if (values.length > 1) {
                            for (let index = 1; index < values.length; index++) {
                                if (keyRegex.test(values[index])) {
                                    let target = '{' + (index - 1) + '}';
                                    tag = tag.replace(target, values[index]);
                                    break;
                                }
                                insertTo = values[index];
                            }
                        }

                        // insert the text into the element
                        let element = angular.element(elm);
                        if ((element.children().length > 0 || element.contents().length > 0) && insertTo != null) {
                            switch(insertTo) {
                                case "append": element.append(tag);
                                    break;

                                case "prepend": element.prepend(tag);
                                    break;
                            }
                        }
                        else {
                            element.text(tag);
                        }
                    };
                }
            }
            catch (ex) {
                alert(ex);
            }
        }

        public link($scope: ng.IScope, elm: Element, attrs: ng.IAttributes, ngModel: ng.INgModelController): void {
            let $self = this;
            $scope.$on("localizeResourcesUpdated", (event: ng.IAngularEvent) => {
                $self.updateText(elm, attrs["i18n"]);
            });

            attrs.$observe("i18n", (value: any) => {
                $self.updateText(elm, attrs["i18n"]);
            });
        }
    }

    angular.module(moduleName).directive("i18n", ["localize", (localize) => new agence.common.directives.i18nDirective(localize)]);
}