'use strict'
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import userRoutes from '../src/user/user.routes.js';
import categoryRoutes from '../src/categories/category.routes.js';
import publicationRoutes from '../src/publications/publication.routes.js';
import commentRoutes from '../src/comments/comment.routes.js';

class Server {
    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.registerUserPath = '/opinionManager/v1/user/register';
        this.loginUserPath = '/opinionManager/v1/user';
        this.putUserPath = '/opinionManager/v1/user';
        this.postCategoryPath = '/opinionManager/v1/category';
        this.postPublicationPath = '/opinionManager/v1/publication';
        this.putPublicationPath = '/opinionManager/v1/publication';
        this.deletePublicationPath = '/opinionManager/v1/publication';
        this.postCommentPath = '/opinionManager/v1/comment';
        this.putCommentPath = '/opinionManager/v1/comment';
        this.deleteCommentPath = '/opinionManager/v1/comment';
        this.middlewares();
        this.conectarDB();
        this.routes();
    }
    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use(this.loginUserPath, userRoutes);
        this.app.use(this.registerUserPath, userRoutes);
        this.app.use(this.putUserPath, userRoutes);
        this.app.use(this.postCategoryPath, categoryRoutes);
        this.app.use(this.postPublicationPath, publicationRoutes);
        this.app.use(this.putPublicationPath, publicationRoutes);
        this.app.use(this.deletePublicationPath, publicationRoutes);
        this.app.use(this.postCommentPath, commentRoutes);
        this.app.use(this.putCommentPath, commentRoutes);
        this.app.use(this.deleteCommentPath, commentRoutes);
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log('Server is running in the port', this.port);
        });
    }

}

export default Server;