import { CreateUserDto } from "../interface/dto/user/create";
import { IUserRepository } from "../interface/repository/IUserRepository";

export class UserUseCase {

    constructor(private readonly userRepository: IUserRepository) { }

    async getAllUsers() {
        return this.userRepository.getAllUser()
    }

    async getOneUser(userId: string) {
        return this.userRepository.getOneUser(userId)
    }

    async createUser(user: CreateUserDto) {
        return this.userRepository.createUser(user)
    }

    async updateUserPersonal(userId: string, name: string) {
        return this.userRepository.updateUserName(userId, name)
    }

    async updateUserPassword(userId: string, password: string) {
        return this.userRepository.updateUserName(userId, password)
    }

    async updateUserEmail(userId: string, email: string) {
        return this.userRepository.updateUserName(userId, email)
    }

    async deleteUser(userId: string) {
        return this.userRepository.removeUser(userId)
    }

}