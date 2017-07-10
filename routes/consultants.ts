import {
    NextFunction,
    Request,
    Response,
    Router,
    Express
} from "express";
import { RenderType} from "./route";
import { IndexRoute } from "./index";
import { ConsultantCollections, IConsultantParams } from "../schemes/consultant-collections";
import * as _ from "lodash";

/**
 * / route
 *
 * @class User
 */
export class ConsultantRoute extends IndexRoute {
    app: Express;
    router: Router;
    constructor(_app: Express, _router: Router) {
        super();
        this.app = _app;
        this.router = _router;
        this.init();
    }

    init(): void {
        this.router.get("/api/consultants/:id", (req: Request, res: Response, next: NextFunction) => {
            if(ConsultantCollections) {
                new ConsultantCollections().getConsultants((success: boolean, result: any[]) => {
                    if(success && result) res.send(result);
                    else res.status(404).send({ "error": "A problem has occurred with the consultants.", "stack": (result as any).message || result});
                }, (req.params.id.toString() === "1" ? true : false));
            }
        });
        this.app.use(this.router);

        this.router.post("/api/consultants/report", (req: Request, res: Response, next: NextFunction) => {
            if(ConsultantCollections) {
                if(req.params && typeof req.body === "object") {
                    new ConsultantCollections().getConsultantsReport(req.body as IConsultantParams, (success: boolean, result: any[]) => {
                        if(success && result && typeof result !== "string") {
                            res.send(result)
                        }
                        else res.status(404).send({ "error": "A problem has occurred with the consultants report.", "stack": (result as any).message || (result as any).code || result});
                    });
                }
                else {
                    res.status(500).send("The supplied parameters aren't correct.");
                }
            }
        });
        this.app.use(this.router);
    }
}