import { Request } from 'express';

import * as multer from 'multer';
import * as dotenv from 'dotenv';

dotenv.config();

const mimesTypes: any = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
}
type File = {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
};

const buildOptions = (destination: string) => {
    return {
        destination: (req: Request, file: File, callback: (p: Error | null, destination: string) => any) => {
            callback(null, destination);
        },
        filename: (req: Request, file: File, callback: (p: Error | null, fileName: string) => any) => {
            const name = file.originalname.split(' ').join('_');
            if (file.mimetype in mimesTypes) {
                const extension = mimesTypes[file.mimetype];
                const createdName = name + Date.now() + '.' + extension;
                callback(null, createdName);
            }
            else {
                callback(new Error('Error type'), "");
            }
        }
    }
}

const folderUser = "avatars_images";
const folderPosts = "posts_image";

const User = multer.diskStorage(buildOptions(folderUser));
const Posts = multer.diskStorage(buildOptions(folderPosts));

export const UserMulter = multer({ storage: User }).single('image');
export const postMulter = multer({ storage: Posts }).single('image');