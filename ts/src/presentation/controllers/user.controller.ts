import { UserUseCase } from "../../application/usecase/user.usecase";
import { IHttpRequest, IHttpResponse } from "../interface/IHttpAdapter";

export class UserController {
    constructor(private readonly userUseCase: UserUseCase) { }

    async getAllUsers(req: IHttpRequest, res: IHttpResponse) {
        try {
            const users = await this.userUseCase.getAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    async getUserById(req: IHttpRequest, res: IHttpResponse) {
        try {
            const user = await this.userUseCase.getOneUser(req.params?.userId!);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    async createUser(req: IHttpRequest, res: IHttpResponse) {
        try {
            const newUser = await this.userUseCase.createUser(req.body);
            return res.status(201).json(newUser);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    async updateUserPersonal(req: IHttpRequest, res: IHttpResponse) {
        try {
            const updatedUser = await this.userUseCase.updateUserPersonal(req.params?.userId!, req.body.name);
            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    async updateUserEmail(req: IHttpRequest, res: IHttpResponse) {
        try {
            const updatedUser = await this.userUseCase.updateUserPersonal(req.params?.userId!, req.body.email);
            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    async updateUserPassword(req: IHttpRequest, res: IHttpResponse) {
        try {
            const updatedUser = await this.userUseCase.updateUserPersonal(req.params?.userId!, req.body.email);
            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    async deleteUser(req: IHttpRequest, res: IHttpResponse) {
        try {
            await this.userUseCase.deleteUser(req.params?.userId!);
            return res.status(204).json({ message: 'user deleted' })
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}
