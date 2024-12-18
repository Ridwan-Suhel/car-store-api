import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { CarRoutes } from './app/modules/car/car.route';
import { CarOrderRoutes } from './app/modules/carOrder/carOrder.route';
const app: Application = express();

// parser
app.use(express.json());

app.use(cors());

// routes related to car 
app.use('/api', CarRoutes);
app.use('/api', CarOrderRoutes);

// root routes for for Car store app api
app.get('/', (req: Request, res: Response) => {
  res.send(
    {
      status: true,
      message: "Welcome to car store app. API V.0.1 🔥",
    }
  );
});

export default app;
