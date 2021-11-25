import { Router } from 'express';
import { getAllusers, userLogin, getOneUser, createUser, updateUser, deleteUser } from "../controllers/userController"

export const UserRouter: Router = Router();

// liste des routes users

UserRouter.post('/users/login', userLogin );
UserRouter.get('/users', getAllusers);
UserRouter.get('/users/:id', getOneUser);
UserRouter.post('/users', createUser);
UserRouter.put('/users/:id', updateUser);
UserRouter.delete('/users/:id', deleteUser );