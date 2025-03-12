import { IHttpAdapter } from "./IHttpAdapter";

export interface IRoute {
    registerRoutes(httpServer: IHttpAdapter): void;
}
