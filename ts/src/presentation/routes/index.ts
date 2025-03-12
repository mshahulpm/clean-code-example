import { TodoUseCase } from "../../application/usecase/todo.usecase";
import { UserUseCase } from "../../application/usecase/user.usecase";
import { IHttpAdapter } from "../interface/IHttpAdapter";
import { TodoRoutes } from "./todo.routes";
import { UserRoutes } from "./user.routes";


export function registerRoutes(httpServer: IHttpAdapter, userUseCase: UserUseCase, todoUseCase: TodoUseCase): void {
    new UserRoutes(userUseCase).registerRoutes(httpServer);
    new TodoRoutes(todoUseCase).registerRoutes(httpServer);
}
