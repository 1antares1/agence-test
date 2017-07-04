namespace agence.consultant {

    let $self: NotaryDetailsController;

    import models = agence.common.models;
    import constants = agence.common.constants;
    import services = agence.common.services;
    import factories = agence.common.factories;
    import controllers = agence.common.controllers;

    export interface INotaryDetailsControllerScope extends ng.IScope {
        notaryDetails: NotaryDetailsController;
    }

    export class NotaryDetailsController extends common.controllers.BaseController {
        // model
        model: models.IConsultant;

        // logic Variables
        sendInvitation: boolean;
        calendars: Array < any > ;
        notaryActions: Array < models.IAction > ;
        message: string;
        notaryMessage: string;
        scrollBarConfig: any;
        baseRoute: string = "app.consultant";
        notaryDefaultState: string = "app.consultant.general";
        baseRouteWizard: string = "app.consultant".concat(".");
        phoneFormToggleMessage: string;
        ageLimit: number = 21;
        activeTab: number;
        isAgeOk: boolean;
        isPhoneFormShown: boolean;
        isAllowedToPlaceOrder: boolean;
        isCostCenterRequired: boolean;
        isExternalEmployeeIdRequired: boolean = true;
        oldStepWizard: number;
        currentStepWizard: number;
        currentStepWizardLabel: string;

        // dependency data
        // notaryCommission: NotaryCommissionController;
        // notaryAddressDetails: checkout.AddressDetailsController;
        // notaryPhoneDetails: notary.details.PhoneDetailsController;
        // notaryCommissionDetails: notary.details.CommissionDetailsController;
        //commissionActions: Array<models.IAction>;
        //states: agence.common.models.IState[];
        //genderTuple: agence.common.models.ITuple[];
        titleTuple: agence.common.models.ITuple[];
        notaryTabs: Array < controllers.Tab > ;
        consultantParams: models.IConsultantParams;
        // thirdPartyEnroll: models.authRole;
        // thirdPartyInformation: models.IUserThirdParty;
        resourceAccessMode: services.DataAccessMode;
        // authorizations: models.Authorization;
        // meRole: models.IAuthRoles;
        // meNotaryProperties: Array<models.IAuthProperty>;
        // meNotaryAttributes: models.IAuthAttributes;
        notaryItems: Array < string > ;
        $uibNotaryItems: Array < models.ITuple > ;
        generalFormValid: boolean;
        addressFormValid: boolean;
        phoneFormValid: boolean;
        i18n: Array < models.ITuple > ;

        // system variables
        dtOptions: any;
        dtColumns: any;
        dtInstance: any = {};
        // dpOptions: ng.ui.bootstrap.IDatepickerConfig;
        // dpPopupOptions: ng.ui.bootstrap.IDatepickerPopupConfig;

        static $inject = [
            "$scope"
            , "$compile"
            , "$state"
            , "$stateParams"
            , "$q"
            , "$timeout"
            , "$window"
            , "configService"
            , "serviceFacade"
            , "lifeCycle"
            , "utilService"
            , "localize"
            , "DTOptionsBuilder"
            , "DTColumnBuilder"
        ];

        constructor(
            protected notaryScope: INotaryDetailsControllerScope, private $compile: ng.ICompileService, private $state: ng.ui.IStateService, private $stateParams: models.IConsultantParams, private $q: ng.IQService, private $timeout: ng.ITimeoutService, private $window: ng.IWindowService, private configService: services.IConfigService, private serviceFacade: services.IServiceFacade, private lifeCycle: constants.ILifeCycle, private ngUtil: services.IUtilService, private localize: factories.ILocalize, private DTOptionsBuilder: any, private DTColumnBuilder: any
        ) {
            super(serviceFacade);
            super.init();
            this.init();
        }

        //#region Init
        init(): void {
            $self = this;
            $self.notaryScope.notaryDetails = this;
            //          $self.authMe = $self.serviceFacade.authentication.me();
            $self.model = {} as models.IConsultant;
            //$self.model.co_usuario = true;
            //          $self.notaryParams = this.$stateParams;
            //          $self.thirdPartyEnroll = ($self.lifeCycle.IS_THIRDPARTY_ENROLL && !$self.ngUtil.isUndefinedOrNull($self.notaryParams.obj) && !$self.ngUtil.isUndefinedOrNull($self.notaryParams.obj.thirdPartyEnroll)) ? $self.notaryParams.obj.thirdPartyEnroll || $self.lifeCycle.IS_THIRDPARTY_ENROLL : null;
            //          $self.thirdPartyInformation = ($self.lifeCycle.IS_THIRDPARTY_ENROLL && !$self.ngUtil.isUndefinedOrNull($self.notaryParams.obj) && !$self.ngUtil.isUndefinedOrNull($self.notaryParams.obj.thirdPartyEnroll)) ? $self.notaryParams.obj.thirdPartyInformation : null;
            //           $self.resourceAccessMode = (!$self.ngUtil.isUndefinedOrNull($self.thirdPartyEnroll)) ? services.DataAccessMode.anonymous : services.DataAccessMode.authenticated

            this.isAgeOk = true;

            if (this.$stateParams.id) {
                this.loading = true;
                //this.mode = models.ScreenMode.Edit;
                this.notaryDetailsRefresh((success: boolean, message: string): void => {
                    if (!success) {
                        if (!$self.ngUtil.isNullOrEmpty(message) && message.toLowerCase().indexOf("notary not found") !== -1) {
                            let _params: ng.ui.IStateParamsService = {
                                obj: {
                                    indexTab: 1,
                                    notaryStatus: 0
                                }
                            };
                            $self.$state.go("app.members", _params);
                        } else {
                            this.$window.history.back();
                        }
                    }
                });
            } else {
                //this.mode = models.ScreenMode.Add;
            }

            $self.loadDependencyData();
            // $self.getPartnerInformation((data: models.IPartner) => {
            //     if (!$self.ngUtil.isUndefinedOrNull(data)) {
            //         let _notaryResource = $self.serviceFacade.profile.getNotaryResource(this.$stateParams.id);
            //         $self.isCostCenterRequired = $self.serviceFacade.lifeCycle.PARTNER_INFORMATION.isCostCenterRequired;
            //         if ($self.serviceFacade.lifeCycle.PARTNER_INFORMATION.externalAccountId === constants.LifeCycleConstant.lifeCycleApp.COMERICA_EXTERNAL_ACCOUNT_ID) {
            //             $self.isExternalEmployeeIdRequired = false;
            //         }
            //         $self.loading = false;
            //     } else {
            //         $self.$state.go("app.members", null, {
            //             reload: true
            //         });
            //     }
            // });
            this.returnUrl += "members";

            // ng-scrollbars - config
            $self.scrollBarConfig = {
                autoHideScrollbar: true,
                theme: "dark-3",
                advanced: {
                    updateOnContentResize: true
                },
                setHeight: 150,
                scrollInertia: 350,
                axis: "yx"
            }

            $self.initNotaryLogicVariables();
        }

        initNotaryLogicVariables(): void {
            $self = this;
            this.sendInvitation = false;
            this.calendars = new Array < any > (); // stores the ids and the status of all the calendars

            // datepicker options
            let _now: Date = new Date();
            let _fromDate: Date = new Date((_now.getFullYear() - $self.ageLimit), _now.getMonth(), _now.getDate());
            // this.dpOptions = {
            //     datepickerMode: "year",
            //     maxDate: _fromDate,
            //     shortcutPropagation: false,
            // }

            $self.notaryScope.$on("localizeResourcesUpdated", (event: ng.IAngularEvent) => {
                // tabs setup
                $self.setupNotaryTabs();
            });

            if ($self.localize.resourceFileLoaded) {
                $self.setupNotaryTabs();
            }
        }

        setupNotaryTabs(): void {
            $self = this;
            let _newConsultantTabs: Array < controllers.Tab > ;

            _newConsultantTabs = [
                new controllers.Tab("general", "app.consultant.general", $self.localize.getLocalizedString("_ConsultantGeneralTitle_"), "")
            ];

            // validate current tab
            _newConsultantTabs.some((value: controllers.Tab, index: number, array: Array < controllers.Tab > ): boolean => {
                $self.activeTab = null;
                if (angular.equals($self.$state.current.name, $self.baseRoute)) {
                    $self.activeTab = 0;
                } else if ($self.$state.current.name === value.url) {
                    $self.activeTab = index;
                }

                if (!angular.equals($self.activeTab, null)) {
                    return true;
                }
            });
            $self.notaryTabs = _newConsultantTabs;
            //$self.goStepWizard();
        }

        loadDependencyData(): void {
            $self = this;
            $self.notaryActions = $self.getNotaryActions();
            $self.notaryActions = $self.notaryActions.filter((val: models.IAction, idx: number, arr: Array < models.IAction > ) => {
                return val.key !== 3;
            });

            // $self.serviceFacade.lockupData.getStates().then((data: Array < models.IState > ) => {
            //     $self.states = data;
            // });

            // if (!$self.ngUtil.isUndefinedOrNull($self.authMe) || !$self.ngUtil.isUndefinedOrNull($self.thirdPartyEnroll)) {
            //     try {
            //         let _externalInstancesCount;
            //         // auth properties
            //         $self.meRole = $self.serviceFacade.authorization.getMeRole();
            //         $self.meNotaryProperties = $self.meRole.attributes.properties;

            //         if (!$self.ngUtil.isUndefinedOrNull($self.meRole) && !$self.ngUtil.isUndefinedOrNull($self.meNotaryProperties)) {
            //             $self.meNotaryAttributes = $self.serviceFacade.authorization.getMeAttributes(models.IAuthScheme.notaries);
            //             $self.notaryItems = $self.getNotaryItems($self.meNotaryAttributes);
            //         } else {
            //             $self.notification(common.APIMessageType.failed, $self.localize.getLocalizedString("_SystemMessageAuthorizationError_"));
            //         }
            //         if (this.mode === models.ScreenMode.Add) {
            //             _externalInstancesCount = 3;

            //             // extends the Notary Scope with 'Address Details' Controller
            //             $self.addressFormSettings($self.thirdPartyEnroll || models.authRole[$self.meRole.role], true);
            //             $self.notaryAddressDetails = new checkout.AddressDetailsController(null, $self.$uibNotaryItems[0].value, $self.serviceFacade, $self.ngUtil, $self.cartFactory, $self.lifeCycle, $self.localize, (success: boolean, result: checkout.AddressDetailsController) => {
            //                 if (_externalInstancesCount > 0) {
            //                     _externalInstancesCount--;
            //                     $self.addressFormSettings($self.thirdPartyEnroll || models.authRole[$self.meRole.role]);
            //                     angular.extend($self.notaryScope.notaryDetails, result);
            //                     angular.extend($self.notaryScope.notaryDetails, Object.getPrototypeOf(result)); // prototype functions (baseController)
            //                     $self.onProcessing(!(_externalInstancesCount <= 0));
            //                 } else {
            //                     $self.onProcessing(false);
            //                 }
            //             });

            //             // extends the Notary Scope with 'Phone Details' Controller
            //             $self.phoneFormSettings($self.thirdPartyEnroll || models.authRole[$self.meRole.role], true);
            //             $self.notaryPhoneDetails = new notary.details.PhoneDetailsController($self.$uibModal, null, $self.$uibNotaryItems[1].value, $self.serviceFacade, $self.ngUtil, $self.cartFactory, $self.localize, (sucess: boolean, result: details.PhoneDetailsController) => {
            //                 if (_externalInstancesCount > 0) {
            //                     _externalInstancesCount--;
            //                     angular.extend($self.notaryScope.notaryDetails, result);
            //                     angular.extend($self.notaryScope.notaryDetails, Object.getPrototypeOf(result)); // prototype functions (baseController)
            //                     $self.phoneFormSettings($self.thirdPartyEnroll || models.authRole[$self.meRole.role], true);
            //                     $self.onProcessing(!(_externalInstancesCount <= 0));
            //                 } else {
            //                     $self.onProcessing(false);
            //                 }
            //             });
            //         } else {
            //             $self.$uibNotaryItems = [{
            //                 text: "commissionDetails",
            //                 value: {
            //                     personGuid: this.model.personGuid,
            //                     type: null,
            //                     action: constants.CRUD.update,
            //                     model: $self.model.commissions[0]
            //                 }
            //             }];
            //             _externalInstancesCount = 1;
            //         }

            //         // extends the Notary Scope with 'Commission Details' Controller
            //         $self.commissionFormSettings($self.thirdPartyEnroll || models.authRole[$self.meRole.role], true);
            //         $self.notaryCommissionDetails = new notary.details.CommissionDetailsController($self.$uibModal, null, (!$self.ngUtil.isUndefinedOrNull($self.$uibNotaryItems[2]) ? $self.$uibNotaryItems[2].value : $self.$uibNotaryItems[0].value), $self.serviceFacade, $self.ngUtil, $self.cartFactory, $self.localize, (sucess: boolean, result: details.CommissionDetailsController) => {
            //             if (_externalInstancesCount > 0) {
            //                 _externalInstancesCount--;
            //                 angular.extend($self.notaryScope.notaryDetails, result);
            //                 angular.extend($self.notaryScope.notaryDetails, Object.getPrototypeOf(result)); // prototype functions (baseController)
            //                 $self.commissionFormSettings($self.thirdPartyEnroll || models.authRole[$self.meRole.role], true);
            //                 $self.onProcessing(!(_externalInstancesCount <= 0));
            //             } else {
            //                 $self.onProcessing(false);
            //             }
            //         });
            //     } catch (e) {
            //         $self.notification(common.APIMessageType.failed, e.message, $self.localize.getLocalizedString("_SystemMessageTitle_"));
            //     }
            // }
        }

        getNotaryItems(): Array < string > {
            let $self = this;
            let _consultantDetailsItems: Array < string > ;

            // if ((!$self.ngUtil.isUndefinedOrNull($self.authMe) || models.authRole[$self.meRole.role] === models.authRole.Guest) && !$self.ngUtil.isUndefinedOrNull(authAttr)) {
            //     try {
            //         _consultantDetailsItems = new Array();
            //         authAttr.items.forEach((val: models.ITuple, idx: number, arr: Array < models.ITuple > ) => {
            //             _consultantDetailsItems.push(val.text);
            //         });
            //     } catch (ex) {
            //         $self.serviceFacade.notification.failed(ex.message, $self.localize.getLocalizedString("_SystemMessageTitle_"));
            //         return null;
            //     }
            // }
            return _consultantDetailsItems;
        }

        notaryDetailsRefresh(callback ? : (isSuccess: boolean, message: string) => void): void {
            // $self = this;
            // $self.loading = true;
            // $self.notaryScope.notaryDetails.loading = true;
            // let _notaryDetails: models.INotaryOrganization;
            // let _meData: models.IMe = $self.serviceFacade.authentication.me();
            // let _getNotaryInformation = (thirdPartyEnroll: boolean = false): void => {
            //     let _notaryResource: services.INotaryResource;
            //     let _placeNotaryResult = (data: any): void => {
            //         $self.model = data;
            //         $self.model.email = data.email || null;
            //         $self.isAllowedToPlaceOrder = $self.model.isUser && (!$self.ngUtil.isUndefinedOrNull($self.lifeCycle.IS_THIRDPARTY_ENROLL) || (_meData && _meData.roles.indexOf("Administrator") !== -1));
            //         $self.notaryMessage = $self.ngUtil.format("{0} {1}", $self.model.firstName, $self.model.lastName);
            //         $self.loadDependencyData();
            //     };

            //     $self.isCostCenterRequired = (!$self.ngUtil.isUndefinedOrNull($self.serviceFacade.lifeCycle.PARTNER_INFORMATION)) ? $self.serviceFacade.lifeCycle.PARTNER_INFORMATION.isCostCenterRequired : false;
            //     if (!$self.ngUtil.isUndefinedOrNull($self.serviceFacade.lifeCycle.PARTNER_INFORMATION) && $self.serviceFacade.lifeCycle.PARTNER_INFORMATION.externalAccountId === constants.LifeCycleConstant.lifeCycleApp.COMERICA_EXTERNAL_ACCOUNT_ID) {
            //         $self.isExternalEmployeeIdRequired = false;
            //     }

            //     if (thirdPartyEnroll) {
            //         if (!$self.ngUtil.isNullOrEmpty($self.thirdPartyInformation) && !$self.ngUtil.isNullOrEmpty($self.thirdPartyInformation.me.thirdPartyData.organizationName) &&
            //             $self.thirdPartyInformation.me.thirdPartyData.organizationName.toLowerCase() === constants.LifeCycleConstant.lifeCycleApp.COMERICA_ORGANIZATION_NAME.toLowerCase()) {
            //             $self.isExternalEmployeeIdRequired = false;
            //         }

            //         _notaryDetails = $self.notaryParams.obj.notaryDetails;
            //         _placeNotaryResult(_notaryDetails);
            //     } else {
            //         _notaryResource = $self.serviceFacade.profile.getNotaryResource($self.notaryParams.id);
            //         _notaryResource.get((notaryData: models.INotary) => {
            //             _placeNotaryResult(notaryData);
            //             if (callback) {
            //                 callback(true, null);
            //             }
            //         }, (reason: any) => {
            //             this.onFailed(reason);
            //             if (callback) {
            //                 callback(false, reason.data.message || reason.data);
            //             }
            //         });
            //     }
            // }
            // if (!$self.ngUtil.isUndefinedOrNull(_meData)) {
            //     $self.getPartnerInformation((data: models.IPartner) => {
            //         if (!$self.ngUtil.isUndefinedOrNull(data)) {
            //             _getNotaryInformation();
            //         } else {
            //             if (callback) {
            //                 callback(false, null);
            //             }
            //         }
            //     });
            // } else if ($self.lifeCycle.IS_THIRDPARTY_ENROLL) {
            //     _getNotaryInformation(true);
            // } else {
            //     $self.serviceFacade.authentication.logOut();
            // }
        }

        dtInstanceCallback(dtInstance: any): void {
            $self.dtInstance = dtInstance;
            let _settings: any = $self.dtInstance.dataTable.fnSettings();

            let _dtSetup: models.IDatatableSetup = {
                inputSearchClass: "form-control",
                inputSearchPlaceholder: "Type any...",
                isProcessing: false,
                isServerSide: false
            }

            $self.datatableSetup(_settings, _dtSetup);
        }
        //#endregion

        //#region Business logic

        // upsertNotaryData(concept: models.INotaryConcept, personGuid: string, model: any, requestType ? : common.constants.CRUD): ng.IPromise < any > {
        //     $self = this;

            // if (!$self.ngUtil.isUndefinedOrNull(concept) && !$self.ngUtil.isUndefinedOrNull(personGuid)) {
            //     let _defer: ng.IDeferred < {} > = $self.$q.defer();
            //     let _result: any;
            //     let _callbackPromise = (result: any, resolved: boolean): void => {
            //         if (resolved) {
            //             _defer.resolve(result);
            //         } else {
            //             _defer.reject(result);
            //         }
            //     }
            //     switch (concept) {
            //         case models.INotaryConcept.notary:
            //             _result = $self.serviceFacade.profile.getNotaryResource(personGuid, $self.resourceAccessMode).save(model, (response: any) => {
            //                 _callbackPromise(response, true);
            //             }, (reason: any) => {
            //                 _callbackPromise(reason, false);
            //             });
            //             break;

            //         case models.INotaryConcept.customer:
            //             _result = $self.serviceFacade.profile.getCustomerResource().save(model, (response: any) => {
            //                 _callbackPromise(response, true);
            //             }, (reason: any) => {
            //                 _callbackPromise(reason, false);
            //             });
            //             break;

            //         case models.INotaryConcept.address:
            //             _result = $self.serviceFacade.profile.getAddressNotaryResource(personGuid, model.addressGuid, $self.resourceAccessMode);
            //             switch (requestType) {
            //                 case constants.CRUD.update:
            //                     _result.update(model, (response: any) => {
            //                         _callbackPromise(response, true);
            //                     }, (reason: any) => {
            //                         _callbackPromise(reason, false);
            //                     });
            //                     break;

            //                 default:
            //                 case constants.CRUD.create:
            //                     _result.save(model, (response: any) => {
            //                         _callbackPromise(response, true);
            //                     }, (reason: any) => {
            //                         _callbackPromise(reason, false);
            //                     });
            //                     break;
            //             }
            //             break;

            //         case models.INotaryConcept.commission:
            //             switch (requestType) {
            //                 case constants.CRUD.update:
            //                     _result = $self.serviceFacade.profile.getCommissionNotaryResource(personGuid, model.commissionGuid, $self.resourceAccessMode);
            //                     _result.update(model, (response: any) => {
            //                         _callbackPromise(response, true);
            //                     }, (reason: any) => {
            //                         _callbackPromise(reason, false);
            //                     });
            //                     break;

            //                 case constants.CRUD.create:
            //                     _result = $self.serviceFacade.profile.getCommissionNotaryResource(personGuid, null, $self.resourceAccessMode);
            //                     _result.save(model, (response: any) => {
            //                         _callbackPromise(response, true);
            //                     }, (reason: any) => {
            //                         _callbackPromise(reason, false);
            //                     });
            //                     break;
            //             }
            //             break;

            //         case models.INotaryConcept.phone:
            //             switch (requestType) {
            //                 case constants.CRUD.update:
            //                     _result = $self.serviceFacade.profile.getPhoneNotaryResource(personGuid, model.phoneGuid, $self.resourceAccessMode);
            //                     _result.update(model, (response: any) => {
            //                         _callbackPromise(response, true);
            //                     }, (reason: any) => {
            //                         _callbackPromise(reason, false);
            //                     });
            //                     break;

            //                 default:
            //                 case constants.CRUD.create:
            //                     _result = $self.serviceFacade.profile.getPhoneNotaryResource(personGuid, null, $self.resourceAccessMode);
            //                     _result.save(model, (response: any) => {
            //                         _callbackPromise(response, true);
            //                     }, (reason: any) => {
            //                         _callbackPromise(reason, false);
            //                     });
            //                     break;
            //             }
            //             break;
            //     }
            //     return _defer.promise;
            // }
        //}

        // getPartnerInformation(callbackResult: (data: models.IPartner) => void): void {
        //     $self = this;
        //     let companyId: string = $self.configService.appSettings.nnaId;

        //     if (!$self.ngUtil.isUndefinedOrNull(companyId)) {
        //         $self.serviceFacade.profile.getPartnerResource(companyId).get((data: models.IPartner) => {
        //             $self.serviceFacade.lifeCycle.PARTNER_INFORMATION = data;
        //             callbackResult(data);
        //         }, (reason: any) => {
        //             $self.onFailed(reason);
        //             callbackResult(null);
        //         });
        //     }
        // }

        
        // addressFormSettings(role: models.authRole, isPrepare ? : boolean): void {
        //     $self = this;
        //     if (!$self.ngUtil.isUndefinedOrNull(!$self.notaryAddressDetails)) {
        //         switch (role) {
        //             case models.authRole.PunchOut:
        //             case models.authRole.WellsFargo:
        //                 if (isPrepare) {
        //                     $self.address = (!$self.ngUtil.isUndefinedOrNull($self.thirdPartyInformation) && !$self.ngUtil.isUndefinedOrNull($self.thirdPartyInformation.addressRequest)) ? $self.thirdPartyInformation.addressRequest : null;
        //                     $self.$uibNotaryItems[0].value.model = $self.address;
        //                     $self.$uibNotaryItems[0].value.type = (!$self.ngUtil.isUndefinedOrNull($self.address)) ? new models.AddressType($self.address.addressType, common.models.AddressClass[$self.address.addressType]) : null;
        //                 } else {
        //                     $self.notaryAddressDetails.addressSetting = models.AddressSetup.shippingFor;
        //                     $self.notaryAddressDetails.addressTypeSelected = new models.AddressType(models.AddressClass.Shipping, models.AddressClass[models.AddressClass.Shipping]);
        //                     $self.notaryAddressDetails.isCountyRequired = ($self.mode === models.ScreenMode.Add);
        //                 }
        //                 break;
        //         }
        //     }
        // }

        // phoneFormSettings(role: models.authRole, isPrepare ? : boolean): void {
        //     $self = this;
        //     switch (role) {
        //         case models.authRole.PunchOut:
        //             if (isPrepare) {
        //                 $self.phone = (!$self.ngUtil.isUndefinedOrNull($self.model.phones) && $self.model.phones.length) ? $self.model.phones[0] as any : null;
        //                 $self.$uibNotaryItems[1].value.model = $self.phone;
        //                 $self.$uibNotaryItems[1].value.type = (!$self.ngUtil.isUndefinedOrNull($self.phone)) ? new models.PhoneType($self.phone.phoneType, common.models.PhoneClass[$self.phone.phoneType]) : new models.PhoneType(models.PhoneClass.Business, common.models.PhoneClass[models.PhoneClass.Business]);
        //             }
        //             break;
        //         case models.authRole.WellsFargo:
        //             if (isPrepare) {
        //                 $self.phone = (!$self.ngUtil.isUndefinedOrNull($self.model.phones) && $self.model.phones.length) ? $self.model.phones[0] as any : null;
        //                 $self.$uibNotaryItems[1].value.model = $self.phone;
        //                 $self.$uibNotaryItems[1].value.type = (!$self.ngUtil.isUndefinedOrNull($self.phone)) ? new models.PhoneType($self.phone.phoneType, common.models.PhoneClass[$self.phone.phoneType]) : null;
        //             }
        //             break;
        //     }
        // }

        // commissionFormSettings(role: models.authRole, isPrepare ? : boolean): void {
        //     $self = this;

        //     switch (role) {
        //         case models.authRole.PunchOut:
        //             if (!$self.ngUtil.isUndefinedOrNull($self.lifeCycle.IS_THIRDPARTY_ENROLL)) {
        //                 $self.commission = (!$self.ngUtil.isUndefinedOrNull($self.model.commissions) && $self.model.commissions.length) ? $self.model.commissions[0] as any : null;
        //                 $self.commission = $self.getDefaultCommissionModel();
        //                 ($self.ngUtil.isUndefinedOrNull($self.$uibNotaryItems[2])) ?
        //                 $self.$uibNotaryItems[0].value.model = $self.commission: $self.$uibNotaryItems[2].value.model = $self.commission;

        //             }
        //             break;
        //         case models.authRole.WellsFargo:
        //             if (isPrepare) {
        //                 $self.commission = (!$self.ngUtil.isUndefinedOrNull($self.model.commissions) && $self.model.commissions.length) ? $self.model.commissions[0] as any : null;
        //                 $self.commission = $self.getDefaultCommissionModel();
        //                 ($self.ngUtil.isUndefinedOrNull($self.$uibNotaryItems[2])) ?
        //                 $self.$uibNotaryItems[0].value.model = $self.commission: $self.$uibNotaryItems[2].value.model = $self.commission;

        //             }
        //             break;
        //     }

        // }

        isOlder(age: Date): boolean {
            $self = this;
            if (!$self.ngUtil.isNullOrEmpty(age)) {
                let timeDiff = Math.abs(age.getTime() - new Date().getTime());
                let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                if ((diffDays / 365) >= 21) {
                    return $self.isAgeOk = true;
                }
            }
            return $self.isAgeOk = false;
        }
        //#endregion

        //#region Business data
        // getDefaultCommissionModel(): models.INotaryCommissionsDetails {
        //     $self = this;
        //     $self.commission = $self.notaryCommission.setDefaultCommissionModel($self.model);
        //     return $self.commission;
        // }

        // generateInvitation(): ng.IPromise < models.IUserInvitation > {
        //     var deferred = $self.$q.defer < models.IUserInvitation > ();
        //     var invitation = new models.UserInvitation();

        //     invitation.invitationGuid = $self.serviceFacade.util.generateGuid();
        //     invitation.toEmailAddress = $self.model.email;
        //     invitation.recipientName = $self.model.firstName + " " + $self.model.lastName;
        //     var user = $self.serviceFacade.session.getOrganization().then(
        //         (partner: models.IPartner) => {
        //             invitation.subject = "User Invitation:" + partner.organizationName;
        //             invitation.fromEmailAddress = partner.pocEmail;
        //             deferred.resolve(invitation);
        //         });

        //     return deferred.promise;
        // }

        // inviteAfterSavingOrUpdatingNotary(isUpdate: boolean = false, model: models.INotary): void {
        //     $self = this;
        //     let successCallback = (): void => {
        //         let message: string;
        //         if (isUpdate) {
        //             message = $self.ngUtil.format($self.localize.getLocalizedString("_NotariesPutConfirmation_"),
        //                 (!$self.ngUtil.isUndefinedOrNull(model)) ? model.firstName.concat(" ", model.lastName) : "");
        //         } else {
        //             message = $self.localize.getLocalizedString("_NotariesPostConfirmation_");
        //         }
        //         $self.notification(common.APIMessageType.success, message);
        //         $self.onNotaryDetailsSuccess(((!isUpdate) ? common.constants.CRUD.create : null), model);
        //     }

        //     if (!isUpdate && $self.sendInvitation && !$self.thirdPartyEnroll) {
        //         let _invitationResource = this.serviceFacade.identity.getInvitationResource();
        //         $self.generateInvitation().then((invitation: models.IUserInvitation) => {
        //             _invitationResource.save(invitation, () => {
        //                 successCallback();
        //             }, (reason: any) => {
        //                 $self.onFailed(reason);
        //             });
        //         });
        //     } else {
        //         successCallback();
        //     }
        // }
        //#endregion

        //#region Workflow
        // toggleCalendar(id, $event: any): void {
        //     if ($event) {
        //         $event.preventDefault();
        //         $event.stopPropagation();
        //     }
        //     this.calendars[id] = true;
        // }

        toggleLoading(): void {
            $self = this;
            $self.loading = (!$self.ngUtil.isUndefinedOrNull($self.loading)) ? !$self.loading : true;
            $self.isProcessing = (!$self.ngUtil.isUndefinedOrNull($self.isProcessing)) ? !$self.isProcessing : true;
        }

        togglePhoneForm(): boolean {
            $self = this;
            $self.isPhoneFormShown = !$self.isPhoneFormShown;
            $self.phoneFormToggleMessage = (($self.isPhoneFormShown) ? $self.localize.getLocalizedString("_LandingPageFormShownTooltip_") : $self.localize.getLocalizedString("_LandingPageFormHiddenTooltip_"));
            return $self.isPhoneFormShown;
        }

        do(generalFormValid: boolean, addressFormValid ? : boolean, phoneFormValid ? : boolean): void {
            $self = this;

            // if (generalFormValid == true) {
            //     $self.loading = true;
            //     if ($self.mode === models.ScreenMode.Add) {
            //         $self.generalFormValid = generalFormValid;
            //         $self.addressFormValid = addressFormValid;
            //         $self.phoneFormValid = phoneFormValid;
            //         $self.add();
            //     } else if ($self.mode === models.ScreenMode.Edit) {
            //         $self.edit();
            //     }
            // }
        }

        go(route: string): void {
            $self = this;
            if (!$self.ngUtil.isUndefinedOrNull(route)) {
                let _idParam: string = $self.$stateParams.id;
                $self.oldStepWizard = $self.activeTab;

                // if ($self.ngUtil.isUndefinedOrNull(_idParam) && !$self.lifeCycle.IS_THIRDPARTY_ENROLL) {
                //     $self.$state.go($self.baseRoute);
                //     return;
                // } else if (route !== $self.$state.current.name) {
                //     $self.$state.go(route, {
                //         id: _idParam
                //     });
                // }
            }
        }

        // goStepWizard(direction ? : checkout.WizardDirection, fromTabs ? : boolean): controllers.Tab {
        //     $self = this;
        //     let _notaryStepWizard: controllers.Tab;
        //     let _oldStepWizard: number, _newStepWizard: number, _oldStatusWizard: string, _newStatusWizard: string = "doing";

        //     _oldStepWizard = $self.currentStepWizard || 0;
        //     switch (direction) {
        //         case checkout.WizardDirection.next:
        //             _newStepWizard = $self.currentStepWizard + ((fromTabs) ? (($self.activeTab - $self.oldStepWizard) || 1) : 1);
        //             if (!($self.notaryTabs.length < $self.currentStepWizard)) {
        //                 $self.currentStepWizard = _newStepWizard;
        //                 _oldStatusWizard = "done";
        //             }
        //             break;

        //         case checkout.WizardDirection.back:
        //             _newStepWizard = $self.currentStepWizard - ((fromTabs) ? (($self.oldStepWizard - $self.activeTab) || 1) : 1);
        //             if (_oldStepWizard != 0) {
        //                 $self.currentStepWizard = _newStepWizard;
        //                 _oldStatusWizard = "";
        //             }
        //             break;

        //         default:
        //             $self.currentStepWizard = 0;
        //             $self.notaryTabs[$self.currentStepWizard].status = _newStatusWizard;
        //             break;
        //     }
        //     if (_oldStatusWizard != null) {
        //         $self.notaryTabs[_oldStepWizard].status = _oldStatusWizard;
        //         $self.notaryTabs.forEach((val: controllers.Tab, idx: number, arr: Array < controllers.Tab > ): void => {
        //             if ($self.currentStepWizard < idx) {
        //                 $self.notaryTabs[idx].status = "";
        //             }
        //         });
        //         $self.notaryTabs[$self.currentStepWizard].status = _newStatusWizard;
        //     }
        //     $self.currentStepWizardLabel = ($self.localize.getLocalizedString($self.notaryTabs[$self.currentStepWizard].name) as string).toUpperCase();

        //     if ($self.notaryTabs.length) {
        //         _notaryStepWizard = $self.notaryTabs[$self.currentStepWizard];
        //         $self.oldStepWizard = _oldStepWizard;
        //         $self.activeTab = _newStepWizard;
        //     } else {
        //         $self.oldStepWizard = 0;
        //         $self.activeTab = 0;
        //     }
        //     return _notaryStepWizard;
        // }

        goNext(): void {
            $self = this;
            //$self.goStepWizard(checkout.WizardDirection.next);
            $self.$state.go($self.baseRouteWizard.concat($self.notaryTabs[$self.currentStepWizard].name));
        }

        back() {
            let self = this;
            self.$state.transitionTo(this.returnUrl);
        }

        add(additionalInfoOnly ? : boolean): void {
            $self = this;
            let _promises = new Array < ng.IPromise < any >> ();
            let _isAnyPromise: boolean;
        }

        edit(): void {
            // let _notary: models.INotary = angular.copy(this.model);
            // let _notaryResource = this.serviceFacade.profile.getNotaryResource(this.$stateParams.id || $self.thirdPartyInformation.userRequest.personGuid, $self.resourceAccessMode);
            // let _callbackError = (reason: any): void => {
            //     this.onProcessing(false);
            //     if (!$self.ngUtil.isNullOrEmpty(reason)) {
            //         this.onFailed(reason);
            //     } else {
            //         this.onFailed($self.localize.getLocalizedString($self.ngUtil.format("_SystemMessageEmptyModel_", "Customer address")));
            //         this.onFailed($self.localize.getLocalizedString("_ServerCustomerDataError_"));
            //     }
            // };

            // _notaryResource.update(_notary as any, (data: models.INotary) => {
            //     // [X] Create Ariba Event - Updated Notary
            //     $self.sendInvitation = false;

            //     if (!$self.thirdPartyEnroll) {
            //         $self.commission = ($self.notaryScope.notaryDetails as any).getFullCommission(false);
            //         $self.commission.commissionName = $self.notaryCommission.setDefaultCommissionModel($self.model).commissionName;
            //         $self.serviceFacade.profile.getCommissionNotaryResource(data.personGuid, $self.commission.commissionGuid).update($self.commission, (response: any) => {
            //             this.inviteAfterSavingOrUpdatingNotary(true, data);
            //         }, (reason: any) => {
            //             _callbackError(reason);
            //         });
            //     } else if (!$self.thirdPartyEnroll) {
            //         this.inviteAfterSavingOrUpdatingNotary(true, data);
            //     } else if ($self.thirdPartyEnroll && !$self.ngUtil.isNullOrEmpty($self.thirdPartyInformation) && !$self.ngUtil.isNullOrEmpty($self.thirdPartyInformation.userRequest.personGuid)) {
            //         $self.add(true);
            //     } else {
            //         _callbackError(null);
            //     }
            // }, this.onFailed);
        }

        switchTab(newTabId: string): void {
            $self = this;
            // if (!$self.ngUtil.isUndefinedOrNull($self.notaryTabs) && $self.notaryTabs.length) {
            //     let _newTabIdx: number, _oldTabIdx: number;
            //     $self.notaryTabs.forEach((val: controllers.Tab, idx: number, arr: Array < controllers.Tab > ): void => {
            //         if (val.name === newTabId) {
            //             _newTabIdx = idx;
            //         }
            //         if (idx === $self.oldStepWizard) {
            //             _oldTabIdx = idx;
            //         }
            //     });
            //     $self.goStepWizard(((_newTabIdx > _oldTabIdx) ? checkout.WizardDirection.next : checkout.WizardDirection.back), true);
            // }
        }

        //openCommissionDetailsForm(personGuid: string, action: common.constants.CRUD, commissionModel: models.INotaryCommissionsDetails, callbackResult: (result: any) => void) {
          //  $self = this;
            // let options: ng.ui.bootstrap.IModalSettings = {
            //     animation: true,
            //     templateUrl: "app/components/notary/details/views/commission-details.html",
            //     controller: notary.details.CommissionDetailsController,
            //     controllerAs: "vm",
            //     openedClass: "modal-open",
            //     backdrop: "static",
            //     size: "lg",
            //     windowClass: "app-modal-window",
            //     resolve: {
            //         $uibItems: {
            //             personGuid: personGuid,
            //             action: action,
            //             model: commissionModel
            //         }
            //     }
            // };

            // $self.$uibModal.open(options).result
            //     .then((result: any) => {
            //         if (!$self.ngUtil.isUndefinedOrNull(callbackResult)) {
            //             callbackResult(result);
            //         }
            //     });
        //}

        onNotaryDetailsSuccess(type ? : common.constants.CRUD, model ? : any) {
            $self = this;
            // let _goBack = (params: models.INotaryParams): void => {
            //     $self.$state.go(params.obj.historyBack, params);
            // }

            //self.authMe = $self.serviceFacade.authentication.me();
            super.onSuccess();

            // if (!$self.thirdPartyEnroll &&
            //     models.authRole[$self.meRole.role] === models.authRole.PunchOut &&
            //     !$self.ngUtil.isUndefinedOrNull($self.authMe) &&
            //     !$self.ngUtil.isNullOrEmpty(model)) {
            //     $self.notaryParams = {
            //         id: model.personGuid,
            //         obj: {
            //             mode: "Add",
            //             historyBack: "app.products",
            //             notaryDetails: model
            //         }
            //     };
            //     _goBack($self.notaryParams);
            // } else if ((!$self.ngUtil.isUndefinedOrNull($self.thirdPartyEnroll) && !$self.ngUtil.isUndefinedOrNull($self.thirdPartyInformation))) {
            //     super.onProcessing();
            //     $self.serviceFacade.session.getLogIn(null, (sucess: boolean, result: any) => {
            //         $self.notaryParams = {
            //             id: null,
            //             obj: {
            //                 mode: null,
            //                 historyBack: $self.notaryParams.obj.historyBack,
            //                 notaryDetails: null
            //             }
            //         };
            //         _goBack($self.notaryParams);
            //     }, $self.thirdPartyInformation);
            // } else {
            //     switch (type) {
            //         case common.constants.CRUD.create:
            //             $self.$state.transitionTo("app.members");
            //             break;

            //         case common.constants.CRUD.update:
            //             $self.notaryDetailsRefresh((isSuccess: boolean, message: string) => {});
            //             break;
            //     }
            // }
        }

        onFailed(response: any) {
            $self.toggleLoading();

            if (response instanceof String) {
                $self.message = response.toString();
                $self.serviceFacade.notification.failed(response.toString());
            }

            // if (response.data) {
            //     $self.message = response.data.message || response.data;
            //     $self.serviceFacade.notification.failed($self.getModelStateErrorMessage(response) || $self.message);
            // } else if (typeof response.status === "number" && !$self.ngUtil.isNullOrEmpty(response.statusText)) {
            //     $self.serviceFacade.notification.failed(response.statusText);
            // }
        }
        //#endregion
    }

    angular.module(moduleName).controller("notaryDetailsController", NotaryDetailsController);
}