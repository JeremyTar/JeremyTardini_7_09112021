// importation des packages et model
import { Router } from 'express';
import { getAllPosts, getOnePost, sendPost, savePost, deletePost } from "../controllers/postController"
import { checkJwt } from '../middleware/auth';
import { postMulter } from '../middleware/multer';


//mise en place de la route Post

export const PostRouter: Router = Router();


PostRouter.get('/posts', getAllPosts);
PostRouter.get('/posts/:id', checkJwt, getOnePost);
PostRouter.post('/posts', postMulter, checkJwt, sendPost)
PostRouter.put('/posts/:id', postMulter, checkJwt, savePost);
PostRouter.delete('/posts/:id', postMulter, checkJwt, deletePost);