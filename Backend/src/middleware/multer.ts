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
//  const buildOptions = (destination: string) => {
//      return {
//          destination: (req: Request, file: any, callback: (p: Error | null, destination: string) => any) => {
//              callback(null, destination);
//          },
//          filename: (req: Request, file: any, callback: (p: Error | null, fileName: string) => any) => {
//              const name = file.originalname.split(' ').join('_');
//              if (file.mimetype in mimesTypes) {
//                  const extension = mimesTypes[file.mimetype];
//                  const createdName = name + Date.now() + '.' + extension;
//                  callback(null, createdName);
//              }
//              else {
//                  callback(new Error('Error type'), "");
//              }
//          }
//      }
//  }

//  const folderUser = "./avatars_files";
//  const folderPosts = "./posts_files";

//  const User = multer.diskStorage(buildOptions(folderUser));
//  const Posts = multer.diskStorage(buildOptions(folderPosts));

//  export const UserMulter = multer({ storage: User }).single('file');
//  export const postMulter = multer({ storage: Posts }).single('file');






// const MIME_TYPES = {
//     'image/jpg': 'jpg',
//     'image/jpeg': 'jpg',
//     'image/png': 'png'
//   };
  
const storage = multer.diskStorage({
     destination: (req, file, callback) => {
       callback(null, 'file');
     },
     filename: (req, file, callback) => {
       const name = file.originalname.split(' ').join('_');
       const extension = mimesTypes[file.mimetype];
       callback(null, name + Date.now() + '.' + extension);
     }
   });
  
   export const Multer = multer({storage: storage}).single('file');