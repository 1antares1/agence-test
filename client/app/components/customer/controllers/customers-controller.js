var agence;
(function (agence) {
    var customer;
    (function (customer) {
        var CustomersController = (function () {
            function CustomersController($state, serviceFacade, utilService, localize, DTOptionsBuilder, DTColumnBuilder, $compile, $scope, $rootScope) {
                this.$state = $state;
                this.serviceFacade = serviceFacade;
                this.utilService = utilService;
                this.localize = localize;
                this.DTOptionsBuilder = DTOptionsBuilder;
                this.DTColumnBuilder = DTColumnBuilder;
                this.$compile = $compile;
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.dtInstance = {};
                this.init();
            }
            CustomersController.prototype.init = function () {
                var self = this;
                self.refresh();
                this.$scope.customers = self;
                var scopeMember = this.$scope.members.loading = true;
            };
            CustomersController.prototype.refresh = function () {
                var _this = this;
                var self = this;
                var notariesOptions = null;
                self.dtOptions = self.DTOptionsBuilder.newOptions()
                    .withOption("ajax", {
                    url: notariesOptions.url,
                    type: "GET",
                    beforeSend: function (request) {
                        request.setRequestHeader("Authorization", notariesOptions.headers);
                    },
                    data: function (data, settings) {
                        _this.$scope.members.datatableInputSearchToggle(_this.dtInstance.id, true);
                        var _orderByColumn = data.columns[data.order[0].column].data;
                        var _descending = (data.order[0].dir.indexOf("desc") > -1);
                        if (_orderByColumn === "isActive")
                            _descending = !_descending;
                        var _fullName = data.search.value.split(" ");
                        return data = {
                            draw: data.draw,
                            firstName: _fullName[0] || _fullName,
                            middleName: _fullName[1] || _fullName,
                            lastName: _fullName[2] || _fullName,
                            rol: "Administrator",
                            page: (data.start / data.length) + 1,
                            count: data.length,
                            orderBy: function () {
                                var _orderByKey = 0;
                                switch (_orderByColumn) {
                                    case "userName":
                                        _orderByKey = 1;
                                        break;
                                    case "emailAddress":
                                        _orderByKey = 2;
                                        break;
                                    case "isActive":
                                        _orderByKey = 3;
                                        break;
                                }
                                return _orderByKey;
                            },
                            descending: _descending
                        };
                    },
                    dataSrc: function (result) {
                        _this.$scope.members.datatableInputSearchToggle(_this.dtInstance.id, false);
                        _this.models = result.items;
                        _this.originalModels = _this.models;
                        result.recordsTotal = result.totalCount;
                        result.recordsFiltered = result.totalCount;
                        if (angular.isDefined(_this.models) && _this.models.length) {
                            if (!_this.models.length) {
                                result.recordsTotal = 0;
                                result.recordsFiltered = 0;
                            }
                        }
                        return _this.models;
                    },
                    error: function (xhr, error, thrown) {
                        angular.element('.dataTables_processing').hide();
                        _this.$scope.members.datatableInputSearchToggle(_this.dtInstance.id, false);
                        self.$scope.members.onFailed(xhr);
                        self.onError(_this.localize.getLocalizedString("_ContactAdministratorNotifications_"));
                        self.onError(self.utilService.format(self.localize.getLocalizedString("_DataTableConnectionErrorNotifications_"), "User", xhr.statusText, notariesOptions.url));
                    }
                })
                    .withOption("searchDelay", 1)
                    .withOption("processing", true)
                    .withOption("serverSide", true)
                    .withLanguage({
                    "sProcessing": ""
                })
                    .withOption("createdRow", function (row, data, index) {
                    _this.$compile(angular.element(row).contents())(_this.$scope);
                })
                    .withOption('initComplete', function (settings) {
                    var inputSearch, divProcessing;
                    inputSearch = settings.nTableWrapper.querySelector('input[type="search"]');
                    inputSearch.className += "form-control";
                    divProcessing = settings.nTableWrapper.querySelector('.dataTables_processing');
                    divProcessing.innerHTML = '<div class="spinner-background-2"><label>Processing...</label><br><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';
                    jQuery(inputSearch).off('keyup.DT input.DT');
                    var searchDelay, search, table;
                    jQuery(inputSearch).on("input", (function (event) {
                        search = inputSearch.value;
                        table = settings.nTableWrapper.querySelector('table.table');
                        clearTimeout(searchDelay);
                        if (angular.isDefined(table)) {
                            searchDelay = window.setTimeout(function () {
                                if (angular.isDefined(search) && (search === "" || search.length > 0)) {
                                    jQuery(table).DataTable().data().search(search).draw();
                                }
                            }, 1000);
                        }
                    }));
                    _this.$scope.members.loading = false;
                })
                    .withPaginationType('full_numbers');
                self.dtColumns = [
                    self.DTColumnBuilder.newColumn("userName").renderWith(this.customHtml),
                    self.DTColumnBuilder.newColumn("emailAddress").renderWith(this.customHtml),
                    self.DTColumnBuilder.newColumn('isActive').renderWith(this.customHtml).withClass("dt-body-center"),
                    self.DTColumnBuilder.newColumn('_Actions_').renderWith(this.customHtml).notSortable().withClass("nna-t-nosortable dt-body-center")
                ];
            };
            CustomersController.prototype.customHtml = function (data, type, fullObject, meta) {
                var newHtml, notAvailableButton = '<button class="nna-t-nosortable" i18n="_NotAvailable_"></button>', actionNames = new Array('Edit notary', 'Unlink notary', 'Place an Order', 'Not Available'), editMarkups = new Array({
                    value: "on",
                    text: "".concat('<a ui-sref="app.notary({id:vmu.models[', meta["row"], '].personGuid})">', (fullObject.firstName ? fullObject.firstName + " " : " ") || "", (fullObject.middleName ? fullObject.middleName + " " : " "), (fullObject.lastName ? fullObject.lastName + " " : " "), ' </a>')
                }, {
                    value: "off",
                    text: "".concat('<a class="link-disabled" title="' + actionNames[3] + '" disabled>', (fullObject.firstName ? fullObject.firstName + " " : " ") || "", (fullObject.middleName ? fullObject.middleName + " " : " "), (fullObject.lastName ? fullObject.lastName + " " : " "), '</a>')
                }, {
                    value: "on",
                    text: "".concat('<i class="edit-Product cursor-pointer" title="' + actionNames[0] + '" ui-sref="app.notary({id:vmu.models[', meta["row"], '].personGuid})"></i>')
                }, {
                    value: "off",
                    text: "".concat('<i class="edit-Product disabled" title="' + actionNames[3] + '"disabled"></i>')
                });
                switch (meta["col"]) {
                    case 0:
                        newHtml = "".concat((fullObject.personGuid) ? editMarkups[0].text : editMarkups[1].text);
                        break;
                    case 1:
                        newHtml = fullObject.emailAddress || notAvailableButton;
                        break;
                    case 2:
                        newHtml = "";
                        break;
                    case 3:
                        newHtml = "".concat((fullObject.personGuid) ? editMarkups[2].text : editMarkups[3].text);
                        break;
                }
                return newHtml;
            };
            CustomersController.prototype.onError = function (reason) {
                this.serviceFacade.notification.failed(reason);
            };
            CustomersController.prototype.remove = function (user) {
                var content = {
                    name: user.firstName + ' ' + user.lastName
                };
                var callback = function (result) {
                    var removeNotaryResource = null;
                };
            };
            CustomersController.$inject = [
                "$state", "serviceFacade", "utilService", "localize", "DTOptionsBuilder", "DTColumnBuilder", "$compile", "$scope", "$rootScope"
            ];
            return CustomersController;
        }());
        customer.CustomersController = CustomersController;
        angular.module(customer.moduleName).controller("customersController", CustomersController);
    })(customer = agence.customer || (agence.customer = {}));
})(agence || (agence = {}));
