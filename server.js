"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// module dependencies
var debug = require("debug");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var errorHandler = require("errorhandler");
var methodOverride = require("method-override");
// import * as routes from "./routes/index";
// import * as users from "./users/index";
/**
 * The server.
 *
 * @class Server
 */
var Server = (function () {
    function Server() {
        // create expressjs application
        this.app = express();
        // configure application
        this.config();
        // add routes
        this.routes();
        // add api
        this.api();
    }
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    Server.bootstrap = function () {
        return new Server();
    };
    Server.prototype.api = function () {
        // empty for now
    };
    Server.prototype.config = function () {
        var app = this.app;
        // view engine setup
        app.engine("html", function () { });
        app.use(express.static(path.join(__dirname, "/client")));
        app.set("view engine", "html");
        // uncomment after placing your favicon in /public
        //app.use(favicon(__dirname + "/client/favicon.ico"));
        app.use(logger("dev"));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: false
        }));
        // use override middlware
        app.use(cookieParser());
        this.app.use(methodOverride());
        // app.use("/", routes);
        // app.use("/users", users);
        // catch 404 and forward to error handler
        app.use(function (req, res, next) {
            var err = new Error("Not Found");
            err.status = 404;
            next(err);
        });
        // error handlers
        // development error handler
        // will print stacktrace
        if (app.get("env") === "development") {
            app.use(function (err, req, res, next) {
                res.status(err.status || 500);
                res.render("error", {
                    message: err.message,
                    error: err
                });
            });
        }
        // production error handler
        // no stacktraces leaked to user
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render("error", {
                message: err.message,
                error: {}
            });
        });
        // error handling
        this.app.use(errorHandler());
    };
    Server.prototype.routes = function () {
        // empty for now
    };
    return Server;
}());
exports.Server = Server;
var normalizePort = function (val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
};
/**
 * Event listener for HTTP server "listening" event.
 */
var onListening = function () {
    var addr = server.address();
    var bind = (typeof addr === "string" ? "pipe " + addr : "port " + addr.port);
    debug("Listening on " + bind);
};
/**
 * Event listener for HTTP server "error" event.
 */
var onError = function (error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    var bind = (typeof httpPort === "string" ? "Pipe " + httpPort : "Port " + httpPort);
    // handle specific listen errors with friendly messages
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
var httpPort = normalizePort(process.env.port || 3000);
var app = Server.bootstrap().app;
app.set("port", httpPort);
var server = app.listen(app.get("port"), function () {
    debug("Express server listening on port".concat(" ", server.address().port.toString()));
});
server.on("error", onError);
server.on("listening", onListening);
//# sourceMappingURL=server.js.map