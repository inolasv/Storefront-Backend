import express, { NextFunction, Request, Response } from 'express';
import { User, UserStore } from '../models/users';
import jwt from 'jsonwebtoken';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
    try {
        const user = await store.index();
        res.json(user);
    } catch(err) {
        res.status(400);
        res.json(err);
    }
}

const show = async (_req: Request, res: Response) => {
    const id = Number(_req.params.id);
    try {
        const user = await store.show(id);
        res.json(user);
    } catch(err) {
        res.status(400);
        res.json(err);
    }
}

const create = async(_req: Request, res: Response) => {
    const user: User = {
        first_name: _req.body.first_name,
        last_name: _req.body.last_name,
        password_digest: _req.body.password
    }

    try {
        const newUser = await store.create(user);
        var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
        res.json(token);
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


const userRoutes = (app: express.Application) => {
    app.get('/users', authenticateToken, index);
    app.get('/users/:id', authenticateToken, show);
    app.post('/users', create);
}

export default userRoutes;