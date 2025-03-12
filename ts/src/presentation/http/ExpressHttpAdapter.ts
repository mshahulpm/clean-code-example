import express from "express";
import { IHttpAdapter } from "../interface/IHttpAdapter";
import { Request, Response } from 'express'

export class ExpressHttpAdapter implements IHttpAdapter {
    private app = express();

    constructor() {
        this.app.use(express.json()); // Middleware to parse JSON
    }

    listen(port: number): void {
        this.app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
    }

    get(path: string, handler: (req: Request, res: Response) => void): void {
        this.app.get(path, handler);
    }

    post(path: string, handler: (req: Request, res: Response) => void): void {
        this.app.post(path, handler);
    }

    put(path: string, handler: (req: Request, res: Response) => void): void {
        this.app.put(path, handler);
    }

    delete(path: string, handler: (req: Request, res: Response) => void): void {
        this.app.delete(path, handler);
    }
}
