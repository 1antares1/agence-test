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
var index_1 = require("./index");
var consultant_collections_1 = require("../schemes/consultant-collections");
var ConsultantRoute = (function (_super) {
    __extends(ConsultantRoute, _super);
    function ConsultantRoute(_app, _router) {
        var _this = _super.call(this) || this;
        _this.app = _app;
        _this.router = _router;
        _this.init();
        return _this;
    }
    ConsultantRoute.prototype.init = function () {
        this.router.get("/api/consultants/:id", function (req, res, next) {
            if (consultant_collections_1.ConsultantCollections) {
                new consultant_collections_1.ConsultantCollections().getConsultants(function (result) {
                    if (result)
                        res.send(result);
                    else
                        res.status(404).send({ "error": "A problem has occurred with the consultants.", "stack": result.message || result });
                }, req.params.id);
            }
        });
        this.app.use(this.router);
        this.router.post("/api/consultants/report", function (req, res, next) {
            if (consultant_collections_1.ConsultantCollections) {
                if (req.params && typeof req.body === "object") {
                    new consultant_collections_1.ConsultantCollections().getConsultantsReport(req.body, function (result) {
                        if (result && typeof result !== "string") {
                            res.send(result);
                        }
                        else
                            res.status(404).send({ "error": "A problem has occurred with the consultants report.", "stack": result.message || result });
                    });
                }
                else {
                    res.status(500).send("The supplied parameters aren't correct.");
                }
            }
        });
        this.app.use(this.router);
    };
    return ConsultantRoute;
}(index_1.IndexRoute));
exports.ConsultantRoute = ConsultantRoute;
//# sourceMappingURL=consultants.js.map