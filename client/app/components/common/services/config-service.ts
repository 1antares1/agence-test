namespace agence.common.services {
    export class UrlFragment {
        constructor(public key: string,
            public value: string) { }
    }

    export interface IUrlFragment {
        [index: string]: string;
    }

    export interface IUrl {
        consultant: string;
        fragments: IUrlFragment;
    }

    export class Url implements IUrl {
        consultant: string;
        fragments: IUrlFragment;

        constructor() {
            this.init();
        }

        init(): void {
            this.initFragments();
        }

        initFragments(): void {
            this.fragments = {};
            this.fragments["consultants"] = "/consultants";
            this.fragments["report"] = "/report";
        }
    }

    export interface IApi {
        url: IUrl;
        apiVersion: string;
    }

    export class Api {
        url: IUrl;
        apiVersion: string;
        constructor() {
            this.url = new Url();
            this.apiVersion = "/api";
        }
    }

    export class AppSettings {
        urls: Url;
    }

    export interface IConfigService {
        api: IApi;
        appSettings: AppSettings;
    }

    export class ConfigService {
        api: IApi;
        appSettings: AppSettings;
        isInitialized: boolean;

        static $inject = ["appSettings"];
        constructor(private appsettings : AppSettings) {
            this.api = new Api();
            this.appSettings = appsettings;
        }
    }
    angular.module(moduleName).service("configService", ConfigService);
}
