"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var route_1 = require("./route");
var url = require("url");
var IndexRoute = (function (_super) {
    __extends(IndexRoute, _super);
    function IndexRoute() {
        return _super.call(this) || this;
    }
    IndexRoute.appSettings = function (req, res) {
        var _fullUrl = function (hostname) {
            var _protocol = (req.headers["x-forwarded-proto"]) ? "https:" : req.protocol;
            _protocol = _protocol.split(/\s*,\s*/)[0];
            return url.format({
                protocol: _protocol,
                host: hostname
            });
        };
        var obj = {
            appConfig: {},
            urls: {
                consultant: process.env.consultant_Url ? process.env.consultant_Url : _fullUrl(req.get("host"))
            }
        };
        return obj;
    };
    IndexRoute.create = function (path, router, type, options) {
        var _target = (path === "/") ? " index " : " ";
        console.log("[IndexRoute::create] Creating" + _target + "route: '" + path + "')");
        router.get(path, function (req, res, next) {
            switch (path) {
                case "/api/settings":
                    options = IndexRoute.appSettings(req, res);
                    break;
            }
            new IndexRoute().index(req, res, type, options);
        });
    };
    IndexRoute.prototype.index = function (req, res, type, options) {
        this.render(req, res, type, options);
    };
    return IndexRoute;
}(route_1.BaseRoute));
exports.IndexRoute = IndexRoute;
//# sourceMappingURL=index.js.map