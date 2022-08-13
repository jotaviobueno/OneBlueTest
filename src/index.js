import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { UserRoutes } from '../src/app/routes/UserRoutes.js';
import { ArticleRoutes } from '../src/app/Routes/ArticleRoutes.js';

const app = express();

dotenv.config();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', UserRoutes);
app.use('/', ArticleRoutes);

mongoose.connect(process.env.DB_LINK).then(() => {
    console.log('connected to mongoose');

    app.listen(8081, () => {
        console.log('listen on!');
    });

}).catch((e) => {
    console.log(e);
});
