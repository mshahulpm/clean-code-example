import { TodoUseCase } from "../../application/usecase/todo.usecase";
import { IHttpAdapter } from "../interface/IHttpAdapter";
import { IRoute } from "../interface/IRoute";


export class TodoRoutes implements IRoute {
    constructor(private todoUseCase: TodoUseCase) { }

    registerRoutes(httpServer: IHttpAdapter): void {
        httpServer.get("/todos/:userId", async (req, res) => {
            const todos = await this.todoUseCase.listAllTodo(req.params.id);
            res.json(todos);
        });

        httpServer.post("/todos", async (req, res) => {
            const todo = await this.todoUseCase.createTodo(req.body);
            res.json(todo);
        });

        // httpServer.delete("/todos/:id", async (req, res) => {
        //     const result = await this.todoUseCase.deleteTodo(req.params.id);
        //     res.json(result);
        // });
    }
}
