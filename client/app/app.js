var agence;
(function (agence) {
    agence.appName = "agenceapp";
    var _dependencies = [
        "ui.router", "ngMaterial", "ngResource", "ngAnimate", "ngSanitize", "angular-loading-bar", "datatables",
        "agence-common", "agence-dashboard", "agence-performance", "agence-consultant"
    ];
    angular.module(agence.appName, _dependencies).config(function ($mdThemingProvider) {
        $mdThemingProvider.theme("default")
            .backgroundPalette("grey")
            .primaryPalette("grey")
            .accentPalette("orange");
    });
})(agence || (agence = {}));
//# sourceMappingURL=app.js.map