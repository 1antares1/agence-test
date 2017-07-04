var agence;
(function (agence) {
    var common;
    (function (common) {
        var directives;
        (function (directives) {
            var i18nDirective = (function () {
                function i18nDirective(localize) {
                    this.localize = localize;
                    this.restrict = "EAC";
                }
                i18nDirective.prototype.updateText = function (elm, token) {
                    try {
                        var values = token.split("|");
                        var keyRegex = /\_([A-Z])\w+\_/g;
                        var insertTo = void 0;
                        if (values.length >= 1) {
                            var tag = this.localize.getLocalizedString(values[0]);
                            if (tag != null && tag != "" && tag != "Value Not found") {
                                if (values.length > 1) {
                                    for (var index = 1; index < values.length; index++) {
                                        if (keyRegex.test(values[index])) {
                                            var target = '{' + (index - 1) + '}';
                                            tag = tag.replace(target, values[index]);
                                            break;
                                        }
                                        insertTo = values[index];
                                    }
                                }
                                var element = angular.element(elm);
                                if ((element.children().length > 0 || element.contents().length > 0) && insertTo != null) {
                                    switch (insertTo) {
                                        case "append":
                                            element.append(tag);
                                            break;
                                        case "prepend":
                                            element.prepend(tag);
                                            break;
                                    }
                                }
                                else {
                                    element.text(tag);
                                }
                            }
                            ;
                        }
                    }
                    catch (ex) {
                        alert(ex);
                    }
                };
                i18nDirective.prototype.link = function ($scope, elm, attrs, ngModel) {
                    var $self = this;
                    $scope.$on("localizeResourcesUpdated", function (event) {
                        $self.updateText(elm, attrs["i18n"]);
                    });
                    attrs.$observe("i18n", function (value) {
                        $self.updateText(elm, attrs["i18n"]);
                    });
                };
                i18nDirective.$inject = ['localize'];
                return i18nDirective;
            }());
            directives.i18nDirective = i18nDirective;
            angular.module(common.moduleName).directive("i18n", ["localize", function (localize) { return new agence.common.directives.i18nDirective(localize); }]);
        })(directives = common.directives || (common.directives = {}));
    })(common = agence.common || (agence.common = {}));
})(agence || (agence = {}));
