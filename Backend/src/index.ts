import * as express from 'express';
import * as cors from 'cors';
import * as path from 'path';
import * as dotenv from 'dotenv'

import { UserRouter } from './routes/userRoute'
import { PostRouter } from './routes/postRoute';
import { createConnection, getConnection } from 'typeorm';
import { CommentRouter } from './routes/commentRoute';

dotenv.config()


createConnection().then(async () => {
    await getConnection()
    console.log("Connected to MySQL")
});

const app = express()

    .use(cors())
    .use(express.json())
    .use('/api', UserRouter)
    .use('/api', PostRouter)
    .use('/api', CommentRouter)

    // .use(express.static(__dirname + '/photo'));
    app.use('/images/posts', express.static(path.join(__dirname, "Files", "posts_files"))); // dossier multer
    app.use('/images/users', express.static(path.join(__dirname, "Files", "users_files")));
    console.log(__dirname);


app.listen(3000, () => {
    return console.log('My Node App listening on port 3000');
});