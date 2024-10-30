// AdminRoutes.js

import express from 'express';
import { Getuser, deletUser, updateUser } from '../controllers/Admin.js';
import { isAdmin } from '../middleware/verifyToken.js';

const AdminRoutes = express.Router();

AdminRoutes.get('/getuser', isAdmin, Getuser);
AdminRoutes.delete('/delete/:id', isAdmin, deletUser);
AdminRoutes.put('/updateUser/:id', isAdmin, updateUser); // Change from 'post' to 'put'

export default AdminRoutes;
