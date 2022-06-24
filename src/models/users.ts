import Client from "../database";
import bycrpt from 'bcrypt';

export type User = {
    id?: number,
    first_name: string,
    last_name: string,
    password_digest: string
}

const pepper = process.env.BYCRPT_PASSWORD as string
const saltRounds  = process.env.SALT_ROUNDS


export class UserStore {

    async index(): Promise<User[]> {
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
    // creates a new user and hashes their password
    async create(u: User): Promise<User> {
        try {
            const conn = await Client.connect();
            
            const sql = 'INSERT INTO users (first_name, last_name, password_digest) VALUES ($1, $2, $3) RETURNING *'
        
            const hash = bycrpt.hashSync(
                u.password_digest + pepper,
                parseInt(saltRounds as string)
            );

            const result = await conn.query(sql, [u.first_name, u.last_name, hash]);

            conn.release();



            return result.rows[0];
        
        } catch(err) {
            throw new Error(`Could not create new user: ${err}`);
        }
    }


    // authenticates a user by checking if they a) exist in the database and b) used the correct password
    async authenticate(first_name: string, last_name: string, password: string): Promise<User | null> {
        try {
            const conn = await Client.connect();
            
            const sql = 'SELECT password_digest FROM users WHERE first_name=$1 AND last_name=$2'
            
            const result = await conn.query(sql, [first_name, last_name]);

            if (result.rows.length) {
                const user = result.rows[0]
                if(bycrpt.compareSync(password+pepper, user.password_digest)) {
                    return user
                }
            }
            return null

        } catch(err) {
            throw new Error(`Could not create new user: ${err}`);
        }
    }

    async show(id: number): Promise<User> {
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