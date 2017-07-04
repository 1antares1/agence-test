namespace agence.common {
    export const moduleName = "agence-common";

    export enum APIConcepts {
        consultants,
        report
    }
    
    export enum APIMessageType {
        error,
        failed,
        information,
        success,
        warning
    }
    let _dependencies: string[] = ["toaster"];
    angular.module(moduleName, _dependencies);
}