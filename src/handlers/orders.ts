import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/orders';

const store = new OrderStore();
