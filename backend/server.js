import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import DbCon from './utlis/db.js'; 
import AuthRoutes from './routes/Auth.js';
import AdminRoutes from './routes/AdminRoutes.js';
import ExpenseRoutes from './routes/expenseRoutes.js';
import IncomeRoutes from './routes/incomeRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN; // Used for development & production

const app = express();

// MongoDB connection setup
DbCon();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: CLIENT_ORIGIN,
}));

// Serve static files from the frontend's dist folder
app.use(express.static(path.join(path.resolve(), 'dist')));

// API routes
app.use('/api/auth', AuthRoutes);
app.use('/api/admin', AdminRoutes);
app.use('/api/expense', ExpenseRoutes);
app.use('/api/income', IncomeRoutes);

// Catch-all route to handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting server:', err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
