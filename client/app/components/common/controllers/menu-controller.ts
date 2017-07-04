namespace agence.common.controllers {

    import services = agence.common.services;
    let $self: MenuController;

    export class Tab {
        constructor(
            public name: string,
            public url: string,
            public i18n: string,
            public status ? : string) {}
    }

    export class TopMenu extends Tab {
        public css: string;
    }

    export class MenuController extends BaseController {
        // logical variables
        cartItemsCount: number;
        appRoute: string = "app".concat(".");
        userIsNotary: boolean = false;
        stateBusy: boolean;
        leaveStateAlert: string;

        // business data
        tabs: Array < Tab > ;
        topItems: Array < TopMenu > ;
        current: Tab;
        composeTabs: Array < string > = new Array("app.performance");
        staticViews: Array < string > = new Array();

        static $inject = [
            "$rootScope"
            , "$scope"
            , "$state"
            , "serviceFacade"
            , "utilService"
            , "lifeCycle"
            , "localize"
            , "branding"
        ];

        constructor(
            private $rootScope: angular.IRootScopeService
            , private $scope: ng.IScope
            , private $state: angular.ui.IStateService
            , private serviceFacade: services.IServiceFacade
            , private ngUtil: services.IUtilService
            , private lifeCycle: constants.ILifeCycle
            , private localize: factories.ILocalize
            , private branding: values.IBrandingValue
        ) {
            super(serviceFacade);
            $self = this;
            this.init();
            this.initSettings();
        }

        public static getTabs(): Array < Tab > {
            let _tabs: Array < Tab > , _isTab: boolean;
            let _filterTabs = (): void => {
                _tabs = _tabs.filter((tabValue: Tab, tabIdx: number, tabArray: Array < Tab > ) => {
                    _isTab = false;
                    return _isTab;
                });
            }
            return _tabs;
        }

        init(): void {
            $self = this;
            this.$rootScope.$on('$stateChangeSuccess', (event: ng.IAngularEvent, args: any) => {
                if (this.staticViews.lastIndexOf(args.name) === -1) {
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                }
                if (!$self.ngUtil.isUndefinedOrNull(this.current) && this.current.name !== this.$state.current.name) {
                    this.initContext();
                }
            });
        }

        initSettings(): void {
            $self = this;
            $self.branding.logoId = constants.LifeCycleConstant.lifeCycleApp.DEFAULT_HEADER_LOGO_ID;
        }

        initContext(): void {
            $self = this;

            // initialize main menu
            this.tabs = MenuController.getTabs();
            if (!$self.ngUtil.isUndefinedOrNull($self.$state.current) && !$self.ngUtil.isUndefinedOrNull(this.tabs)) {
                $self.current = this.tabs.filter((value: Tab, index: number, array: Array < Tab > ) => {
                    return (value.url === $self.$state.current.name) 
                    || (this.tabs[2] != null && value.name === this.tabs[2].name && ($self.$state.current.name.indexOf($self.composeTabs[0]) != -1)) 
                    || ($self.$state.current.name.indexOf($self.composeTabs[0]) != -1 
                    && (this.tabs[1] != null && value.url === this.tabs[1].url));
                })[0];
            }
            if ($self.ngUtil.isUndefinedOrNull($self.current)) {
                $self.current = (!$self.ngUtil.isUndefinedOrNull(this.tabs) ? this.tabs[0] : null);
            }
        }
    }
}