import { Router } from "express";
import { createIncome  , deleteIncome} from "../controllers/Income.js";
import { IsUser } from "../middleware/verifyToken.js";
const IncomeRoutes = Router();


IncomeRoutes.post('/createIncome', IsUser, createIncome);
IncomeRoutes.delete('/deleteIncome/:id', IsUser, deleteIncome);

export default IncomeRoutes
