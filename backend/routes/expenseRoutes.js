import express from 'express'
import { createExpense, createComment, updateStatus, getExpense,filterExpensesByDateRange ,updateExpense , getTotalExpenseAmount  , deleteExpense , getTotalExpenseStatusCount , getAllRejectedExpenses , getAllBill} from '../controllers/Expense.js'
import { IsUser } from '../middleware/verifyToken.js'
const ExpenseRoutes = express.Router();

ExpenseRoutes.post('/createExpense', IsUser, createExpense);
ExpenseRoutes.post('/createComment', IsUser, createComment);
ExpenseRoutes.patch('/updateStatus/:id', IsUser, updateStatus);
ExpenseRoutes.get('/getExpense', IsUser, getExpense);
ExpenseRoutes.post('/filterDate', IsUser, filterExpensesByDateRange);
ExpenseRoutes.post('/updateExpense/:id', IsUser, updateExpense);
ExpenseRoutes.post('/getAllBill' , IsUser,getAllBill)
ExpenseRoutes.get('/getTotal', IsUser, getTotalExpenseAmount);
ExpenseRoutes.get('/getTotalExpense', IsUser, getTotalExpenseStatusCount);
ExpenseRoutes.get('/getRejected', IsUser, getAllRejectedExpenses);
ExpenseRoutes.delete('/deleteExpense/:id', IsUser, deleteExpense );

export default ExpenseRoutes;