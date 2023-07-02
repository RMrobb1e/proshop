import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db';
import productRoutes from './routes/productRoutes';
import { errorHandler, notFound } from './middleware/errorMiddleware';

const port = process.env.PORT ?? 5000;

connectDB();

const app: Express = express();

app.get('/', (_req: Request, res: Response) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running on port ${port}`);
});
