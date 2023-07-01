import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db';
import products from './data/products.js';

const port = process.env.PORT ?? 5000;

connectDB();

const app: Express = express();

app.get('/', (_req: Request, res: Response) => {
  res.send('API is running...');
});

app.get('/api/products/', (_req: Request, res: Response) => {
  res.json(products);
});

app.get('/api/products/:id', (_req: Request, res: Response) => {
  const product = products.find((p) => p._id === _req.params.id);

  res.json(product);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running on port ${port}`);
});
