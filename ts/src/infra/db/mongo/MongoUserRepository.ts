import { MongoClient, Db, Collection } from "mongodb";
import { IUserRepository } from "../../../application/interface/repository/IUserRepository";
import { IUser } from "../../../domain/entity/User";

export class MongoUserRepository implements IUserRepository {
    private db: Db;
    private collection: Collection<IUser>;

    constructor(mongoClient: MongoClient, dbName: string) {
        this.db = mongoClient.db(dbName);
        this.collection = this.db.collection<IUser>("users");
    }

    async createUser(user: Omit<IUser, "user_id">): Promise<Omit<IUser, "password">> {
        const existingUser = await this.collection.findOne({ email: user.email });
        if (existingUser) throw new Error("Email must be unique");

        const newUser: IUser = {
            ...user,
            user_id: new Date().getTime().toString(), // Generate unique ID
        };
        await this.collection.insertOne(newUser);
        const { password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }

    async updateUserName(user_id: string, name: string): Promise<Omit<IUser, "password">> {
        const updatedUser = await this.collection.findOneAndUpdate(
            { user_id },
            { $set: { name } },
            { returnDocument: "after" }
        );
        if (!updatedUser) throw new Error("User not found");

        const { password, ...userWithoutPassword } = updatedUser;
        return userWithoutPassword;
    }

    async updateUserPassword(user_id: string, password: string): Promise<IUser> {
        const result = await this.collection.findOneAndUpdate({ user_id }, { $set: { password } });
        if (!result) throw new Error("User not found");
        return {
            ...result,
            // @ts-ignore
            password: undefined
        }
    }

    async updateUserEmail(user_id: string, email: string): Promise<Omit<IUser, "password">> {
        const updatedUser = await this.collection.findOneAndUpdate(
            { user_id },
            { $set: { email } },
            { returnDocument: "after" }
        );
        if (!updatedUser) throw new Error("User not found");

        const { password, ...userWithoutPassword } = updatedUser;
        return userWithoutPassword;
    }

    async getOneUser(userId: string): Promise<Omit<IUser, "password"> | null> {
        const user = await this.collection.findOne({ user_id: userId });
        if (!user) return null;

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async getAllUser(): Promise<Omit<IUser, "password">[]> {
        const users = await this.collection.find().toArray();
        return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
    }

    async removeUser(userId: string): Promise<Omit<IUser, "password">> {
        const deletedUser = await this.collection.findOneAndDelete({ user_id: userId });
        if (!deletedUser) throw new Error("User not found");

        const { password, ...userWithoutPassword } = deletedUser;
        return userWithoutPassword;
    }
}
