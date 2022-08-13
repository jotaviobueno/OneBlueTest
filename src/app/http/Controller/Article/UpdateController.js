// Repository
import repository from '../../Repository/Article/UpdateRepository.js';

// Helpers
import UserHelper from '../../../Helper/User/UserHelper.js';
import ResponseHelper from '../../../Helper/ResponseHelper.js';
import ArticleHelper from '../../../Helper/Article/ArticleHelper.js';

class UpdateController {
    async updateTitle ( req, res ) {
        const { session_token, article_id } = req.headers;
        const { new_title } = req.body;

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
        
        if ( articleInfo.article_title === new_title )
            return await ResponseHelper.unprocessableEntity( res, { error:  "title identical to the article" });

        if ( await repository.updateTitle( article_id, new_title )) {

            await repository.createLogUpdateTitle(UserInfo.email, article_id, articleInfo.article_title, new_title);

            return await ResponseHelper.success( res, { success:  "title changed" });
        }

        return await ResponseHelper.unprocessableEntity( res, { error: "unable to process request" }); 
    }

    async updateText ( req, res ) {
        const { session_token, article_id } = req.headers;
        const { new_text } = req.body;

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
        
        if ( articleInfo.article_text === new_text )
            return await ResponseHelper.unprocessableEntity( res, { error:  "title identical to the article" });

        if ( await repository.updateArticleText( article_id, new_text )) {
            
            await repository.createLogUpdateText( UserInfo.email, article_id, articleInfo.article_text, new_text );

            return await ResponseHelper.success( res, { success:  "text changed" });
        }

        return await ResponseHelper.unprocessableEntity( res, { error: "unable to process request" }); 
    }

    async changeAuthor ( req, res ) {
        const { session_token, article_id } = req.headers;
        const { new_author } = req.body;

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
        
        if ( articleInfo.author === new_author )
            return await ResponseHelper.unprocessableEntity( res, { error:  "title identical to the article" });

        if ( await repository.updateArticleAuthor( article_id, new_author )) {

            await repository.createLogUpdateAuthor( UserInfo.email, article_id, articleInfo.author, new_author );

            return await ResponseHelper.success( res, { success:  "author changed" });
        }

        return await ResponseHelper.unprocessableEntity( res, { error: "unable to process request" });
    }
}

export default new UpdateController();