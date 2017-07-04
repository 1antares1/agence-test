namespace agence.common.services {
    export interface IConsultantResource extends ng.resource.IResourceClass < agence.common.models.IConsultant > { }

    export interface IPerformanceReportResource extends ng.resource.IResourceClass < agence.common.models.IPerformanceReportMonth > { }

    export interface IConsultantDataService extends IDataAccessService {
        getConsultantResource(offUsers?: boolean): IConsultantResource;
        getConsultantsReportResource(): IPerformanceReportResource;
    }

    export class ConsultantDataService extends DataAccessService implements IConsultantDataService {
        static $inject = ["$resource", "configService", "utilService"];
        constructor(public $resource: ng.resource.IResourceService, public configService: IConfigService, protected ngUtil: IUtilService) {
            super($resource, configService);
        }

        getConsultantResource(offUsers?: boolean): IConsultantResource {
            var fragment = this.configService.api.url.fragments[APIConcepts[APIConcepts.consultants]];
            var urlFragment = this.ngUtil.format("{0}/{1}", fragment, ((offUsers) ? 1 : 0));
            return <IConsultantResource>this.getAnonymousResource(urlFragment);
        }

        getConsultantsReportResource(): IPerformanceReportResource {
            var fragment = this.configService.api.url.fragments[APIConcepts[APIConcepts.consultants]];
            var urlFragment = this.ngUtil.format("{0}{1}", fragment, this.configService.api.url.fragments[APIConcepts[APIConcepts.report]]);
            return <IPerformanceReportResource>this.getAnonymousResource(urlFragment);
        }
    }

    angular.module(moduleName).service("consultantDataService", ConsultantDataService);
}