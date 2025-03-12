import { IUserRepository } from "../../../application/interface/repository/IUserRepository";
import { IUser } from "../../../domain/entity/User";
import pg from 'pg'

export class UserRepository implements IUserRepository {

    constructor(private readonly pgClient: pg.Client) { }

    async createUser(user: Omit<IUser, "userId">): Promise<Omit<IUser, "password">> {
        const query = `
           INSERT INTO users (name, email, password, createdAt, updatedAt)
           VALUES ($1, $2, $3, NOW(), NOW())
           RETURNING userid, name, email, createdAt, updatedAt
           `;
        const result = await this.pgClient.query(query, [user.name, user.email, user.password]);
        return result.rows[0] as Omit<IUser, 'password'>
    }

    async getAllUser(): Promise<Omit<IUser, "password">[]> {
        const result = await this.pgClient.query('SELECT userid, name, email, createdAt, updatedAt FROM users');
        return result.rows as Omit<IUser, "password">[];
    }

    async getOneUser(userId: string): Promise<Omit<IUser, "password">> {
        const query = `SELECT userid, name, email, createdAt, updatedAt FROM users WHERE userid = $1`;
        const result = await this.pgClient.query(query, [userId]);

        if (result.rows.length === 0) {
            throw new Error("User not found");
        }

        return result.rows[0] as Omit<IUser, "password">;
    }

    async removeUser(userId: string): Promise<Omit<IUser, "password">> {
        const query = `
            DELETE FROM users
            WHERE userid = $1
            RETURNING userid, name, email, createdAt, updatedAt
        `;
        const result = await this.pgClient.query(query, [userId]);

        if (result.rows.length === 0) {
            throw new Error("User not found or already deleted");
        }

        return result.rows[0] as Omit<IUser, "password">;
    }

    async updateUser(userId: string, user: Partial<Omit<IUser, "userId">>): Promise<Omit<IUser, "password">> {
        const fields = Object.keys(user).map((key, index) => `${key} = $${index + 2}`).join(", ");
        const values = Object.values(user);

        if (fields.length === 0) {
            throw new Error("No fields to update");
        }

        const query = `
            UPDATE users
            SET ${fields}, updatedAt = NOW()
            WHERE userid = $1
            RETURNING userid, name, email, createdAt, updatedAt
        `;

        const result = await this.pgClient.query(query, [userId, ...values]);

        if (result.rows.length === 0) {
            throw new Error("User not found");
        }

        return result.rows[0] as Omit<IUser, "password">;
    }

}