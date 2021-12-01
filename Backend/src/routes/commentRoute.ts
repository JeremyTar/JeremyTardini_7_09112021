import { Router } from 'express';
import { checkJwt } from '../middleware/auth';
import { getCommentsOfPost, addCommentToPost, updateComment } from '../controllers/commentController';

export const CommentRouter: Router = Router();

CommentRouter.get('/posts/:id/comments',checkJwt, getCommentsOfPost)
CommentRouter.post('/posts/:id/comment', checkJwt, addCommentToPost)
CommentRouter.put('/comment/:id', checkJwt, updateComment)
CommentRouter.delete('/comment/:id')