import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

import connectDB from './db/db';
import authRoutes from './routes/auth';
import taskRoutes from './routes/tasks';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: ['https://kanban-dashboard-neon.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());
app.use(morgan('tiny'))

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);

const PORT = process.env.SERVER_PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
