import express from 'express'
import { createExpense , createComment , updateStatus , getExpense } from '../controllers/Expense.js'
import {IsUser} from '../middleware/verifyToken.js'
const ExpenseRoutes=express.Router()


ExpenseRoutes.post ('/createExpense/:id' ,IsUser, createExpense );
ExpenseRoutes.post ('/createComment/:id' ,IsUser, createComment );
ExpenseRoutes.patch ('/updateStatus/:id' ,IsUser, updateStatus );
ExpenseRoutes.get ('/getExpense' ,IsUser, getExpense );

export default ExpenseRoutes