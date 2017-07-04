namespace agence.bootstrapper {
    "use strict";

    let main = angular.module(appName);

    export class Route {
        constructor(
            public name: string,
            public URL: string,
            public templateUrl: string,
            public controller: string,
            public controllerAs: string) {}
    }

    export class RouteOptions {
        constructor(
            public route: Route,
            public areUnnamedViews: boolean,
            public nestedViews: Array < Route >
        ) {}
    }

    export class RoutesConfig {
        public routes: Array < RouteOptions > ;
        public templateBaseUrl: string;
        constructor(private $stateProvider: angular.ui.IStateProvider,
            private $urlRouterProvider: angular.ui.IUrlRouterProvider) {
            this.routes = new Array < RouteOptions > ();
            this.templateBaseUrl = "app/components/"
        }

        public setup(): void {
            this.setupRoutes();
            this.setupState();
            this.init();
        }

        public add(name: string, url: string, templateUrl: string, controller: string, controllerAs: string = "vm", areUnnamedViews: boolean = true, nestedViews ? : Array < Route > ): void {
            this.routes.push(new RouteOptions(
                new Route(name, url, this.templateBaseUrl + templateUrl, controller, controllerAs), areUnnamedViews, nestedViews));
        }

        public setupRoutes(): void {
            this.add("app", "/app", "common/views/abstract.html", "");

            // dashboard Routes
            this.add("app.dashboard", "^/dashboard", "dashboard/views/dashboard.html", "dashboardController");

            // performance routes
            this.add("app.performance", "^/performance", "performance/views/performance.html", "performanceController");

            // consultant routes
            this.add("app.consultants", "^/consultants", "consultant/views/consultants.html", "consultantsController");
            this.add("app.consultant", "^/consultant/:id", "consultant/views/consultant-details.html", "consultantDetailsController");

            // customer routes

            /*
            // Instruction Sheet Routes
            this.add("app.instructionSheet", "^/instructionSheet", "instructionSheet/views/instruction-sheets.html", "instructionSheetController", "vmn");

            // Account Routes
            this.add("app.login", "^/login/:sessionId", "account/views/login.html", "loginController", "vm", false, [
               new Route("app.login.dedicatedServices", "/login/sales/dedicatedServices", "sales/views/dedicated-services.html", "dedicatedServicesController", "vmn"),
               new Route("app.login.trainingServices", "/login/sales/trainingServices", "sales/views/training-services.html", "trainingServicesController", "vmn"),
               new Route("app.login.hotlineServices", "/login/sales/hotlineServices", "sales/views/hotline-services.html", "hotlineServicesController", "vmn"),
               new Route("app.login.groupsOmissionsServices", "/login/sales/groupsomissionsServices", "sales/views/groups-omissions-services.html", "groupsOmissionsServicesController", "vmn"),
               new Route("app.login.complianceServices", "/login/sales/complianceServices", "sales/views/compliance-services.html", "complianceServicesController", "vmn"),
               new Route("app.login.connectWithServices", "/login/sales/connectWithServices", "sales/views/connect-with-services.html", "connectWithServicesController", "vmn")
            ]);
            this.add("app.reference", "^/reference", "account/views/login.html", "loginController");
            this.add("impersonate", "^/impersonate/:userName/:password", "impersonate/views/impersonate.html", "impersonateController");
            this.add("app.profile", "^/profile", "account/views/profile.html", "profileController");
            this.add("forgotPassword", "^/forgotPassword", "account/views/forgot-password.html", "forgotPasswordController");
            this.add("resetPassword", "^/resetPassword", "account/views/reset-password.html", "resetPasswordController");

            // Landing routes
            this.add("app.punchout", "^/register/punchout/", "notary/views/notary-details.html", "notaryDetailsController", "vm", false, [
               new Route("app.punchout.general", "^/register/punchout/general", "notary/views/notary-general.html", "notaryGeneralController", "vmn")
            ]);
            // Organization Routes
            this.add("app.organization", "^/organization", "organization/views/organization-profile.html", "organizationProfileController");

            // Members Routes
            this.add("app.members", "^/members", "member/views/members.html", "membersController");

            // Notary Routes
            this.add("app.notaries", "^/notaries", "notary/views/notaries.html", "notariesController");
            this.add("app.notaryInvite", "^/notary-invite/:id", "notary/views/notary-invitation.html", "notaryInvitationController");
            this.add("app.notary", "^/notary/:id", "notary/views/notary-details.html", "notaryDetailsController");

            // Notary details - routes
            this.add("app.notary.general", "^/notary/:id/general", "notary/views/notary-general.html", "notaryGeneralController", "vmn");
            this.add("app.notary.address", "^/notary/:id/address", "notary/views/notary-address.html", "notaryAddressController", "vmn");
            this.add("app.notary.phone", "^/notary/:id/phone", "notary/views/notary-phone.html", "notaryPhoneController", "vmn");
            this.add("app.notary.examessential", "^/notary/:id/examessential", "notary/views/notary-exam-essential.html", "notaryExamEssentialController", "vmn");
            this.add("app.notary.subscription", "^/notary/:id/subscription", "notary/views/notary-subscription.html", "notarySubscriptionController", "vmn");
            this.add("app.notary.membership", "^/notary/:id/membership", "notary/views/notary-membership.html", "notaryMembershipController", "vmn");
            this.add("app.notary.hotlinemembership", "^/notary/:id/hotlinemembership", "notary/views/notary-hotline-membership.html", "notaryHotlineMembershipController", "vmn");
            this.add("app.notary.eoinsurance", "^/notary/:id/eoinsurance", "notary/views/notary-eoinsurance.html", "notaryEOInsuranceController", "vmn");

            // User Routes
            this.add("userRegistration", "^/userRegistration", "user/views/user-details.html", "userDetailsController");

            // Orders Routes
            this.add("app.orders", "^/orders", "order/views/orders.html", "ordersController");

            // Products Routes
            this.add("app.products", "^/products/:id", "product/views/products.html", "productsController");

            // Cart Routes
            this.add("app.cart", "^/cart", "cart/views/cart.html", "cartController");
            this.add("app.checkout", "^/cart/checkout", "checkout/views/checkout.html", "checkoutController", "vm", true, [
               new Route("app.checkout.billing", "/cart/checkout/billing", "checkout/views/billing.html", "billingController", "vmn"),
               new Route("app.checkout.payment", "/cart/checkout/payment", "payment/views/payment.html", "paymentController", "vmn"),
               new Route("app.checkout.seminar", "/cart/checkout/seminar", "seminar/views/seminar.html", "seminarController", "vmn"),
               new Route("app.checkout.checkoutSummary", "/cart/checkout/checkoutSummary", "checkout/views/checkout-summary.html", "checkoutSummaryController", "vmn"),
               new Route("app.checkout.seminarConfirmation", "/cart/checkout/seminarConfirmation", "seminar/views/seminar-confirmation.html", "seminarConfirmationController", "vmn"),
               new Route("app.checkout.orderConfirmation", "/cart/checkout/orderConfirmation", "order/views/order-confirmation.html", "orderConfirmationController", "vmn")
            ]);
            this.add("app.wallet", "^/wallet", "payment/views/payment.html", "paymentController", "vmn");

            // Footer Routes
            this.add("app.refundPolicy", "^/refund-policy", "common/views/refund-policy.html", null);
            this.add("app.privacyPolicy", "^/privacy-policy", "common/views/privacy-policy.html", null);
            this.add("app.copyright", "^/copyright", "common/views/copyright.html", null);
            this.add("app.contact", "^/contact", "common/views/contact.html", null);
            */
        }

        private setupState(): void {
            this.routes.forEach((routeOption: RouteOptions, index: number, array: Array < RouteOptions > ) => {
                this.$stateProvider.state(routeOption.route.name, {
                    url: routeOption.route.URL,
                    templateUrl: routeOption.route.templateUrl,
                    controller: routeOption.route.controller,
                    controllerAs: routeOption.route.controllerAs,
                    params: {
                        obj: null
                    }
                });

                if (angular.isDefined(routeOption.nestedViews) && routeOption.nestedViews.length) {
                    routeOption.nestedViews.forEach((nestedView: Route, nestedIndex: number, nestedArray: Array < Route > ) => {
                        let _nestedViewName: string = (routeOption.areUnnamedViews) ? "@".concat(routeOption.route.name) : nestedView.name.concat("@", routeOption.route.name);

                        this.$stateProvider.state(nestedView.name, {
                            views: {
                                [_nestedViewName]: {
                                    templateUrl: this.templateBaseUrl + nestedView.templateUrl,
                                    controller: nestedView.controller,
                                    controllerAs: nestedView.controllerAs
                                }
                            }
                        });
                    });
                }
            });
        }

        private init(): void {
            this.$urlRouterProvider.otherwise("/dashboard");
        }
    }

    setup.$inject = ["$stateProvider", "$urlRouterProvider", "$httpProvider", "$provide"];

    function setup($stateProvider: angular.ui.IStateProvider,
        $urlRouterProvider: angular.ui.IUrlRouterProvider,
        $httpProvider: ng.IHttpProvider,
        $provider: ng.auto.IProvideService): void {

        const routeConfig = new RoutesConfig($stateProvider, $urlRouterProvider);
        routeConfig.setup();
        $httpProvider.interceptors.push("interceptorService");
    }

    class Init {
        constructor() {}
        getAppSettings(): ng.IPromise < any > {
            let initInjector = angular.injector(["ng"]);
            let $http = initInjector.get("$http") as any;

            return $http.get("/api/settings").then((response: any) => {
                main.constant("appSettings", response.data);
            }, (errorResponse: any) => {
                // Handle error case
            });
        }
    }

    new Init().getAppSettings().then(() => {
        angular.element(document).ready(() => {
            main.config(setup).run(() => {});
            angular.bootstrap(document, [appName]);
        });
    });
}