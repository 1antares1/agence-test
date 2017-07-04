namespace agence.common.values {
    export interface IBrandingValue {
        busy: boolean;
        baseHref: string;
        brandLinkId: string;
        logoId: string;
        logoUrl: string;
        logoCss: string;
    }

    export class BrandingValue implements IBrandingValue {
        public busy: boolean;
        public baseHref: string;
        public brandLinkId: string;
        public logoId: string;
        public logoUrl: string;
        public logoCss: string;

        constructor() {
            this.busy = false;
            this.brandLinkId = "brandingLogoLink";
            this.baseHref = "http://www.agencetest.com";
            this.logoId = null;
            this.logoUrl = null;
            this.logoCss = null;
        }
    }

    angular.module(moduleName).value("branding", new BrandingValue());
}