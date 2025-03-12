export type IUser = {
    user_id: string
    name: string
    email: string,
    password: string,
    created_at: Date,
    updated_at: Date
}

export class User {

    constructor(
        private user_id: string,
        private name: string,
        private email: string,
        private password: string,
        private created_at: Date,
        private updated_at: Date
    ) { }

    toObject(): IUser {
        return {
            user_id: this.user_id,
            name: this.name,
            email: this.email,
            password: this.password,
            created_at: this.created_at,
            updated_at: this.updated_at
        }
    }

    changePassword(newPassword: string): void {
        this.password = newPassword
    }

    changeEmail(newEmail: string): void {
        this.email = newEmail
    }

    changeName(newName: string): void {
        this.name = newName
    }

}