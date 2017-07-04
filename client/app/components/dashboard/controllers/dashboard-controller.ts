namespace agence.dashboard {

    import controllers = agence.common.controllers;
    import services = agence.common.services;
    import models = agence.common.models;

    let $self: DashboardController;

    class DashboardController extends controllers.BaseController {
        static $inject = ["$state", "serviceFacade", "utilService"];

        constructor(
            private $state: angular.ui.IStateService, private serviceFacade: services.IServiceFacade, private ngUtil: services.IUtilService) {
            super(serviceFacade);
            this.init();
        }

        init(): void {
            $self = this;
        }

        loadDependencyData(): void {
             $self = this;
            // $self.partnerTypes = this.serviceFacade.lockupData.getPartnerIdTypes();
            // $self.locations = this.serviceFacade.lockupData.getLocations();
            // $self.notariesCount = this.serviceFacade.lockupData.getNotariesCount();
        }

        go(tabName: string, tabIndex: any, statusId: number) {
            // $self = this;
            // let _tab: controllers.Tab, _params: ng.ui.IStateParamsService;

            // // get static collection tabs from Menu Controller
            // if (!$self.ngUtil.isUndefinedOrNull($self.routes) && !$self.ngUtil.isUndefinedOrNull($self.routes.length)) {
            //     _tab = $self.routes.filter((value: controllers.Tab, index: number, array: Array<controllers.Tab>) => {
            //         return value.name === tabName;
            //     })[0];
            //     _tab = _tab || new controllers.Tab(tabName, tabName, null, null);

            //     if (!$self.ngUtil.isUndefinedOrNull(_tab) && !$self.ngUtil.isUndefinedOrNull(_tab.url)) {
            //         switch (tabName) {
            //             case "members":
            //                 if (!$self.ngUtil.isUndefinedOrNull(tabIndex) && !isNaN(tabIndex)) {
            //                     _params = {
            //                         obj: {
            //                             indexTab: tabIndex as number,
            //                             notaryStatus: statusId as number
            //                         }
            //                     };
            //                 }
            //                 break;

            //             case "app.notary.general":
            //                 if (!$self.ngUtil.isUndefinedOrNull(tabIndex) && !isNaN(tabIndex)) {
            //                     _params = {
            //                         obj: {
            //                             indexTab: tabIndex as number,
            //                             notaryStatus: statusId as number
            //                         }
            //                     };
            //                 }
            //                 break;

            //             case "app.notaryInvite":
            //                 if (!$self.ngUtil.isUndefinedOrNull(tabIndex) && !isNaN(tabIndex)) {
            //                     _params = {
            //                         obj: {
            //                             indexTab: tabIndex as number,
            //                             notaryStatus: statusId as number
            //                         }
            //                     };
            //                 }
            //                 break;
            //         }
            //         $self.$state.go(_tab.url, _params);
            //     }
            // }
            // else {
            //     $self.serviceFacade.notification.failed($self.localize.getLocalizedString("_SystemMessageRoutesAuthorizationError_"), $self.localize.getLocalizedString("_SystemMessageTitle_"));
            // }
        }

        onReadyStateChange(isReady: boolean, message ? : string) {
            // $self = this;
            // $self.onReadyContentStateChange = isReady;
            // $self.contentLoadingTitle = (!isReady) ? message : null;
        }
    }

    angular.module(moduleName).controller("dashboardController", DashboardController);
}