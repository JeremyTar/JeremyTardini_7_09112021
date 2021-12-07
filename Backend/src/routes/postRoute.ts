// importation des packages et model
import { Router } from 'express';
import { getAllPosts, getOnePost, sendPost, savePost, deletePost, likePost, dislikePost, getAllPostsByUser } from "../controllers/postController"
import { checkJwt } from '../middleware/auth';
import { Multer } from '../middleware/multer';


//mise en place de la route Post

export const PostRouter: Router = Router();


PostRouter.get('/posts',checkJwt, getAllPosts);
PostRouter.get('/users/:id/posts', checkJwt, getAllPostsByUser)
PostRouter.get('/posts/:id', checkJwt, getOnePost);

PostRouter.post('/posts', Multer, checkJwt, sendPost)
PostRouter.post('/posts/file', Multer)

PostRouter.put('/posts/:id/like',checkJwt, likePost)
PostRouter.put('/posts/:id/dislike',checkJwt, dislikePost)
PostRouter.put('/posts/:id', Multer, checkJwt, savePost);
PostRouter.delete('/posts/:id', checkJwt, deletePost);