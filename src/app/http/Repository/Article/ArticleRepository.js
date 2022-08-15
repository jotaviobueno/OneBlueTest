// Models
import ArticleModel from '../../../Model/Article/ArticleModel.js';
import ArticleLikeLogModel from '../../../Model/Article/Log/ArticleLikeLogModel.js';

class repository {

    async createArticle ( username, email, article_title, article_text, author ) {
        return true, await ArticleModel.create({
            username: username,
            created_by_email: email,
            article_title: article_title,
            article_text: article_text,
            author: author,
            total_like: 0,
            created_in: new Date(),
            update_at: new Date(),
            deleted_at: null,
        });
    }

    async deleteArticle ( article_id ) {
        await ArticleModel.findOneAndUpdate({ _id: article_id, deleted_at: null }, 
            { deleted_at: new Date(), update_at: new Date() });

        return true
    }

    async findAllArticles (  ) {
        return true, await ArticleModel.find({ deleted_at: null }).sort({ created_in: -1 })
            .select({ __v: 0, created_by_email: 0, created_in: 0, update_at: 0, deleted_at: 0 });
    }

    async findOneArticle ( article_id ) {
        try {
            return await ArticleModel.findOne({ _id: article_id, deleted_at: null })
            .select({ __v: 0, created_by_email: 0, created_in: 0, update_at: 0, deleted_at: 0 });;

        } catch (e) {
            return false;
        }
    }

    async verifyArticleLike ( email, article_id ) {
        const findLike = await ArticleLikeLogModel.findOne({ liked_by: email, article_id: article_id });

        if ( findLike === null )
            return false;
        
        return true;
    }

    async addLike ( articleInfo ) {
        const sum = parseFloat( articleInfo.total_like ) + parseFloat( 1 );

        await ArticleModel.findOneAndUpdate({ _id: articleInfo._id, deleted_at: null }, 
            { update_at: new Date(), total_like: sum });
    }

    async createLogAddLike ( article_id, email ) {
        await ArticleLikeLogModel.create({
            liked_by: email,
            article_id: article_id,
        });
    }

    async removeLike ( articleInfo ) {
        const removeLike = parseFloat( articleInfo.total_like ) - parseFloat( 1 );

        await ArticleModel.findOneAndUpdate({ _id: articleInfo._id, deleted_at: null }, 
            { update_at: new Date(), total_like: removeLike });
    }

    async removeLogLike ( article_id, email ) {
        await ArticleLikeLogModel.findOneAndDelete({ liked_by: email, article_id: article_id });
    }
}

export default new repository();