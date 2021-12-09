import { Router } from 'express';
import { getAllusers, userLogin, getOneUser, createUser, updateUser, deleteUser, newPassword, newEmail } from "../controllers/userController"
import { UserMulter } from '../middleware/multer';
import { checkJwt } from '../middleware/auth';
import { User } from '../entity/User';

export const UserRouter: Router = Router();

// liste des routes users

UserRouter.post('/users/login', userLogin);
UserRouter.get('/users', getAllusers);
UserRouter.get('/users/:id', getOneUser);
UserRouter.post('/users', createUser);

UserRouter.put('/users/:id',checkJwt, UserMulter, updateUser);
UserRouter.put('/users/password/:id',checkJwt, newPassword);
UserRouter.put('/users/email/:id',checkJwt, newEmail)

UserRouter.delete('/users/:id',checkJwt, UserMulter, deleteUser);