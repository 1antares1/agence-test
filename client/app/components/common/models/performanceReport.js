var agence;
(function (agence) {
    var common;
    (function (common) {
        var models;
        (function (models) {
            var PerformanceReport = (function () {
                function PerformanceReport(co_usuario, no_usuario, no_email, nu_telefone, url_foto, months) {
                    this.co_usuario = co_usuario;
                    this.no_usuario = no_usuario;
                    this.no_email = no_email;
                    this.nu_telefone = nu_telefone;
                    this.url_foto = url_foto;
                    this.months = months;
                }
                return PerformanceReport;
            }());
            models.PerformanceReport = PerformanceReport;
        })(models = common.models || (common.models = {}));
    })(common = agence.common || (agence.common = {}));
})(agence || (agence = {}));
//# sourceMappingURL=performanceReport.js.map