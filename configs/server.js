'use strict'
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import userRoutes from '../src/user/user.routes.js';
import categoryRoutes from '../src/categories/category.routes.js';

class Server {
    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.registerUserPath = '/opinionManager/v1/user/register';
        this.loginUserPath = '/opinionManager/v1/user';
        this.putUserPath = '/opinionManager/v1/user';
        this.postCategoryPath = '/opinionManager/v1/category';
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
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log('Server is running in the port', this.port);
        });
    }

}

export default Server;