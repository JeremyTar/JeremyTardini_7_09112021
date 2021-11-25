import { NextFunction, Request, Response, Router } from 'express';
import { getConnection } from 'typeorm';
import { Post } from "../entity/Post";

export async function getAllPosts(req: Request, res: Response, next: NextFunction) {
    try {
        const repository = await getConnection().getRepository(Post);
        const allPosts = await repository.find();
        res.send(allPosts);
    }
    catch (err) {
        return next(err);
    }
}

export async function getOnePost(req: Request, res: Response, next: NextFunction) {
    try {
        const repository = await getConnection().getRepository(Post);
        const onePosts = await repository.findOne(req.params.id);
        res.send(onePosts);
    }
    catch (err) {
        return next(err);
    }
}

export async function sendPost(req: Request, res: Response, next: NextFunction) {
    try {
        const repository = await getConnection().getRepository(Post);
        const NewPost = new Post();
        NewPost.title = req.body.title;
        NewPost.content = req.body.content;
        NewPost.attachement = req.body.attachement;
        const result = await repository.save(NewPost);
        res.send(result);
    }
    catch (err) {
        return next(err);
    }
};

export async function savePost(req: Request, res: Response, next: NextFunction) {
    try {
        const repository = await getConnection().getRepository(Post);
        const UpdatePost = await repository.findOne(req.params.id);
        UpdatePost.title = req.body.title;
        UpdatePost.content = req.body.content;
        UpdatePost.attachement = req.body.attachement;

        const result = await repository.save(UpdatePost);
        res.send(result);
    }
    catch (err) {
        return next(err);
    }
}

export async function deletePost(req: Request, res: Response, next: NextFunction) {
    try {
        const repository = await getConnection().getRepository(Post);
        await repository.delete(req.params.id);
        res.send('OK');
    }
    catch (err) {
        return next(err);
    }
}