namespace agence.common.services {
    import IConsultantDataService = agence.common.models.IConsultant;

    interface IResourceExtend extends ng.resource.IResource<IResourceExtend> { }

    export const enum DataAccessMode {
        anonymous,
        authenticated
    }

    export interface IDataAccessService {
        consultant: IConsultantDataService;
    }

    export interface IGenericResource<T> extends ng.resource.IResourceClass<T> {
        update(entity: T): T;
    }

    export interface IGenericExtendResource<T> extends ng.resource.IResourceClass<IResourceExtend> {
        update(entity: T): T;
    }

    export class MethodConfig {
        constructor(public method: string, public isArray: boolean, public headers: any) { }
    }

    export class MethodsConfig {
        delete: MethodConfig;
        query: MethodConfig;
        save: MethodConfig;
        get: MethodConfig;
        update: MethodConfig;
    }

    export class DataAccessService implements IDataAccessService {
        consultant: IConsultantDataService;
        anonymousMethodConfigs: MethodsConfig;
        static $inject = ["$resource", "configService"];
        constructor(public $resource: ng.resource.IResourceService, public configService: agence.common.services.IConfigService
        ) {
            this.init();
        }

        init(): void {
            this.initMethodConfig();
        };

        initMethodConfig(): void {
            let query = new MethodConfig("GET", true, {});
            let save = new MethodConfig("POST", false, {});
            let get = new MethodConfig("GET", false, {});
            let update = new MethodConfig("PUT", false, {});
            let del = new MethodConfig("DELETE", false, {});

            this.anonymousMethodConfigs = new MethodsConfig();
            this.anonymousMethodConfigs.query = query;
            this.anonymousMethodConfigs.save = save;
            this.anonymousMethodConfigs.get = get;
            this.anonymousMethodConfigs.update = update;
            this.anonymousMethodConfigs.delete = del;
        };

        baseUrl(): string {
            if (this instanceof ConsultantDataService)
                return this.configService.appSettings.urls.consultant;
        };

        create(url: string) {

        }

        composeUrl(urlfragment: string): string {
            if (urlfragment.indexOf("/") === -1) {
                urlfragment = this.configService.api.url.fragments[urlfragment];
            }
            return this.baseUrl() + this.configService.api.apiVersion + urlfragment;
        };

        composeFragmentWithVersion(urlFragment: string) {
            if (urlFragment.indexOf("/") === -1) {
                urlFragment = this.configService.api.url.fragments[urlFragment];
            }

            return this.configService.api.apiVersion + urlFragment;
        };

        signAnonymousRequest(url: string): any {
            return this.anonymousMethodConfigs;
        };

        getAnonymousResource(urlFragment: string): ng.resource.IResourceClass<any> {
            var methodConfig = this.signAnonymousRequest(this.composeFragmentWithVersion(urlFragment));
            var url = this.composeUrl(urlFragment);            
            return this.$resource(url, null, methodConfig);
        };

        getAnonymousOptions(urlFragment: string): models.IResourceOptions {
            let methodsConfig: agence.common.services.MethodsConfig = this.signAnonymousRequest(this.composeFragmentWithVersion(urlFragment));
            var url = this.composeUrl(urlFragment);
            let options: models.IResourceOptions;
            return options = {
                url: url,
                paramsDefault: null,
                headers: methodsConfig.get.headers.Authorization,
                cancellable: true,
                stripTrailingSlashes: true
            };
        };
    }

    angular.module(moduleName).service("dataService", DataAccessService);
}
