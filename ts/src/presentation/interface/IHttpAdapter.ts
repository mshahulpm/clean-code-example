export interface IHttpRequest {
    body?: any;
    params?: Record<string, string>;
    query?: Record<string, string>;
    headers?: Record<string, string>;
    user?: any; // For authentication support
}

export interface IHttpResponse {
    status: (code: number) => IHttpResponse;
    json: (data: any) => IHttpResponse;
    send: (data?: any) => void;
    sendFile: (filePath: string) => void;
}

export type RouteHandler = (req: IHttpRequest, res: IHttpResponse) => any | Promise<any>;
export interface IHttpAdapter {
    listen(port: number, message?: string): any;
    get(path: string, handler: RouteHandler): any;
    post(path: string, handler: RouteHandler): any;
    put(path: string, handler: RouteHandler): any;
    patch(path: string, handler: RouteHandler): any;
    delete(path: string, handler: RouteHandler): any;
}
