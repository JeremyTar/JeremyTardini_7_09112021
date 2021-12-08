import { NextFunction, Request, Response, Router } from 'express';
import { getConnection } from 'typeorm';
import { Post } from "../entity/Post";

export async function getAllPosts(req: Request, res: Response, next: NextFunction) {
    try {
        const repository = getConnection().getRepository(Post);
        const allPosts = await repository.find();
        res.send(allPosts);
    }
    catch (err) {
        return next(err);
    }
}

export async function getAllPostsByUser(req: Request, res: Response, next: NextFunction) {
    try {
        const repository = getConnection().getRepository(Post);
        const AllPosts = await repository.find({ where: { createdUserId: req.params.id } })
        res.send(AllPosts)
    }
    catch (err) {
        return next(err)
    }
}

export async function getOnePost(req: Request, res: Response, next: NextFunction) {
    try {
        const repository = getConnection().getRepository(Post);
        const onePosts = await repository.findOne(req.params.id);
        res.send(onePosts);
    }
    catch (err) {
        return next(err);
    }
}

export async function sendPost(req: Request, res: Response, next: NextFunction) {
    try {
        const repository = getConnection().getRepository(Post);
        const NewPost = new Post();
        NewPost.title = req.body.title;
        NewPost.content = req.body.content;
        NewPost.categorie = req.body.categorie;
        NewPost.likes = []
        NewPost.dislikes = []
        NewPost.createdUserId = req.body.createdUserId;
        // NewPost.user = req.body.createdUserId
        NewPost.attachement = `${req.protocol}://${req.get('host')}/images/posts/${req.body.attachement}`           
        const result = await repository.save(NewPost);
        res.send(result);
    }
    catch (err) {
        return next(err);
    }
};

export async function likePost(req: Request, res: Response, next: NextFunction) {
    const repository = getConnection().getRepository(Post);
    const UpdatePost = await repository.findOne(req.params.id);
    if (UpdatePost.likes.some(like => like === req.body.userId)) {
        UpdatePost.likes.splice(UpdatePost.likes.indexOf(req.body.userId), 1);
        const result = await repository.save(UpdatePost);
        res.send(result)
    }
    else {
        UpdatePost.likes.push(req.body.userId);
        const result = await repository.save(UpdatePost);
        res.send(result)
    }
}

export async function dislikePost(req: Request, res: Response, next: NextFunction) {
    const repository = getConnection().getRepository(Post);
    const UpdatePost = await repository.findOne(req.params.id);
    if (UpdatePost.dislikes.some(dislike => dislike === req.body.userId)) {
        UpdatePost.dislikes.splice(UpdatePost.likes.indexOf(req.body.userId), 1);
        const result = await repository.save(UpdatePost);
        res.send(result)
    }
    else {
        UpdatePost.dislikes.push(req.body.userId);
        const result = await repository.save(UpdatePost);
        res.send(result)
    }
}


export async function savePost(req: Request, res: Response, next: NextFunction) {
    try {
        const repository = getConnection().getRepository(Post);
        const UpdatePost = await repository.findOne(req.params.id);
        UpdatePost.title = req.body.title;
        UpdatePost.content = req.body.content;
        // UpdatePost.attachement = `${req.protocol}://${req.get('host')}/posts_images/${req.file.filename}`             
        UpdatePost.categorie = req.body.categorie;
        // UpdatePost.user = req.body.createdUserId
        const result = await repository.save(UpdatePost);
        res.send(result);
    }
    catch (err) {
        return next(err);
    }
}

export async function savePostImage(req: Request, file: File, next: NextFunction) {

}

export async function deletePost(req: Request, res: Response, next: NextFunction) {
    try {
        const repository = getConnection().getRepository(Post);
        await repository.delete(req.params.id);
        res.send();
    }
    catch (err) {
        return next(err);
    }
}




