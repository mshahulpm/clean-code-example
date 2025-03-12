import { ITodo } from "../../../domain/entity/Todo"

export interface ITodoRepository {

    saveTodo(todo: Omit<ITodo, 'todoId'>): Promise<ITodo>
    updateTodo(id: string, userId: string, todo: Partial<Omit<ITodo, 'todoId' | 'userId'>>): Promise<ITodo>
    getAllTodo(userId: string): Promise<ITodo[]>
    getOneTodo(id: string, userId: string): Promise<ITodo | null>
    removeTodo(id: string, userId: string): Promise<ITodo>
    removeAllTodo(userId: string): Promise<void>
}