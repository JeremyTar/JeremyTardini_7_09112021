import { NextFunction, Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { Comment } from '../entity/Comment';
import { User } from '../entity/User';


export async function getCommentsOfPost(req: Request, res: Response, next: NextFunction) {
    try {
        const repository = getConnection().getRepository(Comment);
        const AllComments = await repository.find({ where: { post: req.params.postId } })
        res.send(AllComments)
    }
    catch (err) {
        return next(err);
    }
}

export async function addCommentToPost(req: Request, res: Response, next: NextFunction) {
    try {
        const Commentrepository = getConnection().getRepository(Comment);
        const Postrepository = getConnection().getRepository(Comment);
        const infoPost = await Postrepository.find({ where: { postId: req.params.id } })
        console.log(infoPost)
        res.send(infoPost)



        const NewComment = new Comment();
        NewComment.content = req.body.content;
        NewComment.user = req.body.user;
        NewComment.post = req.params.id;
        const result = await Commentrepository.save(NewComment);
        res.send(result)
    }
    catch (err) {
        return next(err);
    }
}

export async function updateComment(req: Request, res: Response, next: NextFunction) {
    try {
        const Commentrepository = getConnection().getRepository(Comment)
        const UpdateComment = await Commentrepository.findOne(req.params.id);
        UpdateComment.content = req.body.content;
    }
    catch (err) {
        return next(err)
    }
}

export async function deletePost(req: Request, res: Response, next: NextFunction) {
    try {
        const Commentrepository = getConnection().getRepository(Comment);
        await Commentrepository.delete(req.params.id);
        res.send(`Comment id : ${req.params.id} was delete`);
    }
    catch (err) {
        return next(err);
    }
}