import Client from "../database";

export type Order = {
    id?: number,
    user_id: number,
    status: string,
}

export class OrderStore {

    async currentOrder(user_id: number): Promise<Order> {
        try {
            const conn = await Client.connect();

            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)';

            const result = await conn.query(sql, [user_id, "active"]);

            conn.release();

            return result.rows[0];
        
        } catch(err) {
            throw new Error(`Could not get order with user_id ${user_id}: ${err}`)
        }
    } 

    async index(): Promise<Order[]> {
        try {
            const conn = await Client.connect();

            const sql = 'SELECT * FROM orders';

            const result = await conn.query(sql);

            conn.release();

            return result.rows;
        
        } catch(err) {
            throw new Error(`Could not get orders: ${err}`)
        }
    } 

    async show(id: number): Promise<Order> {
        try {
            const conn = await Client.connect();

            const sql = 'SELECT * FROM orders WHERE id=($1)';

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        
        } catch(err) {
            throw new Error(`Could not get orders with id ${id}: ${err}`)
        }
    } 

    async create(user_id: number, status: string): Promise<Order> {
        try {
            const conn = await Client.connect();

            const sql = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *'

            const result = await conn.query(sql, [user_id, status]);

            conn.release();

            return result.rows[0];
        
        } catch(err) {
            throw new Error(`Could not create order: ${err}`)
        }
    } 

}