import { MongoClient, Db, Collection } from "mongodb";
import { ITodoRepository } from "../../../application/interface/repository/ITodoRepository";
import { ITodo } from "../../../domain/entity/Todo";

export class MongoTodoRepository implements ITodoRepository {
    private db: Db;
    private collection: Collection<ITodo>;

    constructor(mongoClient: MongoClient, dbName: string) {
        this.db = mongoClient.db(dbName);
        this.collection = this.db.collection<ITodo>("todos");
    }

    async getAllTodo(userId: string): Promise<ITodo[]> {
        return await this.collection.find({ user_id: userId }).toArray();
    }

    async getOneTodo(id: string, userId: string): Promise<ITodo | null> {
        return await this.collection.findOne({ todo_id: id, user_id: userId });
    }

    async saveTodo(todo: Omit<ITodo, "todo_id">): Promise<ITodo> {
        const newTodo: ITodo = {
            ...todo,
            todo_id: new Date().getTime().toString(), // Generate a unique ID
        };
        await this.collection.insertOne(newTodo);
        return newTodo;
    }

    async updateTodo(id: string, userId: string, todo: Partial<Omit<ITodo, "todo_id" | "user_id">>): Promise<ITodo> {
        const updatedTodo = await this.collection.findOneAndUpdate(
            { todo_id: id, user_id: userId },
            { $set: todo },
            { returnDocument: "after" }
        );

        if (!updatedTodo) throw new Error("Todo not found");
        return updatedTodo;
    }

    async removeTodo(id: string, userId: string): Promise<ITodo> {
        const deletedTodo = await this.collection.findOneAndDelete({ todo_id: id, user_id: userId });

        if (!deletedTodo) throw new Error("Todo not found");
        return deletedTodo;
    }

    async removeAllTodo(userId: string): Promise<void> {
        await this.collection.deleteMany({ user_id: userId });
    }
}
