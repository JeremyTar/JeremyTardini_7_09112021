import { Request } from 'express';

import * as multer from 'multer';
import * as dotenv from 'dotenv';

dotenv.config();

const mimesTypes: any = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
    'image/gif': 'gif'
}
const buildOptions = (destination: string) => {
    return {
        destination: (req: Request, file: any, callback: (p: Error | null, destination: string) => any) => {
            callback(null, destination);
        },
        filename: (req: Request, file: any, callback: (p: Error | null, fileName: string) => any) => {
            if (file.mimetype in mimesTypes) {
                const name = file.originalname;
                callback(null, name);
            }
            else {
                callback(new Error('Error type'), "");
            }
        }
    }
}

const folderUser = "dist/Files/users_files";
const folderPosts = "dist/Files/posts_files";

const User = multer.diskStorage(buildOptions(folderUser));
const Posts = multer.diskStorage(buildOptions(folderPosts));

export const UserMulter = multer({ storage: User }).single('file');
export const postMulter = multer({ storage: Posts }).single('file');