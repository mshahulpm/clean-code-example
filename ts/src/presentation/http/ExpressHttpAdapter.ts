import express, { Request, Response, Application } from "express";
import { IHttpAdapter, IHttpRequest, IHttpResponse } from "../interface/IHttpAdapter";
import * as path from 'path'
export class ExpressHttpAdapter implements IHttpAdapter {
    private app: Application;

    constructor() {
        this.app = express();
        this.app.use(express.json());
    }

    listen(port: number): void {
        this.app.listen(port, () => console.log(`Server running on port ${port}`));
    }

    private adaptRequest(req: Request): IHttpRequest {
        return {
            body: req.body,
            params: req.params,
            query: req.query as Record<string, string>,
            headers: req.headers as Record<string, string>,
            user: (req as any).user, // If using authentication middleware
        };
    }

    private adaptResponse(res: Response): IHttpResponse {
        return {
            status: function (code: number) {
                res.status(code);
                return this;
            },
            json: function (data: any) {
                res.json(data);
                return this;
            },
            sendFile: (filePath: string) => {
                res.sendFile(path.resolve(filePath));
            },
        };
    }

    get(path: string, handler: (req: IHttpRequest, res: IHttpResponse) => void): void {
        this.app.get(path, (req, res) => handler(this.adaptRequest(req), this.adaptResponse(res)));
    }

    post(path: string, handler: (req: IHttpRequest, res: IHttpResponse) => void): void {
        this.app.post(path, (req, res) => handler(this.adaptRequest(req), this.adaptResponse(res)));
    }

    put(path: string, handler: (req: IHttpRequest, res: IHttpResponse) => void): void {
        this.app.put(path, (req, res) => handler(this.adaptRequest(req), this.adaptResponse(res)));
    }

    delete(path: string, handler: (req: IHttpRequest, res: IHttpResponse) => void): void {
        this.app.delete(path, (req, res) => handler(this.adaptRequest(req), this.adaptResponse(res)));
    }
}
