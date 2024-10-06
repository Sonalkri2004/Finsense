import express from 'express'
import { Getuser, deletUser,updateUser } from '../controllers/Admin.js'
import { isAdmin } from '../middleware/verifyToken.js'



const AdminRoutes=express.Router()
 AdminRoutes.get('/getuser',isAdmin,Getuser)
 AdminRoutes.delete('/delet/:id',isAdmin,deletUser)
 AdminRoutes.post('/updateUser/:id',isAdmin,updateUser)


export default AdminRoutes