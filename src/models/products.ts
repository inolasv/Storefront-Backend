import Client from "../database";

export type Product = {
    id: number,
    name: string,
    price: string,
}

export class ProductStore {

    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect();

            const sql = 'SELECT * FROM products';

            const result = await conn.query(sql);

            conn.release();

            return result.rows;
        
        } catch(err) {
            throw new Error(`Could not get products: ${err}`)
        }
    } 

    async show(id: string): Promise<Product> {
        try {
            const conn = await Client.connect();

            const sql = 'SELECT * FROM products WHERE id=($1)';

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        
        } catch(err) {
            throw new Error(`Could not get product with id ${id}: ${err}`)
        }
    } 

}