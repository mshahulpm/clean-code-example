import { TodoUseCase } from "../../application/usecase/todo.usecase";
import { IHttpRequest, IHttpResponse } from "../interface/IHttpAdapter";

export class TodoController {
    constructor(private readonly todoUseCase: TodoUseCase) { }

    async getAllTodos(req: IHttpRequest, res: IHttpResponse) {
        const todos = await this.todoUseCase.getAllTodo('user_id');
        return res.status(200).json(todos);
    }

    async getTodoById(req: IHttpRequest, res: IHttpResponse) {
        const todo = await this.todoUseCase.getTodoDetails(req.params?.todoId!, 'user_id');
        return res.status(200).json(todo);
    }

    async createTodo(req: IHttpRequest, res: IHttpResponse) {
        const newTodo = await this.todoUseCase.createTodo(req.body);
        return res.status(201).json(newTodo);
    }

    async updateTodo(req: IHttpRequest, res: IHttpResponse) {
        const updatedTodo = await this.todoUseCase.updateTodo(req.params?.todoId!, 'user_id', req.body);
        return res.status(200).json(updatedTodo);
    }

    async deleteTodo(req: IHttpRequest, res: IHttpResponse) {
        await this.todoUseCase.deleteTodo(req.params?.todoId!, 'user_id');
        return res.status(204).json({ message: 'todo deleted' });
    }
}
