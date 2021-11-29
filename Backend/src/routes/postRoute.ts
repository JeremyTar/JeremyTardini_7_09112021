// importation des packages et model

import { NextFunction, Request, Response, Router } from 'express';
import { getConnection } from 'typeorm';
import { Post } from "../entity/Post";
import { getAllPosts, getOnePost, sendPost, savePost, deletePost } from "../controllers/postController"

//mise en place de la route Post

export const PostRouter: Router = Router();


PostRouter.get('/posts', getAllPosts);
PostRouter.get('/posts/:id', getOnePost);
PostRouter.post('/posts', sendPost)
PostRouter.put('/posts/:id', savePost);
PostRouter.delete('/posts/:id', deletePost);