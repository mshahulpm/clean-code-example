import { TodoUseCase } from "../../application/usecase/todo.usecase";
import { IHttpRequest, IHttpResponse } from "../interface/IHttpAdapter";

export class TodoController {
    constructor(private readonly todoUseCase: TodoUseCase) { }

    async getAllTodos(req: IHttpRequest, res: IHttpResponse) {
        try {
            const todos = await this.todoUseCase.getAllTodo('user_id');
            return res.status(200).json(todos);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    async getTodoById(req: IHttpRequest, res: IHttpResponse) {
        try {
            const todo = await this.todoUseCase.getTodoDetails(req.params?.todoId!, 'user_id');
            return res.status(200).json(todo);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    async createTodo(req: IHttpRequest, res: IHttpResponse) {
        try {
            const newTodo = await this.todoUseCase.createTodo(req.body);
            return res.status(201).json(newTodo);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    async updateTodo(req: IHttpRequest, res: IHttpResponse) {
        try {
            const updatedTodo = await this.todoUseCase.updateTodo(req.params?.todoId!, 'user_id', req.body);
            return res.status(200).json(updatedTodo);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    async deleteTodo(req: IHttpRequest, res: IHttpResponse) {
        try {
            await this.todoUseCase.deleteTodo(req.params?.todoId!, 'user_id');
            return res.status(204).json({ message: 'todo deleted' });
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}
