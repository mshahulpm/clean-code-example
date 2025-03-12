export interface IHttpAdapter {
    listen(port: number): void;
    get(path: string, handler: (req: any, res: any) => void): void;
    post(path: string, handler: (req: any, res: any) => void): void;
    put(path: string, handler: (req: any, res: any) => void): void;
    delete(path: string, handler: (req: any, res: any) => void): void;
}
