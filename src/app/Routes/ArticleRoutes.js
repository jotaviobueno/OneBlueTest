import express from 'express';
export const ArticleRoutes = express.Router();

// Controllers
import ArticleController from '../http/Controller/Article/ArticleController.js';
import UpdateController from '../http/Controller/Article/UpdateController.js';

ArticleRoutes.post( '/article/create', ArticleController.create );
ArticleRoutes.delete( '/article/delete', ArticleController.delete );

ArticleRoutes.get( '/article', ArticleController.findAllArticles );
ArticleRoutes.get( '/article/find-one', ArticleController.findOneArticle );

ArticleRoutes.post( '/article/change-title', UpdateController.updateTitle );
ArticleRoutes.post( '/article/change-text', UpdateController.updateText );
ArticleRoutes.post( '/article/change-author', UpdateController.changeAuthor );