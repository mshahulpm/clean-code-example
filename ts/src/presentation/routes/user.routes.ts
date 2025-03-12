import { UserUseCase } from "../../application/usecase/user.usecase";
import { IHttpAdapter } from "../interface/IHttpAdapter";
import { IRoute } from "../interface/IRoute";


export class UserRoutes implements IRoute {
    constructor(private userUseCase: UserUseCase) { }

    registerRoutes(httpServer: IHttpAdapter): void {
        httpServer.get("/users", async (_, res) => {
            const users = await this.userUseCase.getAllUsers();
            res.json(users);
        });

        httpServer.get("/users/:id", async (req, res) => {
            const users = await this.userUseCase.getOneUser(req.params!.id);
            res.json(users);
        });

        httpServer.post("/users", async (req, res) => {
            const user = await this.userUseCase.createUser(req.body);
            res.json(user);
        });

        httpServer.delete("/users/:id", async (req, res) => {
            const result = await this.userUseCase.deleteUser(req.params!.id);
            res.json(result);
        });
    }
}
