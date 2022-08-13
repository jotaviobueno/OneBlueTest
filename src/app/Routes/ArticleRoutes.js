import express from 'express';
export const ArticleRoutes = express.Router();

import ArticleController from '../http/Controller/Article/ArticleController.js';

ArticleRoutes.post( '/article/create', ArticleController.create );
ArticleRoutes.delete( '/article/delete', ArticleController.delete );


ArticleRoutes.get( '/article', ArticleController.findAllArticles );
ArticleRoutes.get( '/article/find-one', ArticleController.findOneArticle );