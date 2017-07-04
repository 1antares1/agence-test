var agence;
(function (agence) {
    var consultant;
    (function (consultant) {
        consultant.moduleName = 'agence-consultant';
        var _dependencies = ["ui.router"];
        angular.module(consultant.moduleName, _dependencies);
    })(consultant = agence.consultant || (agence.consultant = {}));
})(agence || (agence = {}));
