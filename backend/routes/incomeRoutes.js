import { Router } from "express";
import { createIncome } from "../controllers/Income.js";
import { IsUser } from "../middleware/verifyToken.js";
const IncomeRoutes = Router();


IncomeRoutes.post('/createIncome/:id', IsUser, createIncome);

export default IncomeRoutes
