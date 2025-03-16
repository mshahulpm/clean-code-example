import { UserUseCase } from "../../application/usecase/user.usecase";
import { MemoryUserRepository } from "../../infra/db/memory/memory.user.rep";
import { IHttpRequest, IHttpResponse } from "../interface/IHttpAdapter";

export class UserController {
    constructor(private readonly userUseCase: UserUseCase) { }

    async getAllUsers(req: IHttpRequest, res: IHttpResponse) {
        const users = await this.userUseCase.getAllUsers();
        return res.status(200).json(users);
    }

    async getUserById(req: IHttpRequest, res: IHttpResponse) {
        const user = await this.userUseCase.getOneUser(req.params?.userId!);
        return res.status(200).json(user);
    }

    async createUser(req: IHttpRequest, res: IHttpResponse) {
        const newUser = await this.userUseCase.createUser(req.body);
        return res.status(201).json(newUser);
    }

    async updateUserPersonal(req: IHttpRequest, res: IHttpResponse) {
        const updatedUser = await this.userUseCase.updateUserPersonal(req.params?.userId!, req.body.name);
        return res.status(200).json(updatedUser);
    }

    async updateUserEmail(req: IHttpRequest, res: IHttpResponse) {
        const updatedUser = await this.userUseCase.updateUserPersonal(req.params?.userId!, req.body.email);
        return res.status(200).json(updatedUser);
    }

    async updateUserPassword(req: IHttpRequest, res: IHttpResponse) {
        const updatedUser = await this.userUseCase.updateUserPersonal(req.params?.userId!, req.body.email);
        return res.status(200).json(updatedUser);
    }

    async deleteUser(req: IHttpRequest, res: IHttpResponse) {
        await this.userUseCase.deleteUser(req.params?.userId!);
        return res.status(204).json({ message: 'user deleted' })
    }

    check() {
        console.log(typeof this);
    }
}


const uc = new UserController(new UserUseCase(new MemoryUserRepository()))
uc.check()