namespace agence.customer {

    import services = agence.common.services;
    import models = agence.common.models;
    import common = agence.common;

    interface IUsers {
        DTOptionsBuilder: any;
        DTColumnBuilder: any;
    }

    export interface CustomersControllerScope extends agence.performance.PerformanceControllerScope {
        customers: CustomersController;
    }

    export class CustomersController {
        models: Array < models.ICustomer > ;
        originalModels: Array < models.ICustomer > ;
        dtOptions: any;
        dtColumns: any;
        dtInstance: any = {}

        static $inject = [
            "$state", "serviceFacade", "utilService", "localize", "DTOptionsBuilder", "DTColumnBuilder", "$compile", "$scope", "$rootScope"
        ]

        constructor(
            protected $state: angular.ui.IStateService, protected serviceFacade: services.IServiceFacade, protected utilService: services.IUtilService, protected localize: any, private DTOptionsBuilder: any, private DTColumnBuilder: any, private $compile: ng.ICompileService, public $scope: CustomersControllerScope, public $rootScope: ng.IRootScopeService
        ) {
            this.init();
        }

        init(): void {
            let self = this;
            self.refresh();
            this.$scope.customers = self;
            let scopeMember = this.$scope.members.loading = true;
        }

        refresh(): void {
            let self = this;
            let notariesOptions: any = null; //self.serviceFacade.profile.getUsersOrganizationOptions(sessionIdentity.organizationGuid);
            // rendering angular-datatable
            self.dtOptions = self.DTOptionsBuilder.newOptions()
                .withOption("ajax", {
                    url: notariesOptions.url,
                    type: "GET",
                    beforeSend: (request: any) => {
                        request.setRequestHeader("Authorization", notariesOptions.headers);
                    },
                    data: (data: any, settings: any) => {
                        this.$scope.members.datatableInputSearchToggle(this.dtInstance.id, true);

                        let _orderByColumn: string = data.columns[data.order[0].column].data;
                        let _descending: boolean = (data.order[0].dir.indexOf("desc") > -1);
                        if (_orderByColumn === "isActive") _descending = !_descending;
                        let _fullName: Array < string > = (data.search.value as string).split(" ");
                        return data = {
                            draw: data.draw,
                            firstName: _fullName[0] || _fullName,
                            middleName: _fullName[1] || _fullName,
                            lastName: _fullName[2] || _fullName,
                            rol: "Administrator",
                            page: (data.start / data.length) + 1,
                            count: data.length,
                            orderBy: (): number => {
                                let _orderByKey: number = 0;
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
                        }
                    },
                    dataSrc: (result: any) => {
                        this.$scope.members.datatableInputSearchToggle(this.dtInstance.id, false);
                        this.models = result.items;
                        this.originalModels = this.models;

                        // [stats] API
                        result.recordsTotal = result.totalCount;
                        result.recordsFiltered = result.totalCount;
                        if (angular.isDefined(this.models) && this.models.length) {
                            if (!this.models.length) {
                                result.recordsTotal = 0;
                                result.recordsFiltered = 0;
                            }
                        }
                        return this.models;
                    },
                    error: (xhr: any, error: null, thrown: () => void) => {
                        angular.element('.dataTables_processing').hide();
                        this.$scope.members.datatableInputSearchToggle(this.dtInstance.id, false);
                        self.$scope.members.onFailed(xhr);
                        self.onError(this.localize.getLocalizedString("_ContactAdministratorNotifications_"));
                        self.onError(self.utilService.format(self.localize.getLocalizedString("_DataTableConnectionErrorNotifications_"), "User", xhr.statusText, notariesOptions.url));
                    }
                })
                .withOption("searchDelay", 1)
                .withOption("processing", true)
                .withOption("serverSide", true)
                .withLanguage({
                    "sProcessing": ""
                })
                .withOption("createdRow", (row: HTMLTableRowElement, data: models.ICustomer, index: number): void => {
                    this.$compile(angular.element(row).contents())(this.$scope);
                })
                .withOption('initComplete', (settings: any) => {
                    // Input search format
                    let inputSearch: HTMLInputElement, divProcessing: HTMLDivElement;

                    // [input] Search
                    inputSearch = settings.nTableWrapper.querySelector('input[type="search"]');
                    inputSearch.className += "form-control";

                    // [div] Processing
                    divProcessing = settings.nTableWrapper.querySelector('.dataTables_processing');
                    divProcessing.innerHTML = '<div class="spinner-background-2"><label>Processing...</label><br><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';

                    // [Table] Input search delay event
                    jQuery(inputSearch).off('keyup.DT input.DT');

                    let searchDelay: number, search: string, table: HTMLTableElement;

                    jQuery(inputSearch).on("input", ((event: JQueryEventObject) => {
                        search = inputSearch.value;
                        table = settings.nTableWrapper.querySelector('table.table');

                        clearTimeout(searchDelay);
                        if (angular.isDefined(table)) {
                            searchDelay = window.setTimeout(() => {
                                if (angular.isDefined(search) && (search === "" || search.length > 0)) {
                                    ( < models.JQueryDataTable > jQuery(table)).DataTable().data().search(search).draw();
                                }
                            }, 1000);
                        }
                    }));

                    this.$scope.members.loading = false;
                })
                .withPaginationType('full_numbers');

            // in process: Check ways to define the columns [separate]
            self.dtColumns = [
                self.DTColumnBuilder.newColumn("userName").renderWith(this.customHtml), // until orderBy=1 error in server it's fixed
                self.DTColumnBuilder.newColumn("emailAddress").renderWith(this.customHtml),
                self.DTColumnBuilder.newColumn('isActive').renderWith(this.customHtml).withClass("dt-body-center"),
                self.DTColumnBuilder.newColumn('_Actions_').renderWith(this.customHtml).notSortable().withClass("nna-t-nosortable dt-body-center")
            ];
        }

        customHtml(data: any, type: string, fullObject: models.ICustomer, meta: any): string {
            let newHtml: any, notAvailableButton: string = '<button class="nna-t-nosortable" i18n="_NotAvailable_"></button>',
                actionNames: Array < string > = new Array('Edit notary', 'Unlink notary', 'Place an Order', 'Not Available'),
                editMarkups: Array < models.ITuple > = new Array < models.ITuple > ({
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
                    newHtml = ""; //'<i ' + ((fullObject.isActive) ? 'class="fa fa-check base-check"' : '') + 'name="' + fullObject.isActive + '"></i>';
                    break;

                case 3:
                    newHtml = "".concat((fullObject.personGuid) ? editMarkups[2].text : editMarkups[3].text);
                    break;
            }
            return newHtml
        }

        onError(reason: any) {
            this.serviceFacade.notification.failed(reason);
        }

        remove(user: models.ICustomer): void {
            var content = {
                name: user.firstName + ' ' + user.lastName
            };
            var callback = (result: any) => {
                var removeNotaryResource = null; //this.serviceFacade.profile.getUserProfileResource(user.userGuid);
                // removeNotaryResource.delete(() => {
                //     this.refresh();
                //     var text = "The Notary " + user.firstName + ' ' + user.lastName + " has been remove Successfully";
                //     this.serviceFacade.notification.success(text);
                // }, (response) => {
                //     this.$scope.members.onFailed(response);
                // });
            };
            //this.serviceFacade.modal.remove(content).then(callback);
        }
    }
    angular.module(moduleName).controller("customersController", CustomersController);
}