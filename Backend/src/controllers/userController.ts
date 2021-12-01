import { NextFunction, Request, Response } from 'express';
import { User } from "../entity/User";
import { getConnection } from 'typeorm';
import * as bcrypt from "bcrypt"
import * as  jwt from 'jsonwebtoken';
import * as dotenv from "dotenv"

dotenv.config()

// FUNCTION GET ALL USERS

export async function getAllusers(req: Request, res: Response, next: NextFunction) {
    try {
        const userRepository = await getConnection().getRepository(User);
        const allUsers = await userRepository.find();
        res.send(allUsers);
    }
    catch (err) {
        return next(err);
    }
}


//FONCTION USER LOGIN

export async function userLogin(req: Request, res: Response, next: NextFunction) {

    //Tchek Rquirements
    let { email, password } = req.body;
    if (!(email && password)) {
        res.status(400).send("veuillez rentrer vos informations");
    }

    //Selection du User sur la DB
    const userRepository = getConnection().getRepository(User);
    let user: User;
    try {
        user = await userRepository.findOneOrFail({ where: { email } });
    } catch (error) {
        res.status(401).send("Utilisateur inexistant");
    }
    // Comparaison des mots de passe par Bcrypt,
    bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
                userId: user.userId,
                token: jwt.sign(
                    { userId: user.userId },
                    process.env.JWT_TOKEN,
                    { expiresIn: '12h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
}


// FUNCTION GET ONE USER


export async function getOneUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userRepository = await getConnection().getRepository(User);
        const oneUser = await userRepository.findOne(req.params.id);
        res.send(oneUser);
    }
    catch (err) {
        return next(err);
    }
}

// FUNCTION CREATE USER

export async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userRepository = await getConnection().getRepository(User);
        let hash = await bcrypt.hash(req.body.password, 10);
        const NewUser = new User();
        NewUser.firstName = req.body.firstName;
        NewUser.lastName = req.body.lastName;
        NewUser.email = req.body.email;
        NewUser.password = hash;

        const result = await userRepository.save(NewUser);
        res.send(result);
    }
    catch (err) {
        return next(err);
    }
}

// FUNCTION UPTADE USER

export async function updateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userRepository = await getConnection().getRepository(User);
        const SaveUser = await userRepository.findOne(req.params.id);
        SaveUser.firstName = req.body.firstName;
        SaveUser.lastName = req.body.lastName;
        SaveUser.email = req.body.email;
        SaveUser.bio = req.body.bio;
        SaveUser.role = req.body.role;

        // SaveUser.AvatarUrl = `${req.protocol}://`

        const result = await userRepository.save(SaveUser);
        res.send(result);
    }
    catch (err) {
        return next(err);
    }
}

export async function newPassword(req: Request, res: Response, next: NextFunction) {
    try {
        let { oldPassword, newPassword } = req.body;
        if (!(oldPassword && newPassword)) {
            res.status(400).send("veuillez rentrer vos informations");
        }

        const userRepository = await getConnection().getRepository(User);
        const user = await userRepository.findOne(req.params.id);
        console.log(user)
        console.log(req.params.id)
        let compare = await bcrypt.compare(req.body.oldPassword, user.password)
        if (compare) {
            let hash = await bcrypt.hash(req.body.newPassword, 10);
            user.password = hash;
            console.log(user.password)
            const result = userRepository.save(user);
            res.send(result);
        }
        else {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
    }
    catch (err) {
        return next(err);
    }
}


// FUNCTION DELETE USER

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userRepository = await getConnection().getRepository(User);
        await userRepository.delete(req.params.id);
        res.send(`User id : ${req.params.id} was delete`);
    }
    catch (err) {
        return next(err);
    }
}