import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

// retrieving environment variables
const  {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV
} = process.env;

// this is where we are connecting to the database, calling it client
// environment vars referenced to connect

let Client

if (ENV == 'test') {
    Client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });    
}

if (ENV == 'dev') {
    Client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    }); 
}

export default Client as Pool;
