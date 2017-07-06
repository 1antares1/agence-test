var agence;
(function (agence) {
    var common;
    (function (common) {
        var services;
        (function (services) {
            var NotificationService = (function () {
                function NotificationService(toaster) {
                    this.toaster = toaster;
                }
                NotificationService.prototype.defaultTitle = function (value) {
                    return (value != null && value != undefined) ? value : "";
                };
                NotificationService.prototype.success = function (message, title) {
                    this.toaster.pop('success', "", message);
                };
                NotificationService.prototype.failed = function (message, title) {
                    this.toaster.pop('error', "", message);
                };
                NotificationService.prototype.info = function (message, title) {
                    this.toaster.pop('info', "", message);
                };
                NotificationService.prototype.warning = function (message, title) {
                    this.toaster.pop('warning', "", message);
                };
                NotificationService.$inject = ["toaster"];
                return NotificationService;
            }());
            services.NotificationService = NotificationService;
            angular.module(agence.appName).service("notificationService", NotificationService);
        })(services = common.services || (common.services = {}));
    })(common = agence.common || (agence.common = {}));
})(agence || (agence = {}));
//# sourceMappingURL=notification-service.js.map