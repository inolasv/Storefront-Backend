import express, { NextFunction, Request, Response } from 'express';
import { Order, OrderStore } from '../models/orders';
import jwt from 'jsonwebtoken';

const store = new OrderStore();

const orderRoutes = (app: express.Application) => {
    app.get('/orders', authenticateToken, currentOrder);
    app.get('/orders/:id', authenticateToken, show);
    app.post('/orders', authenticateToken, create);
}

const currentOrder = async (_req: Request, res: Response) => {
    const user_id = Number(_req.query.user_id);

    try {
        const result = await store.currentOrder(user_id);
        res.json(result);
    } catch(err) {
        res.status(400);
        res.json(err);
    }
}

const index = async (_req: Request, res: Response) => {
    try {
        const orders = await store.index();
        res.json(orders);
    } catch(err) {
        res.status(400);
        res.json(err);
    }
    
}

const show = async (_req: Request, res: Response) => {
    const id = Number(_req.params.id);

    try {
        const order = await store.show(id);
        res.json(order);
    } catch(err) {
        res.status(400);
        res.json(err);
    }
  
}

const create = async(_req: Request, res: Response) => {
    const order: Order = {
        user_id: _req.body.user_id,
        status: _req.body.status
    }

    try {
        const newOrder = await store.create(order.user_id, order.status);
        res.json(newOrder);
    } catch(err) {
        res.status(400);
        res.json(err);
    }
}


const authenticateToken = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = _req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1]
        jwt.verify(token as string, process.env.TOKEN_SECRET as string);

        next();
    } catch(err) {
        res.status(401);
        res.json(`Invalid Token ${err}`)
    }
}
export default orderRoutes;

