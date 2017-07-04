var agence;
(function (agence) {
    var common;
    (function (common) {
        var controllers;
        (function (controllers) {
            var $self;
            var BaseController = (function () {
                function BaseController(serviceFacade) {
                    this.loginReadyStateChange = false;
                    this.messageTitle = "Agence-Service";
                    this.onReadyContentStateChange = false;
                    this.isOnSession = false;
                    this._serviceFacade = serviceFacade;
                    if (!this._serviceFacade.util.isUndefinedOrNull($self) && !this._serviceFacade.util.isUndefinedOrNull($self.$scope)) {
                        var _$rootScope = $self.$scope.$parent;
                        if (!this._serviceFacade.util.isUndefinedOrNull(_$rootScope) && !this._serviceFacade.util.isUndefinedOrNull(_$rootScope.vm)) {
                            this._serviceFacade.branding.logoId = _$rootScope.vm.logoId || this._serviceFacade.branding.logoId;
                            this._serviceFacade.branding.logoUrl = _$rootScope.vm.logoUrl || this._serviceFacade.branding.logoUrl;
                            this._serviceFacade.branding.logoCss = _$rootScope.vm.logoCss || this._serviceFacade.branding.logoCss;
                        }
                    }
                    $self = this;
                }
                BaseController.prototype.init = function () {
                    $self = this;
                    this.loading = true;
                    this.returnUrl = "app.";
                };
                BaseController.prototype.datatableSetup = function (dtInstance, settings, callbackResult) {
                    if (dtInstance && settings) {
                        var inputSearch_1, divProcessing = void 0;
                        if (dtInstance.nTableWrapper != null) {
                            inputSearch_1 = dtInstance.nTableWrapper.querySelector("input[type='search']");
                            if (inputSearch_1 != null) {
                                if (settings.inputSearchClass && typeof settings.inputSearchClass === "string") {
                                    inputSearch_1.className += settings.inputSearchClass;
                                }
                                if (settings.inputSearchClass && typeof settings.inputSearchPlaceholder === "string") {
                                    inputSearch_1.setAttribute("placeholder", settings.inputSearchPlaceholder);
                                }
                            }
                            if (settings.isProcessing) {
                                divProcessing = dtInstance.nTableWrapper.querySelector(".dataTables_processing");
                                divProcessing.innerHTML = '<div class="spinner-background-2"><label>Processing...</label><br><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';
                            }
                            if (settings.isServerSide) {
                            }
                            if (settings.customEmpty) {
                                var _nodes = dtInstance.nTable.querySelectorAll(".dataTables_empty");
                                if (_nodes && _nodes.length) {
                                    for (var i = 0; i < _nodes.length; i++) {
                                        angular.element(_nodes[i]).text(settings.customEmpty);
                                    }
                                }
                            }
                            if (settings.searchDelay) {
                                jQuery(inputSearch_1).off("keyup.DT input.DT");
                                var searchDelay_1, search_1, table_1;
                                jQuery(inputSearch_1).on("input", (function (event) {
                                    search_1 = inputSearch_1.value;
                                    table_1 = dtInstance.nTableWrapper.querySelector('table.table');
                                    clearTimeout(searchDelay_1);
                                    if (angular.isDefined(table_1)) {
                                        searchDelay_1 = window.setTimeout(function () {
                                            if (angular.isDefined(search_1) && (search_1 === "" || search_1.length > 0)) {
                                                jQuery(table_1).DataTable().data().search(search_1).draw();
                                            }
                                        }, settings.delayTime || 1000);
                                    }
                                }));
                            }
                            if (settings.removeLoadingLayer) {
                            }
                            if (callbackResult) {
                                callbackResult(true);
                            }
                        }
                    }
                };
                BaseController.prototype.datatableInputSearchToggle = function (tableId, disabled) {
                    var $self = this;
                    if (tableId != null && tableId !== "") {
                        var _dtDivFilter = document.getElementById(tableId.concat("_filter"));
                        if (_dtDivFilter != null) {
                            var _inputSearch = _dtDivFilter.querySelector('input[type="search"]');
                            if (_inputSearch != null) {
                                _inputSearch.disabled = disabled;
                                switch (disabled) {
                                    case true:
                                        jQuery(_inputSearch).addClass(" disabled ");
                                        break;
                                    case false:
                                        jQuery(_inputSearch).removeClass("disabled");
                                        jQuery(_inputSearch).focus();
                                        break;
                                }
                            }
                        }
                    }
                };
                BaseController.prototype.getNotaryActions = function () {
                    $self = this;
                    $self.consultantActions = [
                        { key: 0, name: "Add", icon: "add-consultant-on", option: common.constants.CRUD.create },
                        { key: 1, name: "Edit", icon: "edit-consultant-on", option: common.constants.CRUD.update },
                        { key: 2, name: "Remove", icon: "delete-consultant-on", option: common.constants.CRUD.delete },
                        { key: 3, name: "Read", icon: "view-consultant-on", option: common.constants.CRUD.read }
                    ];
                    return $self.consultantActions;
                };
                BaseController.prototype.mergeScopes = function (scopeSrc, scopeDst) {
                    var $self = this;
                    var _newScope;
                    if (!$self._serviceFacade.util.isNullOrEmpty(scopeSrc) && !$self._serviceFacade.util.isNullOrEmpty(scopeDst)) {
                        _newScope = angular.extend(scopeDst, scopeSrc);
                        _newScope = angular.extend(scopeDst, Object.getPrototypeOf(scopeSrc));
                    }
                    return _newScope || scopeDst;
                };
                BaseController.prototype.onProcessing = function (isProcessing) {
                    if (isProcessing === void 0) { isProcessing = true; }
                    this.failed = false;
                    this.loading = isProcessing;
                    this.isProcessing = isProcessing;
                };
                BaseController.prototype.onSuccess = function () {
                    $self = this;
                    $self.failed = false;
                    $self.loading = false;
                    $self.isProcessing = false;
                };
                BaseController.prototype.onFailed = function (response) {
                    if (typeof response === "string") {
                        $self.message = response;
                    }
                    $self.loading = false;
                    $self.isProcessing = false;
                    $self.failed = true;
                    if (response) {
                        var _showAlert = function () {
                            if ($self.message !== "") {
                                if (response.data) {
                                    if (typeof response.data.error === "string") {
                                        $self.notification(common.APIMessageType.failed, response.data.error, $self.messageTitle);
                                    }
                                    if (typeof response.data.stack === "string") {
                                        $self.notification(common.APIMessageType.failed, response.data.stack, $self.messageTitle);
                                    }
                                }
                            }
                        };
                        $self.message = ((response.data)) ? (response.data.message || response.data) : (response.message || response);
                        switch (response.status) {
                            default:
                                _showAlert();
                                break;
                        }
                    }
                };
                BaseController.prototype.onReadyStateChange = function (isReady, message) {
                    $self = this;
                    $self.onReadyContentStateChange = isReady;
                    $self.contentLoadingTitle = (!isReady) ? message : null;
                    var _wrapperContent = angular.element("aside[name='nnaLoadingContent']");
                    var _ngHideClass = "ng-hide";
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
                };
                BaseController.prototype.notification = function (type, message, title) {
                    switch (type) {
                        case common.APIMessageType.error:
                            $self._serviceFacade.notification.failed(message, title);
                            break;
                        case common.APIMessageType.failed:
                            $self._serviceFacade.notification.failed(message, title);
                            break;
                        case common.APIMessageType.information:
                            $self._serviceFacade.notification.info(message, title);
                            break;
                        case common.APIMessageType.success:
                            $self._serviceFacade.notification.success(message, title);
                            break;
                        case common.APIMessageType.warning:
                            $self._serviceFacade.notification.warning(message, title);
                            break;
                        default:
                            $self._serviceFacade.notification.failed(message);
                            break;
                    }
                };
                BaseController.$inject = ["serviceFacade"];
                return BaseController;
            }());
            controllers.BaseController = BaseController;
        })(controllers = common.controllers || (common.controllers = {}));
    })(common = agence.common || (agence.common = {}));
})(agence || (agence = {}));
