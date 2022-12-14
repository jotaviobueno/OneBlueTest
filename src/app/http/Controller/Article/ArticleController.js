// Repository
import repository from '../../Repository/Article/ArticleRepository.js';

// Helpers
import UserHelper from '../../../Helper/User/UserHelper.js';
import ResponseHelper from '../../../Helper/ResponseHelper.js';
import ArticleHelper from '../../../Helper/Article/ArticleHelper.js';

class ArticleController {
    async create ( req, res ) {
        const { session_token } = req.headers;
        const { article_title, article_text, author } = req.body;

        const sessionInfo = await UserHelper.verifyToken( session_token );

        if (! sessionInfo )
            return await ResponseHelper.unprocessableEntity( res, { error:  "session not found" });
        
        const UserInfo = await UserHelper.existEmail( sessionInfo.email );

        if (! UserInfo )
            return await ResponseHelper.badRequest( res, { error:  "email not found" });

        const article_id = await repository.createArticle( UserInfo.username, UserInfo.email, article_title, article_text, author );

        if ( article_id )
            return await ResponseHelper.success( res, { article_id: article_id._id });

        return await ResponseHelper.unprocessableEntity( res, { error: "unable to process request" }); 
    }

    async delete ( req, res ) {
        const { session_token, article_id } = req.headers;
        const { password } = req.body;
        
        const articleInfo = await ArticleHelper.existArticle( article_id );

        if (! articleInfo )
            return await ResponseHelper.unprocessableEntity( res, { error:  "article_id its not found" });

        const sessionInfo = await UserHelper.verifyToken( session_token );

        if (! sessionInfo )
            return await ResponseHelper.unprocessableEntity( res, { error:  "session not found" });
        
        const UserInfo = await UserHelper.existEmail( sessionInfo.email );

        if (! UserInfo )
            return await ResponseHelper.badRequest( res, { error:  "email not found" });

        if ( articleInfo.created_by_email != UserInfo.email )
            return await ResponseHelper.notAuthorized( res, { error:  "not autorized" });

        if (! await UserHelper.comparePassword( password, UserInfo.password ))
            return await ResponseHelper.notAuthorized( res, { error:  "credentials invalid" });

        if ( await repository.deleteArticle( article_id )) {
            return await ResponseHelper.success( res, { success: "article deleted" });
        }

        return await ResponseHelper.unprocessableEntity( res, { error: "unable to process request" }); 
    }

    async likeArticle ( req, res ) {
        const { session_token, article_id } = req.headers;

        const articleInfo = await ArticleHelper.existArticle( article_id );

        if (! articleInfo )
            return await ResponseHelper.unprocessableEntity( res, { error:  "article_id its not found" });

        const sessionInfo = await UserHelper.verifyToken( session_token );

        if (! sessionInfo )
            return await ResponseHelper.unprocessableEntity( res, { error:  "session not found" });
        
        const UserInfo = await UserHelper.existEmail( sessionInfo.email );

        if (! UserInfo )
            return await ResponseHelper.badRequest( res, { error:  "email not found" });

        const trueOrFalse = await repository.verifyArticleLike( UserInfo.email, article_id );

        if ( trueOrFalse ) {

            await repository.removeLike( articleInfo );

            await repository.removeLogLike( article_id, UserInfo.email );
            
            return await ResponseHelper.success( res, { success:  "like removed" });
        } 

        if (! trueOrFalse ) {
            await repository.addLike( articleInfo );

            await repository.createLogAddLike( article_id, UserInfo.email );

            return await ResponseHelper.success( res, { success:  "like added" });
        }

        return await ResponseHelper.unprocessableEntity( res, { error: "unable to process request" }); 
    }

    async findAllArticles ( req, res ) {
        const allArticles = await repository.findAllArticles(  );

        if ( allArticles )
            return await ResponseHelper.success( res, { articles: allArticles });

        return await ResponseHelper.unprocessableEntity( res, { error: "unable to process request" }); 
    }

    async findOneArticle ( req, res ) {
        const { article_id } = req.headers;

        const articleInfo = await ArticleHelper.existArticle( article_id );

        if (! articleInfo )
            return await ResponseHelper.unprocessableEntity( res, { error:  "article_id its not found" });
        
        const ArticleAllInfo = await repository.findOneArticle( article_id );

        if ( ArticleAllInfo ) {
            return await ResponseHelper.success( res, { articles: ArticleAllInfo }); 
        }

        return await ResponseHelper.unprocessableEntity( res, { error: "unable to process request" }); 
    }
}

export default new ArticleController();