"use strict";

// module dependencies
import * as debug from "debug";
import * as express from "express";
import * as path from "path";
import * as favicon from "serve-favicon";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");

// import * as routes from "./routes/index";
// import * as users from "./users/index";

/**
 * The server.
 *
 * @class Server
 */
export class Server {
  public app: express.Application;

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
    this.app = express();

    // configure application
    this.config();

    // add routes
    this.routes();

    // add api
    this.api();
  }

  public api() {
    // empty for now
  }

  public config() {
    let app = this.app;
    // view engine setup
    app.engine("html", (): void => {});
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
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      let err = new Error("Not Found");
      (err as any).status = 404;
      next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get("env") === "development") {
      app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.status(err.status || 500);
        res.render("error", {
          message: err.message,
          error: err
        });
      });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.status(err.status || 500);
      res.render("error", {
        message: err.message,
        error: {}
      });
    });
    
    // error handling
    this.app.use(errorHandler());
  }

  public routes() {
    // empty for now
  }
}

let normalizePort = (val: any): any => {
  let port = parseInt(val, 10);

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

/**
 * Event listener for HTTP server "listening" event.
 */
let onListening = (): void => {
  let addr = server.address();
  let bind = (typeof addr === "string" ? "pipe " + addr : "port " + addr.port);
  debug("Listening on " + bind);
}

/**
 * Event listener for HTTP server "error" event.
 */
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

let httpPort = normalizePort(process.env.port || 3000);
let app = Server.bootstrap().app;
app.set("port", httpPort);

let server = app.listen(app.get("port"), () => {
    debug("Express server listening on port".concat(" ", server.address().port.toString()));
});
server.on("error", onError);
server.on("listening", onListening);