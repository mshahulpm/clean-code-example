import { TodoController } from "../controllers/todo.controller";
import { UserController } from "../controllers/user.controller";
import { IHttpAdapter } from "../interface/IHttpAdapter";
import { TodoRoutes } from "./todo.routes";
import { UserRoutes } from "./user.routes";

export function registerRoutes(
    httpServer: IHttpAdapter,
    userController: UserController,
    todoController: TodoController
): void {
    new UserRoutes(userController).registerRoutes(httpServer);
    new TodoRoutes(todoController).registerRoutes(httpServer);
}
