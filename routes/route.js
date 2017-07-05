"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RenderType;
(function (RenderType) {
    RenderType[RenderType["data"] = 0] = "data";
    RenderType[RenderType["file"] = 1] = "file";
})(RenderType = exports.RenderType || (exports.RenderType = {}));
var BaseRoute = (function () {
    function BaseRoute() {
    }
    BaseRoute.prototype.render = function (req, res, type, options) {
        res.locals.BASE_URL = "/";
        switch (type) {
            case RenderType.data:
                res.send(options);
                break;
            case RenderType.file:
                res.sendFile(options.toString());
                break;
        }
    };
    return BaseRoute;
}());
exports.BaseRoute = BaseRoute;
//# sourceMappingURL=route.js.map