import {
    NextFunction,
    Request,
    Response,
    Router
} from "express";
import {
    BaseRoute,
    RenderType
} from "./route";
const url = require("url");

/**
 * / route
 *
 * @class User
 */

export class IndexRoute extends BaseRoute {
    constructor() {
        super();
    }

    private static appSettings(req: Request, res: Response): Object {
        let _fullUrl = (hostname: string): string => {
            let _protocol = ((req.connection as any).encrypted) ? "https:" : (req.headers["x-forwarded-proto"] as string || req.protocol);
            _protocol = _protocol.split(/\s*,\s*/)[0];

            return url.format({
                protocol: req.protocol,
                host: hostname
            });
        }

        let obj: Object = {
            appConfig: {},
            urls: {
                consultant: process.env.consultant_Url ? process.env.consultant_Url : _fullUrl(req.get("host"))
            }
        };
        return obj;
    }

    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    public static create(path: string, router: Router, type: RenderType, options ? : Object | string) {
        let _target: string = (path === "/") ? " index " : " ";
        console.log(`[IndexRoute::create] Creating${_target}route: '${path}')`);

        router.get(path, (req: Request, res: Response, next: NextFunction) => {
            switch (path) {
                case "/api/settings":
                    options = IndexRoute.appSettings(req, res);
                    break;
            }
            new IndexRoute().index(req, res, type, options);
        });
    }

    /**
     * The home page route.
     *
     * @class IndexRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    public index(req: Request, res: Response, type: RenderType, options: Object | string) {
        this.render(req, res, type, options);
    }
}