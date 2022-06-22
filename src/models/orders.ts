import Client from "../database";

export type Order = {
    id?: number,
    user_id: number,
    status: string,
}

export class OrderStore {

    async currentOrder(user_id: number): Promise<Order> {
        // auth. token required!!
        try {
            const conn = await Client.connect();

            const sql = 'SELECT * FROM products WHERE user_id=($1)';

            const result = await conn.query(sql, [user_id]);

            conn.release();

            return result.rows[0];
        
        } catch(err) {
            throw new Error(`Could not get order with user_id ${user_id}: ${err}`)
        }
    } 

}