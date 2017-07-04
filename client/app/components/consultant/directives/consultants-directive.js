var agence;
(function (agence) {
    var consultant;
    (function (consultant) {
        "use strict";
        var ConsultantsDirective = (function () {
            function ConsultantsDirective() {
                this.restrict = "AE";
                this.templateUrl = 'app/components/consultant/views/consultants.html';
                this.controller = consultant.ConsultantsController;
                this.controllerAs = "vmn";
            }
            return ConsultantsDirective;
        }());
        consultant.ConsultantsDirective = ConsultantsDirective;
        angular.module(consultant.moduleName).directive("consultants", [function () { return new ConsultantsDirective(); }]);
    })(consultant = agence.consultant || (agence.consultant = {}));
})(agence || (agence = {}));
