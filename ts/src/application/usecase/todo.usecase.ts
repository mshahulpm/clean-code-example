import { Todo } from "../../domain/entity/Todo";
import { ITodoRepository } from "../interface/repository/ITodoRepository";

export class TodoUseCase {

    constructor(private readonly todoRepository: ITodoRepository) { }

    async listAllTodo(userId: string) {
        return await this.todoRepository.getAllTodo(userId)
    }

    async getTodoDetails(todoId: string, userId: string) {
        return await this.todoRepository.getOneTodo(todoId, userId)
    }

    async createTodo(todo: Todo) {
        // @ts-ignore
        return await this.todoRepository.saveTodo(todo)
    }

    async updataTodo(todoId: string, userId: string, todo: Omit<Partial<Todo>, 'todoId'>) {
        return await this.todoRepository.updateTodo(todoId, userId, todo)
    }

    async deleteTodo(todoId: string, userId: string) {
        return await this.todoRepository.removeTodo(todoId, userId)
    }
}

