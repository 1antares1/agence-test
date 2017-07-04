import {
    NextFunction,
    Request,
    Response
} from "express";

export enum RenderType {
    data,
    file
}
/**
 * Constructor
 *
 * @class BaseRoute
 */
export class BaseRoute {
    /**
     * Constructor
     *
     * @class BaseRoute
     * @constructor
     */
    constructor() {}

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
    public render(req: Request, res: Response, type: RenderType, options? : Object | string) {
        // add constants
        res.locals.BASE_URL = "/";

        // send data
        switch (type) {
            case RenderType.data: res.send(options);
                break;

            case RenderType.file: res.sendFile(options.toString());
                break;
        }
    }
}