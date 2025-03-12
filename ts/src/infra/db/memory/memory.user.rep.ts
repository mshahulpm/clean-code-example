import { IUserRepository } from "../../../application/interface/repository/IUserRepository";
import { IUser } from "../../../domain/entity/User";


export class MemoryUserRepository implements IUserRepository {
    private USER_STORAGE: { [key: string]: IUser } = {}

    async createUser(user: Omit<IUser, "user_idd">): Promise<Omit<IUser, "password">> {

        const does_user_exist = Object.values(this.USER_STORAGE).find(u => u.email === user.email)
        if (does_user_exist) throw new Error('email unique failed')

        const user_id = Date.now().toString()
        this.USER_STORAGE[user_id] = { ...user, user_id }
        return this.USER_STORAGE[user_id]
    }

    async updateUserName(user_id: string, name: string): Promise<Omit<IUser, "password">> {
        const old_user = this.USER_STORAGE[user_id]
        if (!old_user) throw new Error('item does not exit')

        this.USER_STORAGE[user_id] = { ...old_user, name }
        return this.USER_STORAGE[user_id]
    }

    async updateUserPassword(user_id: string, password: string): Promise<Omit<IUser, "password">> {
        const old_user = this.USER_STORAGE[user_id]
        if (!old_user) throw new Error('item does not exit')

        this.USER_STORAGE[user_id] = { ...old_user, password }
        return this.USER_STORAGE[user_id]
    }

    async updateUserEmail(user_id: string, email: string): Promise<Omit<IUser, "password">> {
        const old_user = this.USER_STORAGE[user_id]
        if (!old_user) throw new Error('item does not exit')

        this.USER_STORAGE[user_id] = { ...old_user, email }
        return this.USER_STORAGE[user_id]
    }

    async getOneUser(userId: string): Promise<Omit<IUser, "password"> | null> {
        return this.USER_STORAGE[userId] || null
    }

    async getAllUser(): Promise<Omit<IUser, "password">[]> {
        return Object.values(this.USER_STORAGE)
    }

    async removeUser(userId: string): Promise<Omit<IUser, "password">> {
        const user = this.USER_STORAGE[userId]
        if (!user) throw new Error('item does not exit')
        delete this.USER_STORAGE[userId]
        return { ...user, }
    }
}