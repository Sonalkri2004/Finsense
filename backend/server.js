import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import DbCon from './utlis/db.js'; // Corrected typo 'utlis' to 'utils'
import AuthRoutes from './routes/Auth.js';
import AdminRoutes from './routes/AdminRoutes.js';
import ExpenseRoutes from './routes/ExpenseRoutes.js';
import IncomeRoutes from './routes/IncomeRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN; // Used for development & production

const app = express();

// MongoDB connection
DbCon();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: CLIENT_ORIGIN || 'http://localhost:5173', // Fallback to localhost for development
}));

// Route setup
app.use('/api/auth', AuthRoutes);
app.use('/api/admin', AdminRoutes);
app.use('/api/expense', ExpenseRoutes);
app.use('/api/income', IncomeRoutes);

app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start the server with basic error handling
app.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting server:', err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
