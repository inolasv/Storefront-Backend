import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/products';
import jwt from 'jsonwebtoken';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
    try {
        const products = await store.index();
        res.json(products);
    } catch(err) {
        res.status(400);
        res.json(err);
    }
    
}

const show = async (_req: Request, res: Response) => {
    const id = Number(_req.params.id);

    try {
        const product = await store.show(id);
        res.json(product);
    } catch(err) {
        res.status(400);
        res.json(err);
    }
  
}

const create = async(_req: Request, res: Response) => {
    const product: Product = {
        name: _req.body.name,
        price: _req.body.price
    }

    try {
        const authorizationHeader = _req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1];
        jwt.verify(token as string, process.env.TOKEN_SECRET as string);
    } catch(err) {
        res.status(401)
        res.json(`Invalid token ${err}`);
    }

    try {
        const newProduct = await store.create(product.name, product.price);
        res.json(newProduct);
    } catch(err) {
        res.status(400);
        res.json(err);
    }
}


const productRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', create);

}

export default productRoutes;