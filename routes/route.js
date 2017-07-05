"use strict";
exports.__esModule = true;
var RenderType;
(function (RenderType) {
    RenderType[RenderType["data"] = 0] = "data";
    RenderType[RenderType["file"] = 1] = "file";
})(RenderType = exports.RenderType || (exports.RenderType = {}));
/**
 * Constructor
 *
 * @class BaseRoute
 */
var BaseRoute = (function () {
    /**
     * Constructor
     *
     * @class BaseRoute
     * @constructor
     */
    function BaseRoute() {
    }
    /**
     * Render a page.
     *
     * @class BaseRoute
     * @method render
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param view {String} The type to response.
     * @param options {Object} Additional options to append to the view's local scope.
     * @return void
     */
    BaseRoute.prototype.render = function (req, res, type, options) {
        // add constants
        res.locals.BASE_URL = "/";
        // send data
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
