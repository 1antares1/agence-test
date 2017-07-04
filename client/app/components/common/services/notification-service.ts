namespace agence.common.services {
    export interface INotificationService {
        success(message: string, title?: string): void;
        failed(message: string, title?: string): void;
        info(message: string, title?: string): void;
        warning(message: string, title?: string): void;
    }

    export class NotificationService implements INotificationService {
        static $inject = ["toaster"];

        constructor(private toaster: any) { }
        private defaultTitle(value: string) {
            return (value != null && value != undefined) ? value : "";
        }

        success(message: string, title?: string): void {
            this.toaster.pop('success', "", message);
        }
        failed(message: string, title?: string): void {
            this.toaster.pop('error', "", message);
        }
        info(message: string, title?: string): void {
            this.toaster.pop('info', "", message);
        }
        warning(message: string, title?: string): void {
            this.toaster.pop('warning', "", message);
        }
    }

    angular.module(appName).service("notificationService", NotificationService);
}