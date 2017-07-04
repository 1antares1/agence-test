module agence.performance {
    export const moduleName = "agence-performance";

    let dependencies = [
        "ui.router"
        , "agence-consultant"
        , "agence-customer"
    ];

    angular.module(moduleName, dependencies);
}