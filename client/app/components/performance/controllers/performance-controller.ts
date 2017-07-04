namespace agence.performance {
    "use strict";

    import services = agence.common.services;
    import factories = agence.common.factories;
    import models = agence.common.models;
    import common = agence.common;
    import controllers = agence.common.controllers;

    let $self: PerformanceController;

    export interface PerformanceControllerScope extends ng.IScope {
        performance: PerformanceController;
    }

    export class PerformanceController extends common.controllers.BaseController {
        // business data
        performanceItems: Array<controllers.TopMenu>;

        // dependency data
        notaryItems: Array<string>;
        organizationName: string;
        activeTab: number;

        // logical variables
        searchNotaryStatus: number;
        addNotaryLabel: string = "_NotariesAddBtn_";

        static $inject = ["$scope", "$state", "serviceFacade", "utilService", "localize"]
        constructor(public $scope: PerformanceControllerScope
            , private $state: ng.ui.IStateService
            , private serviceFacade: services.IServiceFacade
            , private ngUtil: services.IUtilService
            , private localize: factories.ILocalize
        ) {
            super(serviceFacade);
            super.init();
            this.init();            
        }

        init(): void {
            let $self = this, _stateParams: any = $self.$state.params;
            this.$scope.performance = $self;
            $self.loading = false;
            $self.activeTab = 0;
            $self.onReadyStateChange(true, null);
            $self.loadDependencyData();
        }

        loadDependencyData(): void {
            $self = this;
        }

        getPerformanceItems(): Array<controllers.TopMenu> {
            let $self = this;
            let _performanceItems: Array<controllers.TopMenu>;
            let _baseCss: string = "btn btn-primary pull-right login-btn-top save ";

            // if (!$self.ngUtil.isUndefinedOrNull($self.authMe) && !$self.ngUtil.isUndefinedOrNull(authAttr)) {
            //     try {
            //         _performanceItems = new Array<controllers.TopMenu>();
            //         _.each(authAttr.items, (item: models.ITuple) => {
            //             switch (item.value) {
            //                 case 0:
            //                     _performanceItems.push(new controllers.TopMenu(item.text, "app.notary.general", $self.addNotaryLabel.concat("|append")));
            //                     _performanceItems[_performanceItems.length - 1].css = _baseCss;
            //                     break;

            //                 case 1: _performanceItems.push(new controllers.TopMenu(item.text, "app.notaryInvite", "_InviteBtn_|append"));
            //                     _performanceItems[_performanceItems.length - 1].css = _baseCss;
            //                     break;

            //                 case 2:
            //                     _performanceItems.push(new controllers.TopMenu(item.text, null, "_NotariesExportBtn_|append"));
            //                     _performanceItems[_performanceItems.length - 1].css = _baseCss.concat("nna-margin-b-10");
            //                     break;
            //             }
            //         });
            //     }
            //     catch (ex) {
            //         return null;
            //     }
            // }
            return _performanceItems;
        }

        getNotaryItems(): Array<string> {
            let $self = this;
            let _notaryDetailsItems: Array<string>;

            // if (!$self.ngUtil.isUndefinedOrNull($self.authMe) && !$self.ngUtil.isUndefinedOrNull(authAttr)) {
            //     try {
            //         _notaryDetailsItems = new Array();
            //         authAttr.items.forEach((val: models.ITuple, idx: number, arr: Array<models.ITuple>) => {
            //             _notaryDetailsItems.push(val.text);
            //         });
            //     }
            //     catch (ex) {
            //         $self.serviceFacade.notification.failed(ex.message, $self.localize.getLocalizedString("_SystemMessageTitle_"));
            //         return null;
            //     }
            // }
            return _notaryDetailsItems;
        }

        callAction(element: string): void {
            let self = this;
            if (!self.ngUtil.isNullOrEmpty(element)) {
                switch (element) {
                    case "exportNotaryList": self.sendNotariesByEmail(); // change by collection index
                        break;
                }
            }
        }

        getTabName(index: number): string {
            $self = this;
            let _tabKeyNames: string[] = ["_PerformanceTabConsultant_", "_PerformanceTabCustomer_", "_SystemKeyErrorOrInvalid_"];
            let _getString = (keyName: string): string => {
                return $self.localize.getLocalizedString(keyName);
            }
            return _getString(_tabKeyNames[index]);
        }

        private sendNotariesByEmail(): void {
            let $self = this;
            let _callbackResult = (isSucess: boolean, reason: any): void => {
                if (isSucess) {
                    $self.onSuccess();
                    $self.notification(common.APIMessageType.success, (reason as string).toString());
                }
                else {
                    $self.onFailed(reason);
                }

                $self.onReadyStateChange(true, null);
            };

            // let _me: models.IMe = this.serviceFacade.authentication.me();
            // $self.onReadyStateChange(false, $self.localize.getLocalizedString("_PerformanceSendingEmail_"));

            // $self.serviceFacade.profile.getAllNotariesForPartner().save((response: any) => {
            //     _callbackResult(true, $self.ngUtil.format($self.localize.getLocalizedString("_PerformanceSentEmail_"), _me.emailAddress));
            // }, (reason: any) => {
            //     _callbackResult(false, reason);
            // });
        }
    }
    angular.module(moduleName).controller("performanceController", PerformanceController);
} 