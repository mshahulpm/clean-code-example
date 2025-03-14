import { TodoController } from "../controllers/todo.controller";
import { IHttpAdapter } from "../interface/IHttpAdapter";
import { IRoute } from "../interface/IRoute";


export class TodoRoutes implements IRoute {
    constructor(private todoController: TodoController) { }

    registerRoutes(httpServer: IHttpAdapter): void {

        httpServer.post("/todos", this.todoController.createTodo);
        httpServer.get("/todos", this.todoController.getAllTodos);
        httpServer.get("/todos/:id", this.todoController.getTodoById)
        httpServer.delete("/todos/:id", this.todoController.deleteTodo)

    }
}

