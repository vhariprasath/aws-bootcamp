import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import userRoutes from './routes/users';
import hotelRoutes from './routes/hotels';
import roomRoutes from './routes/rooms';
import bookingRoutes from './routes/bookings';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.send('Hello from Express');
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Error handler
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  const status = 500;
  res.status(status).json({ error: err.message });
});

