import { UserController } from "../controllers/user.controller";
import { IHttpAdapter } from "../interface/IHttpAdapter";
import { IRoute } from "../interface/IRoute";

export class UserRoutes implements IRoute {
    constructor(private userController: UserController) { }

    registerRoutes(httpServer: IHttpAdapter): void {
        httpServer.get("/users", this.userController.getAllUsers.bind(this.userController));
        httpServer.get("/users/:id", this.userController.getUserById.bind(this.userController));
        httpServer.post("/users", this.userController.createUser.bind(this.userController));
        httpServer.delete("/users/:id", this.userController.deleteUser.bind(this.userController));
    }
}
