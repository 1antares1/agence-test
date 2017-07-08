"use strict";

// module dependencies
import * as debug from "debug";
import * as express from "express";
import * as request from "request";
import * as path from "path";
import * as favicon from "serve-favicon";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");

import { RenderType } from "./routes/route";
import { IndexRoute } from "./routes/index";
import { ConsultantRoute } from "./routes/consultants";

const { URL } = require("url");

/**
 * The server.
 *
 * @class Server
 */
export class Server {
    public express: express.Express;
    public app: express.Application;
    public router: express.Router;

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        // create expressjs application
        this.express = express();
        this.app = this.express;
        this.router = express.Router();

        // configure application
        this.config();
    }

    public api(app: express.Express, router: express.Router) {
        new ConsultantRoute(app, router);
    }

    public config() {
        let app = this.app;

        app.use(express.static(path.join(__dirname, "/client")));
        app.use(favicon(__dirname + "/client/favicon.ico"));

        // config middleware
        this.middleware();
        
        // catch 404 and forward to error handler
        app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            let err = new Error(`Not found: /${req.method.toString()} ${req.url}.`);
            res.status(404);
            res.send(err.message);
        });

        // error handling
        app.use(errorHandler());
    }

    public middleware() {
        let app = this.app;
        app.use(logger("dev"));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: false
        }));

        // use override middlware
        app.use(cookieParser());
        app.use(methodOverride());

        // config headers
        app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header('Access-Control-Allow-Credentials', "true");
            next();
        });

        // add routes
        this.routes();

        // configure api
        this.api(this.express, this.router);
    }

    public routes() {
        let app = this.app;
        let router = this.router;

        IndexRoute.create("/", router, RenderType.file, path.join(__dirname, "/client/index.html"));
        app.use(router);

        IndexRoute.create("/api", router, RenderType.data);
        app.use(router);

        IndexRoute.create("/api/settings", router, RenderType.data, {});
        app.use(router);
    }
}

let normalizePort = (val: any): any => {
    let port: number = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

let onListening = (): void => {
    let addr = server.address();
    let bind = (typeof addr === "string" ? "pipe " + addr : "port " + addr.port);
    debug("Listening on " + bind);
}

let onError = (error: any): void => {
    if (error.syscall !== "listen") {
        throw error;
    }

    let bind = (typeof httpPort === "string" ? "Pipe " + httpPort : "Port " + httpPort);

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
}

let httpPort = normalizePort(process.env.PORT || 3000);
let app = Server.bootstrap().app;
app.set("port", httpPort);

let server = app.listen(app.get("port"), () => {
    debug("Express server listening on port ".concat(" ", server.address().port.toString()));
});
console.log(" NodeJS server started on port ".concat(app.get("port")));

server.on("error", onError);
server.on("listening", onListening);