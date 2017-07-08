"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debug = require("debug");
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var errorHandler = require("errorhandler");
var methodOverride = require("method-override");
var APIdatabase = require("./schemes/base");
var route_1 = require("./routes/route");
var index_1 = require("./routes/index");
var consultants_1 = require("./routes/consultants");
var URL = require("url").URL;
var Server = (function () {
    function Server() {
        this.express = express();
        this.app = this.express;
        this.router = express.Router();
        this.config();
    }
    Server.bootstrap = function () {
        return new Server();
    };
    Server.prototype.api = function (app, router) {
        new consultants_1.ConsultantRoute(app, router);
        APIdatabase.handleDatabase(function (err) {
            onError(err);
        });
    };
    Server.prototype.config = function () {
        var app = this.app;
        app.use(express.static(path.join(__dirname, "/client")));
        app.use(favicon(__dirname + "/client/favicon.ico"));
        this.middleware();
        app.use(function (req, res, next) {
            var err = new Error("Not found: /" + req.method.toString() + " " + req.url + ".");
            res.status(404);
            res.send(err.message);
        });
        app.use(errorHandler());
    };
    Server.prototype.middleware = function () {
        var app = this.app;
        app.use(logger("dev"));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: false
        }));
        app.use(cookieParser());
        app.use(methodOverride());
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header('Access-Control-Allow-Credentials', "true");
            next();
        });
        this.routes();
        this.api(this.express, this.router);
    };
    Server.prototype.routes = function () {
        var app = this.app;
        var router = this.router;
        index_1.IndexRoute.create("/", router, route_1.RenderType.file, path.join(__dirname, "/client/index.html"));
        app.use(router);
        index_1.IndexRoute.create("/api", router, route_1.RenderType.data);
        app.use(router);
        index_1.IndexRoute.create("/api/settings", router, route_1.RenderType.data, {});
        app.use(router);
    };
    return Server;
}());
exports.Server = Server;
var normalizePort = function (val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
var onListening = function () {
    var addr = server.address();
    var bind = (typeof addr === "string" ? "pipe " + addr : "port " + addr.port);
    debug("Listening on " + bind);
};
var onError = function (error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    var bind = (typeof httpPort === "string" ? "Pipe " + httpPort : "Port " + httpPort);
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};
var httpPort = normalizePort(process.env.PORT || 3000);
var app = Server.bootstrap().app;
app.set("port", httpPort);
var server = app.listen(app.get("port"), function () {
    debug("Express server listening on port ".concat(" ", server.address().port.toString()));
});
console.log(" NodeJS server started on port ".concat(app.get("port")));
server.on("error", onError);
server.on("listening", onListening);
//# sourceMappingURL=server.js.map