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
    sendFile: (filePath: string) => void;
}


export interface IHttpAdapter {
    listen(port: number): void;
    get(path: string, handler: (req: IHttpRequest, res: IHttpResponse) => void): void;
    post(path: string, handler: (req: IHttpRequest, res: IHttpResponse) => void): void;
    put(path: string, handler: (req: IHttpRequest, res: IHttpResponse) => void): void;
    delete(path: string, handler: (req: IHttpRequest, res: IHttpResponse) => void): void;
}
