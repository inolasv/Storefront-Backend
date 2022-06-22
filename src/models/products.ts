import Client from "../database";

export type Product = {
    id?: number,
    name: string,
    price: number,
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

    async show(id: number): Promise<Product> {
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

    async create(name: string, price: number): Promise<Product> {
        try {
            const conn = await Client.connect();

            const sql = 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *'

            const result = await conn.query(sql, [name, price]);

            conn.release();

            return result.rows[0];
        
        } catch(err) {
            throw new Error(`Could not create product with name ${name}: ${err}`)
        }
    } 

}