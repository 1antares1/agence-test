namespace agence {
    export const appName: string = "agenceapp";
    let _dependencies: string[] = [
        // angular modules
        "ui.router", "ngMaterial", "ngResource", "ngAnimate", "ngSanitize", "angular-loading-bar", "datatables"
        // agence components
        , "agence-common", "agence-dashboard", "agence-performance", "agence-consultant"
    ];

    angular.module(appName, _dependencies).config(($mdThemingProvider: ng.material.IThemingProvider) => {
        $mdThemingProvider.theme("default")
            .backgroundPalette("grey")
            .primaryPalette("grey")
            .accentPalette("orange")
    });
}