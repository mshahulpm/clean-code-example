import express, { Request, Response, Application, NextFunction } from "express";
import { IHttpAdapter, IHttpRequest, IHttpResponse } from "../interface/IHttpAdapter";
import * as path from 'path'
import { HttpException, InternalServerException } from "../../domain/exception/HttpException";

export class ExpressHttpAdapter implements IHttpAdapter {
    private app: Application;

    constructor() {
        this.app = express();
        this.app.use(express.json());
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
            send: (data?: any) => {
                res.send(data)
            },
            sendFile: (filePath: string) => {
                res.sendFile(path.resolve(filePath));
            },
        };
    }

    listen(port: number, message?: string): void {
        this.app.listen(port, () => console.log(message));
    }

    get(path: string, handler: (req: IHttpRequest, res: IHttpResponse) => Promise<any> | any): any {
        this.app.get(path, async (req, res, next) => {
            try {
                await handler(this.adaptRequest(req), this.adaptResponse(res))
            } catch (error) {
                next(error)
            }
        });
    }

    post(path: string, handler: (req: IHttpRequest, res: IHttpResponse) => Promise<any> | any): any {
        this.app.post(path, async (req, res, next) => {
            try {
                await handler(this.adaptRequest(req), this.adaptResponse(res))
            } catch (error) {
                next(error)
            }
        });
    }

    patch(path: string, handler: (req: IHttpRequest, res: IHttpResponse) => Promise<any> | any): any {
        this.app.patch(path, async (req, res, next) => {
            try {
                await handler(this.adaptRequest(req), this.adaptResponse(res))
            } catch (error) {
                next(error)
            }
        });
    }

    put(path: string, handler: (req: IHttpRequest, res: IHttpResponse) => Promise<any> | any): any {
        this.app.put(path, async (req, res, next) => {
            try {
                await handler(this.adaptRequest(req), this.adaptResponse(res))
            } catch (error) {
                next(error)
            }
        });
    }

    delete(path: string, handler: (req: IHttpRequest, res: IHttpResponse) => Promise<any> | any): any {
        this.app.delete(path, async (req, res, next) => {
            try {
                await handler(this.adaptRequest(req), this.adaptResponse(res))
            } catch (error) {
                next(error)
            }
        });
    }

    registerErrorHandle() {
        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

            if (err instanceof HttpException) {
                res.status(err.statusCode).json({
                    message: err.message,
                    errorCode: err.errorCode,
                    statusCode: err.statusCode
                })
                return
            }

            // unhandled error
            console.log(err.message);
            res.json(new InternalServerException(err.message))

        })
    }

}
