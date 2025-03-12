import { IUser, } from "../../../domain/entity/User"


export interface IUserRepository {

    createUser(user: Omit<IUser, 'user_id' | 'created_at' | 'updated_at'>): Promise<Omit<IUser, 'password'>>
    updateUserName(user_id: string, name: string): Promise<Omit<IUser, 'password'>>
    updateUserEmail(user_id: string, email: string): Promise<Omit<IUser, 'password'>>
    updateUserPassword(user_id: string, password: string): Promise<Omit<IUser, 'password'>>
    getAllUser(): Promise<Omit<IUser, 'password'>[]>
    getOneUser(userId: string): Promise<Omit<IUser, 'password'> | null>
    removeUser(userId: string): Promise<Omit<IUser, 'password'>>

}