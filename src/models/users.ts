import Client from "../database";

export type User = {
    id: number,
    first_name: string,
    last_name: string,
    password_digest: string
}

export class UserStore {

    async index(): Promise<User[]> {
        // authenticated token required
        try {
            const conn = await Client.connect();

            const sql = 'SELECT * FROM users';

            const result = await conn.query(sql);

            conn.release();

            return result.rows;
        
        } catch(err) {
            throw new Error(`Could not get users: ${err}`)
        }
    } 

    async show(id: string): Promise<User> {
        // authenticated token required
        try {
            const conn = await Client.connect();

            const sql = 'SELECT * FROM users WHERE id=($1)';

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        
        } catch(err) {
            throw new Error(`Could not get user with id ${id}: ${err}`)
        }
    }

}