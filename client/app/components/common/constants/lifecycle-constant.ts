namespace agence.common.constants {
    export enum CRUD {
        create,
        read,
        update,
        delete
    }

    export interface ILifeCycle {
        IS_HTTP_REQUEST_VALID: boolean;
        DEFAULT_BRANDING_LINK_ID: string;
        DEFAULT_IMAGE_SRC: string;
        DEFAULT_HEADER_LOGO_ID: string;
        DEFAULT_HEADER_LOGO_SRC: string;
        CONSULTANT_INFORMATION: models.IConsultant;
    }

    export class LifeCycleConstant {
        public static lifeCycleApp: ILifeCycle = {
            IS_HTTP_REQUEST_VALID: false,
            DEFAULT_BRANDING_LINK_ID: "brandingLogoLink",
            DEFAULT_IMAGE_SRC: "./content/images/image-default.png",
            DEFAULT_HEADER_LOGO_ID: "companyLogo",
            DEFAULT_HEADER_LOGO_SRC: "/content/images/logo.png",
            CONSULTANT_INFORMATION: null
        }
    }

    angular.module(moduleName).constant("lifeCycle", [() => new LifeCycleConstant()]);
}