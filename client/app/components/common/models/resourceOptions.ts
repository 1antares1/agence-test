namespace agence.common.models {

    export interface IResourceOptions extends ng.resource.IResourceOptions {
        url: string;
        paramsDefault: any;
        headers: string;
    }

    export class ResourceOptions implements IResourceOptions {
        constructor(
            public url: string,
            public paramsDefault: any,
            public headers: string) { }
    };
}
