var agence;
(function (agence) {
    var common;
    (function (common) {
        var values;
        (function (values) {
            var BrandingValue = (function () {
                function BrandingValue() {
                    this.busy = false;
                    this.brandLinkId = "brandingLogoLink";
                    this.baseHref = "http://www.agencetest.com";
                    this.logoId = null;
                    this.logoUrl = null;
                    this.logoCss = null;
                }
                return BrandingValue;
            }());
            values.BrandingValue = BrandingValue;
            angular.module(common.moduleName).value("branding", new BrandingValue());
        })(values = common.values || (common.values = {}));
    })(common = agence.common || (agence.common = {}));
})(agence || (agence = {}));
