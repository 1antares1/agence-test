namespace agence.common.factories {
    let $self: Localize;

    interface IFilterLocalizeResource {
        key: string;
        value: string;
        description: string;
    }

    export interface ILocalize {
        resourcesListenerName: string;
        resourceFileLoaded: boolean;
        getLocalizedString(value: string): string;
    }

    export class Localize implements ILocalize {
        static $inject = ["$http", "$rootScope", "$window"];
        private language: string;
        private dictionary: Array<IFilterLocalizeResource>;
        private url: string;
        resourceFileLoaded: boolean;
        resourcesListenerName: string = "localizeResourcesUpdated";

        constructor(
            protected $http: angular.IHttpService
            , protected $rootScope: angular.IRootScopeService
            , protected $window: angular.IWindowService
        ) {
            $self = this;
            $self.init();
        }

        private init(): void {
            $self.language = ($self.$window.navigator as any).userLanguage || $self.$window.navigator.language;
            $self.initLocalizedResources();
        }

        private initLocalizedResources(): void {
            let url = $self.url || $self.buildUrl();
            $self.$http({ method: "GET", url: url, cache: false })
                .then((promiseValue: ng.IHttpPromiseCallbackArg<any>) => {
                    $self.successCallback(promiseValue.data);
                }).catch((reason: any) => {
                    let url = "assets/i18n/resources-locale-en-US.js";
                    $self.$http({ method: "GET", url: url, cache: false }).then((promiseValue: ng.IHttpPromiseCallbackArg<any>) => {
                        $self.successCallback(promiseValue.data);
                    });
                });
        }

        private buildUrl(): string {
            $self = this;
            if (!$self.language) {
                let lang, androidLang;
                if ($self.$window.navigator && $self.$window.navigator.userAgent && (androidLang = $self.$window.navigator.userAgent.match(/android.*\W(\w\w)-(\w\w)\W/i))) {
                    lang = androidLang[1];
                } else {
                    lang = ($self.$window.navigator as any).userLanguage || $self.$window.navigator.language;
                }
                $self.language = lang;
            }
            return "".concat("assets/i18n/resources-locale-", $self.language, ".js");
        }

        private successCallback(response: any): void {
            $self.dictionary = (response != null && response.data != null) ? response.data : response;
            if ($self.dictionary != undefined && $self.dictionary.length) {
                $self.resourceFileLoaded = true;
                $self.$rootScope.$broadcast($self.resourcesListenerName);
            }
        }

        private setLanguage(value: string): void {
            $self.language = value;
            $self.initLocalizedResources();
        }

        private setUrl(value: string): void {
            $self.url = value;
            $self.initLocalizedResources();
        }

        getLocalizedString(value: string): string {
            let _result: string = "Value Not found";
            let _entry: Array<IFilterLocalizeResource>;

            if ($self.dictionary && $self.dictionary.length) {
                _entry = $self.dictionary.filter((val: IFilterLocalizeResource, idx: number, arr: Array<IFilterLocalizeResource>) => {
                    return val.key === value;
                });
                _result = (_entry && _entry.length) ? _entry[0].value : _result;
            }
            switch (value) {
                case "_Copyright_": _result = _result.replace(/\{\{|\}\}|\{(\d+)\}/g, new Date().getFullYear().toString());
                    break;
                case "_CopyrightShort_": _result = _result.replace(/\{\{|\}\}|\{(\d+)\}/g, new Date().getFullYear().toString());
                    break;
            }
            return _result;
        }
    };

    function factory(
        $http: angular.IHttpService
        , $rootScope: angular.IRootScopeService
        , $window: angular.IWindowService
    ) {
        return new Localize($http, $rootScope, $window);
    }

    angular.module(moduleName).factory("localize", factory);
}