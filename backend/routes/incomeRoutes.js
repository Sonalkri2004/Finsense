import { Router } from "express";
import { createIncome  , deleteIncome , getAllIncome , getAllBill} from "../controllers/Income.js";
import { IsUser } from "../middleware/verifyToken.js";
const IncomeRoutes = Router();


IncomeRoutes.post('/createIncome', IsUser, createIncome);
IncomeRoutes.post('/getAllBill', IsUser,getAllBill);
IncomeRoutes.delete('/deleteIncome/:id', IsUser, deleteIncome);
// IncomeRoutes.get('/getIncome', IsUser, getAllIncome);


export default IncomeRoutes
