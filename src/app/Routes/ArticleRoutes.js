import express from 'express';
export const ArticleRoutes = express.Router();

// Controllers
import ArticleController from '../http/Controller/Article/ArticleController.js';
import UpdateController from '../http/Controller/Article/UpdateController.js';
import ArticleRequest from '../Request/Article/ArticleRequest.js';
import UpdateArticleRequest from '../Request/Article/UpdateArtlceRequest.js';

ArticleRoutes.post( '/article/create', ArticleRequest.validateCreateArticle, ArticleController.create );
ArticleRoutes.delete( '/article/delete', ArticleRequest.validateDeleteArticle, ArticleController.delete );

ArticleRoutes.get( '/article', ArticleController.findAllArticles );
ArticleRoutes.get( '/article/find-one', ArticleRequest.validateFindOneArticle, ArticleController.findOneArticle );
ArticleRoutes.get( '/article/add-like', ArticleRequest.validateAddLike, ArticleController.likeArticle );

ArticleRoutes.post( '/article/change-title', UpdateArticleRequest.validateUpdateTitle, UpdateController.updateTitle );
ArticleRoutes.post( '/article/change-text', UpdateArticleRequest.validateUpdateText, UpdateController.updateText );
ArticleRoutes.post( '/article/change-author', UpdateArticleRequest.validateUpdateAuthor, UpdateController.changeAuthor );