// Models
import ArticleModel from '../../Model/Article/ArticleModel.js';

class ArticleHelper {
    async existArticle ( article_id ) {
        try {
            const findArticle = await ArticleModel.findOne({ _id: article_id, deleted_at: null });

            if ( findArticle === null )
                return false;

            return true, findArticle;

        } catch (e) {
            return false;
        }
    }
}

export default new ArticleHelper();