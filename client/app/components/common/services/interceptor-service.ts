namespace agence.common.Services {
    
    export class InterceptorService implements angular.IHttpInterceptor {
        public static Factory(
            $location: angular.ILocationService,
            $q: angular.IQService,
            lifeCycle: constants.ILifeCycle): any {
            return new InterceptorService($location, $q, lifeCycle);
        }

        public constructor(
            private $location: angular.ILocationService,
            private $q: angular.IQService,
            private lifeCycle: constants.ILifeCycle
        ) { }
        baseURI: string = "/dashboard/";

        public request = (config: any): angular.IRequestConfig => {
            config.headers = config.headers || {};
            return config;
        };

        public responseError = (rejection: any): any => {
            return this.$q.reject(rejection);
        }
    };

    InterceptorService.Factory.$inject = ["$location", "$q", "lifeCycle"];
    angular.module(appName).factory("interceptorService", InterceptorService.Factory);
}