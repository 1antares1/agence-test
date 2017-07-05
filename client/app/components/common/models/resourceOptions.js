var agence;
(function (agence) {
    var common;
    (function (common) {
        var models;
        (function (models) {
            var ResourceOptions = (function () {
                function ResourceOptions(url, paramsDefault, headers) {
                    this.url = url;
                    this.paramsDefault = paramsDefault;
                    this.headers = headers;
                }
                return ResourceOptions;
            }());
            models.ResourceOptions = ResourceOptions;
            ;
        })(models = common.models || (common.models = {}));
    })(common = agence.common || (agence.common = {}));
})(agence || (agence = {}));
//# sourceMappingURL=resourceOptions.js.map