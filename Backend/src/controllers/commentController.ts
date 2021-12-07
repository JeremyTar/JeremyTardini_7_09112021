import { NextFunction, request, Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { Comment } from '../entity/Comment';
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { getUserIdByToken } from '../middleware/auth';
dotenv.config()

export async function getAllCommentsByUser(req: Request, res: Response, next: NextFunction) {
    try {
        const commmentReposiroty = getConnection().getRepository(Comment);
        const Allcomments = await commmentReposiroty.find({ where: { userTag: req.params.id } })
        res.send(Allcomments)
    }
    catch (err) {
        return next(err);
    }
}

export async function getCommentsOfPost(req: Request, res: Response, next: NextFunction) {
    try {
        const repository = getConnection().getRepository(Comment);
        const AllComments = await repository.find({ where: { post: req.params.id } })
        res.send(AllComments)
    }
    catch (err) {
        return next(err);
    }
}

export async function addCommentToPost(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const Commentrepository = getConnection().getRepository(Comment);
        const userId = getUserIdByToken(token);
        const NewComment = new Comment();
        NewComment.content = req.body.content;
        NewComment.userTag = req.body.userTag;
        NewComment.post = parseInt(req.params.id);
        console.log(NewComment)
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
        const result = await Commentrepository.save(UpdateComment);
        res.send(result);

    }
    catch (err) {
        return next(err)
    }
}

export async function deleteComment(req: Request, res: Response, next: NextFunction) {
    try {
        const Commentrepository = getConnection().getRepository(Comment);
        await Commentrepository.delete(req.params.id);
        res.send();
    }
    catch (err) {
        return next(err);
    }
}