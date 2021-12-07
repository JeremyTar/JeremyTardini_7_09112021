import { Router } from 'express';
import { checkJwt } from '../middleware/auth';
import { getCommentsOfPost, addCommentToPost, updateComment, deleteComment, getAllCommentsByUser } from '../controllers/commentController';


export const CommentRouter: Router = Router();

CommentRouter.get('/posts/:id/comments',checkJwt, getCommentsOfPost)
CommentRouter.get('/users/:id/comments', checkJwt, getAllCommentsByUser)
CommentRouter.post('/posts/:id', checkJwt, addCommentToPost)
CommentRouter.put('/comments/:id', checkJwt, updateComment)
CommentRouter.delete('/comments/:id', checkJwt, deleteComment)