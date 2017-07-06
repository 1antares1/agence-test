namespace agence.common.services {
    export enum Browser {
        msie,
        edge,
        chrome,
        firefox,
        safari
    }

    export interface IUtilService {
        clearPageSesion: boolean;
        confirmPageExit: boolean;
        isUndefinedOrNull(val: any): boolean;
        isNullOrEmpty(val: any): boolean;
        startsWith(text: string, pattern: string): boolean;
        generateGuid(): string;
        getDeviceName(): Browser | string;
        format(sentence: string, ...args: any[]): string;
        formatMoney(value: number): string;
        stringToDate(text: string): Date;
        timeToDate(text: string): Date;
        concatDateWithTime(dateValue: Date, timeValue: Date): Date;
        paddy(value: string, padCount: number, character?: string): string;
        compare(phrase: string, compareTo: string): boolean;
        cleanText(value: string): string;
        execLeavePageConfirm(confirmMessage: string): void;
        togglePageSessionVariables(value: boolean): void;
    }

    export class UtilService implements IUtilService {
        static $inject = ["$templateCache", "$window"];
        clearPageSesion: boolean;
        confirmPageExit: boolean;

        constructor(
            private $templateCache: angular.ITemplateCacheService,
            private $window: ng.IWindowService
        )
        { }

        private s4(): string {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        isUndefinedOrNull(val: any): boolean {
            return angular.isUndefined(val) || val === null;
        }

        isNullOrEmpty(val: any): boolean {
            return angular.isUndefined(val) || val === null || (val as string).toString() === "";
        }

        startsWith(text: string, pattern: string): boolean {
            let $self = this;
            let _result: boolean = false;
            if (!$self.isNullOrEmpty(text) && !$self.isNullOrEmpty(pattern)) {
                _result = text.slice(-pattern.length) === pattern;
            }
            return _result;
        }

        generateGuid(): string {
            return this.s4() + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" +
                this.s4() + "-" + this.s4() + this.s4() + this.s4();
        }

        getDeviceName(): Browser | string {
            let $self = this
                , name: string = "unknown"
                , userAgent: string = $self.$window.navigator.userAgent
                , browsers: any = { msie: /internet explorer/i, ie11: /Trident\/7\./, edge: /edge/i, chrome: /chrome/i, safari: /safari/i, firefox: /firefox/i };

            for (let key in browsers) {
                if (browsers[key].test(userAgent)) {
                    if (key === "internet explorer" || key === "ie11") {
                        return Browser.msie;
                    }
                    return Browser[parseInt(key)];
                }
            };
        }

        format(sentence: string, ...args: any[]): string {
            let newString: string, argsCount: number = args.length;
            return sentence.replace(/\{\{|\}\}|\{(\d+)\}/g, (m, n) => {
                if (m == "{{") { return "{"; }
                if (m == "}}") { return "}"; }
                return args[n];
            });
        }
        formatMoney(value: number) {
            let formatter: Intl.NumberFormat = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2
            });
            return formatter.format(value);
        }

        stringToDate(text: string): Date {
            let _strToNum: number = Date.parse(text);
            if (isNaN(_strToNum)) {
                return null;
            }
            let _newDate: Date = new Date(text);
            return _newDate = new Date(_newDate.setDate(_newDate.getDate() + 1)); // JavaScript always decreases 1 day
        }

        timeToDate(text: string): Date {
            if (this.isNullOrEmpty(text)) {
                return null;
            }
            let _newDate: Date;
            return moment(text, ["h:m A", "H:m"]).toDate();
        }

        concatDateWithTime(dateValue: Date, timeValue: Date): Date {
            if (this.isNullOrEmpty(dateValue) || this.isNullOrEmpty(timeValue) || isNaN(Date.parse(dateValue.toDateString())) || isNaN(Date.parse(timeValue.toDateString()))) {
                return null;
            }
            return new Date(dateValue.getFullYear(), dateValue.getMonth(), dateValue.getDate(), timeValue.getHours(), timeValue.getMinutes(), timeValue.getSeconds(), timeValue.getMilliseconds());
        }

        paddy(value: string, padCount: number, character?: string): string {
            let pad_char = (!this.isNullOrEmpty(character)) ? character : "0";
            let pad = new Array(1 + padCount).join(pad_char);
            return (pad + value).slice(-pad.length);
        }

        compare(phrase: string, compareTo: string): boolean {
            let _result: boolean = false;
            if (phrase && compareTo && compareTo !== "") {
                _result = phrase.toLowerCase().indexOf(compareTo.toLowerCase()) !== -1;
            }
            return _result;
        }

        cleanText(value: string): string {
            return (!this.isNullOrEmpty(value)) ? value : "";
        }

        execLeavePageConfirm(confirmMessage: string): void {
            let _confirmEvent = (): string => {
                if (this.confirmPageExit) {
                    return confirmMessage;
                }
                else {
                    _clearEvents();
                }
            }

            let _clearPageSession = (): void => {
                if (this.clearPageSesion) {
                    _clearEvents();
                }
                else {
                    this.$window.onbeforeunload = () => { return _confirmEvent(); }
                    this.$window.onunload = () => { return _clearPageSession(); }
                }
            }

            let _clearEvents = (): void => {
                this.$window.onbeforeunload = null;
                this.$window.onunload = null;
            }

            _clearPageSession();
        }

        togglePageSessionVariables(value: boolean): void {
            this.confirmPageExit = value;
            this.clearPageSesion = value;
        }
    }

    angular.module(appName).service("utilService", UtilService);
}