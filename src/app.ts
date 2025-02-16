import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { CarRoutes } from './app/modules/car/car.route';
import { CarOrderRoutes } from './app/modules/carOrder/carOrder.route';
import { AppError } from './app/shared/appError';
import { UserRoutes } from './app/modules/user/user.route';
import { AuthRoutes } from './app/modules/Auth/auth.routes';
const app: Application = express();

// parser
app.use(express.json());

app.use(cors({origin: 'https://carnest-ashy.vercel.app'}));

//routes related to auths
app.use('/api/v1', UserRoutes)
app.use('/api/v1', AuthRoutes)

// routes related to car 
app.use('/api/v1', CarRoutes);
app.use('/api/v1', CarOrderRoutes);


// root routes for for Car store app api
app.get('/', (req: Request, res: Response) => {
  res.send(
    {
      status: true,
      message: "Welcome to car store app. API V.0.1 🔥",
    }
  );
});

// Global error handler
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
      success: false,
      message,
      error: {
          statusCode,
      },
  });

  next();
});

// 404 handler for undefined routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
      success: false,
      message: "Route not found",
  });
});

export default app;
