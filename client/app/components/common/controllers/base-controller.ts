module agence.common.controllers {

    let $self: BaseController;

    export class BaseController {
        // logic variables
        loginReadyStateChange: boolean = false;
        isProcessing: boolean;
        loading: boolean;
        failed: boolean;
        messageType: string;
        isInitialized: boolean;
        returnUrl: string;
        messageTitle: string = "Agence-Service";
        message: string;
        onReadyContentStateChange: boolean = false;
        contentLoadingTitle: string;
        isOnSession: boolean = false;

        // dependency data
        consultantActions: Array<models.IAction>;

        private _serviceFacade: common.services.IServiceFacade;
        public static contentLoading: boolean;

        static $inject = ["serviceFacade"];
        constructor(
            serviceFacade: common.services.IServiceFacade
        ) {
            this._serviceFacade = serviceFacade;

            //#region [global set values] Is existing instance?
            if (!this._serviceFacade.util.isUndefinedOrNull($self) && !this._serviceFacade.util.isUndefinedOrNull(($self as any).$scope)) {
                let _$rootScope: any = ($self as any).$scope.$parent;
                if (!this._serviceFacade.util.isUndefinedOrNull(_$rootScope) && !this._serviceFacade.util.isUndefinedOrNull(_$rootScope.vm)) {
                    this._serviceFacade.branding.logoId = _$rootScope.vm.logoId || this._serviceFacade.branding.logoId;
                    this._serviceFacade.branding.logoUrl = _$rootScope.vm.logoUrl || this._serviceFacade.branding.logoUrl;
                    this._serviceFacade.branding.logoCss = _$rootScope.vm.logoCss || this._serviceFacade.branding.logoCss;
                }
            }
            $self = this;
        }

        init(): void {
            $self = this;
            //#endregion
            this.loading = true;
            this.returnUrl = "app.";
        }

        datatableSetup(dtInstance: any, settings: models.IDatatableSetup, callbackResult?: (result: boolean) => void): void {
            if (dtInstance && settings) {
                // getting objects
                let inputSearch: HTMLInputElement, divProcessing: HTMLDivElement;

                // input search settings
                if (dtInstance.nTableWrapper != null) {
                    inputSearch = dtInstance.nTableWrapper.querySelector("input[type='search']");
                    if (inputSearch != null) {
                        if (settings.inputSearchClass && typeof settings.inputSearchClass === "string") {
                            inputSearch.className += settings.inputSearchClass;
                        }
                        if (settings.inputSearchClass && typeof settings.inputSearchPlaceholder === "string") {
                            inputSearch.setAttribute("placeholder", settings.inputSearchPlaceholder);
                        }
                    }
                    // loading processing container
                    if (settings.isProcessing) {
                        divProcessing = dtInstance.nTableWrapper.querySelector(".dataTables_processing");
                        divProcessing.innerHTML = '<div class="spinner-background-2"><label>Processing...</label><br><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';
                    }

                    // settings server-side
                    if (settings.isServerSide) {
                        // ToDo
                    }

                    // settings custom empty
                    if (settings.customEmpty) {
                        let _nodes: NodeListOf<Element> = (dtInstance.nTable as HTMLTableElement).querySelectorAll(".dataTables_empty");
                        if (_nodes && _nodes.length) {
                            for (let i = 0; i < _nodes.length; i++) {
                                angular.element(_nodes[i]).text(settings.customEmpty);
                            }
                        }
                    }

                    // input search delay event
                    if (settings.searchDelay) {
                        jQuery(inputSearch).off("keyup.DT input.DT");

                        let searchDelay: number, search: string, table: HTMLTableElement;

                        jQuery(inputSearch).on("input", ((event: JQueryEventObject) => {
                            search = inputSearch.value;
                            table = dtInstance.nTableWrapper.querySelector('table.table');

                            clearTimeout(searchDelay);
                            if (angular.isDefined(table)) {
                                searchDelay = window.setTimeout(() => {
                                    if (angular.isDefined(search) && (search === "" || search.length > 0)) {
                                        (<models.JQueryDataTable>jQuery(table)).DataTable().data().search(search).draw();
                                    }
                                }, settings.delayTime || 1000);
                            }
                        }));
                    }

                    // default loading layer: Text 'Processing'
                    if (settings.removeLoadingLayer) {

                    }

                    // finish with result, if callback exists 
                    if (callbackResult) {
                        callbackResult(true);
                    }
                }
            }
        }

        datatableInputSearchToggle(tableId: string, disabled: boolean): void {
            let $self = this;
            if (tableId != null && tableId !== "") {
                let _dtDivFilter: HTMLElement = document.getElementById(tableId.concat("_filter"));
                if (_dtDivFilter != null) {
                    let _inputSearch: HTMLInputElement = (_dtDivFilter.querySelector('input[type="search"]') as HTMLInputElement);
                    if (_inputSearch != null) {
                        _inputSearch.disabled = disabled;
                        switch (disabled) {
                            case true: jQuery(_inputSearch).addClass(" disabled ");
                                break;

                            case false:
                                jQuery(_inputSearch).removeClass("disabled");
                                jQuery(_inputSearch).focus();
                                break;
                        }
                    }
                }
            }
        }

        getNotaryActions(): Array<models.IAction> {
            $self = this;

            // notary actions list
            $self.consultantActions = [
                { key: 0, name: "Add", icon: "add-consultant-on", option: constants.CRUD.create },
                { key: 1, name: "Edit", icon: "edit-consultant-on", option: constants.CRUD.update },
                { key: 2, name: "Remove", icon: "delete-consultant-on", option: constants.CRUD.delete },
                { key: 3, name: "Read", icon: "view-consultant-on", option: constants.CRUD.read }
            ];

            return $self.consultantActions;
        }

        mergeScopes(scopeSrc: any, scopeDst: any): any {
            let $self = this;
            let _newScope: any;
            if (!$self._serviceFacade.util.isNullOrEmpty(scopeSrc) && !$self._serviceFacade.util.isNullOrEmpty(scopeDst)) {
                _newScope = angular.extend(scopeDst, scopeSrc);
                _newScope = angular.extend(scopeDst, Object.getPrototypeOf(scopeSrc));
            }
            return _newScope || scopeDst;
        }

        onProcessing(isProcessing: boolean = true): void {
            this.failed = false;
            this.loading = isProcessing;
            this.isProcessing = isProcessing;
        }

        onSuccess(): void {
            $self = this;
            $self.failed = false;
            $self.loading = false;
            $self.isProcessing = false;
        }

        onFailed(response: any) {
            if (typeof response === "string") {
                $self.message = response;
            }

            $self.loading = false;
            $self.isProcessing = false;
            $self.failed = true;

            if (response) {
                let _showAlert = (): void => {
                    if ($self.message !== "") {
                        if(response.data) {
                            if(typeof response.data.error === "string") {
                                $self.notification(common.APIMessageType.failed, response.data.error, $self.messageTitle);
                            }
                            if(typeof response.data.stack === "string") {
                                $self.notification(common.APIMessageType.failed, response.data.stack, $self.messageTitle);
                            }
                            if(response.status || response.statusText) {
                                $self.notification(common.APIMessageType.failed, (response.statusText || response.status), $self.messageTitle);
                            }
                        }
                    }
                }
                $self.message = ((response.data)) ? (response.data.message || response.data) : (response.message || response);

                switch (response.status) {
                    default: _showAlert();
                        break;
                }
            }
        }

        onReadyStateChange(isReady: boolean, message?: string) {
            $self = this;
            $self.onReadyContentStateChange = isReady;
            $self.contentLoadingTitle = (!isReady) ? message : null;
            let _wrapperContent: ng.IAugmentedJQuery = angular.element("aside[name='nnaLoadingContent']");
            let _ngHideClass: string = "ng-hide";

            // bug in certains jQuery callbacks that leave the $scope and doesn't update ng-model
            if (isReady) {
                if (!_wrapperContent.hasClass(_ngHideClass)) {
                    _wrapperContent.addClass(_ngHideClass);
                }
            }
            else {
                if (_wrapperContent.hasClass(_ngHideClass)) {
                    _wrapperContent.removeClass(_ngHideClass);
                }
            }
        }

        notification(type: common.APIMessageType, message: string, title?: string): void {
            switch (type) {
                case common.APIMessageType.error: $self._serviceFacade.notification.failed(message, title);
                    break;

                case common.APIMessageType.failed: $self._serviceFacade.notification.failed(message, title);
                    break;

                case common.APIMessageType.information: $self._serviceFacade.notification.info(message, title);
                    break;

                case common.APIMessageType.success: $self._serviceFacade.notification.success(message, title);
                    break;

                case common.APIMessageType.warning: $self._serviceFacade.notification.warning(message, title);
                    break;

                default: $self._serviceFacade.notification.failed(message);
                    break;
            }
        }
    }
}