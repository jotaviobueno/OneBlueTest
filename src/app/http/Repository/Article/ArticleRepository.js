// Models
import ArticleModel from '../../../Model/Article/ArticleModel.js';

class repository {

    async createArticle ( email, article_title, article_text, author ) {
        return true, await ArticleModel.create({
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
}

export default new repository();