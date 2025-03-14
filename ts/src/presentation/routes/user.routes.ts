import { UserController } from "../controllers/user.controller";
import { IHttpAdapter } from "../interface/IHttpAdapter";
import { IRoute } from "../interface/IRoute";

export class UserRoutes implements IRoute {
    constructor(private userController: UserController) { }

    registerRoutes(httpServer: IHttpAdapter): void {
        httpServer.get("/users", this.userController.getAllUsers);
        httpServer.get("/users/:id", this.userController.getUserById);
        httpServer.post("/users", this.userController.createUser);
        httpServer.delete("/users/:id", this.userController.deleteUser);
    }
}
