namespace agence.common.services {

    import models = agence.common.models;

    export interface IServiceFacade {
        consultant: IConsultantDataService;
        notification: INotificationService;
        util: IUtilService;
        appSettings: AppSettings;
        lifeCycle: common.constants.ILifeCycle;
        branding: values.IBrandingValue;
    }

    export class ServiceFacade implements IServiceFacade {
        consultant: IConsultantDataService
        notification: INotificationService;
        util: IUtilService;
        appSettings: AppSettings;
        lifeCycle: common.constants.ILifeCycle;
        branding: values.IBrandingValue;

        static $inject = [
            "consultantDataService"
            , "notificationService"
            , "utilService"
            , "appSettings"
            , "lifeCycle"
            , "branding"
        ];

        constructor(
            consultantDatService: IConsultantDataService,
            notificationService: INotificationService,
            utilService: IUtilService,
            appSettings: AppSettings,
            lifeCycle: common.constants.ILifeCycle,
            branding: values.IBrandingValue
        ) {
            this.consultant = consultantDatService;
            this.notification = notificationService;
            this.util = utilService;
            this.appSettings = appSettings;
            this.lifeCycle = lifeCycle;
            this.branding = branding;
        }
    }

    angular.module(appName).service("serviceFacade", ServiceFacade);
}