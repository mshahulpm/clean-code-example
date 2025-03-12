import { ITodoRepository } from "../../../application/interface/repository/ITodoRepository";
import { ITodo } from "../../../domain/entity/Todo";


export class MemoryTodoRepository implements ITodoRepository {
    private TODO_STORAGE: { [key: string]: ITodo } = {}

    async getAllTodo(userId: string): Promise<ITodo[]> {
        return (Object.values(this.TODO_STORAGE)).filter(t => t.user_id === userId)
    }

    async getOneTodo(id: string, userId: string): Promise<ITodo | null> {
        const todo = this.TODO_STORAGE[id]
        if (!todo || todo.user_id !== userId) return null
        return todo
    }

    async removeTodo(id: string, userId: string): Promise<ITodo> {
        const todo = this.TODO_STORAGE[id]
        if (!todo || todo.user_id !== userId) throw new Error('item does not exit')

        delete this.TODO_STORAGE[id]
        return todo
    }

    async saveTodo(todo: Omit<ITodo, "todo_id">): Promise<ITodo> {
        const todo_id = Date.now().toString()
        this.TODO_STORAGE[todo_id] = { ...todo, todo_id }
        return this.TODO_STORAGE[todo_id]
    }

    async updateTodo(id: string, userId: string, todo: Partial<Omit<ITodo, "todo_id" | "user_id">>): Promise<ITodo> {
        let old_todo = this.TODO_STORAGE[id]
        if (!old_todo || old_todo.user_id !== userId) throw new Error('item does not exit')

        this.TODO_STORAGE[id] = { ...old_todo, ...todo }
        return this.TODO_STORAGE[id]
    }

    async removeAllTodo(userId: string): Promise<void> {
        const todo_ids = Object.values(this.TODO_STORAGE).filter(t => t.user_id === userId).map(t => t.todo_id)
        for (const id of todo_ids) {
            delete this.TODO_STORAGE[id]
        }
    }
}
