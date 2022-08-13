// Models
import ArticleModel from '../../../Model/Article/ArticleModel.js';
import UpdateAuthorLogModel from '../../../Model/Article/Log/UpdateAuthorLogModel.js';
import UpdateTextLogModel from '../../../Model/Article/Log/UpdateTextLogModel.js';
import UpdateTitleLogModel from '../../../Model/Article/Log/UpdateTitleLogModel.js';

class repository {

    async updateTitle ( article_id, new_title ) {
       await ArticleModel.findOneAndUpdate({ _id: article_id, deleted_at: null }, 
            { article_title: new_title, update_at: new Date() });
        
        return true;
    } 

    async createLogUpdateTitle ( email, article_id, old_title, new_title, ) {
        await UpdateTitleLogModel.create({
            new_title: new_title,
            old_title: old_title,
            article_id: article_id, 
            owner: email, 
            update_in: new Date(),
        });
    }

    async updateArticleText ( article_id, new_text ) {
        await ArticleModel.findOneAndUpdate({ _id: article_id, deleted_at: null }, 
            { article_text: new_text, update_at: new Date() });
        
        return true;
    }

    async createLogUpdateText ( email, article_id, old_text, new_text ) {
        await UpdateTextLogModel.create({
            new_text: new_text,
            old_text: old_text,
            article_id: article_id, 
            owner: email, 
            update_in: new Date(),
        });
    }
    
    async updateArticleAuthor ( article_id, new_author ) {
        await ArticleModel.findOneAndUpdate({ _id: article_id, deleted_at: null }, 
            { author: new_author, update_at: new Date() });
        
        return true;
    }

    async createLogUpdateAuthor ( email, article_id, old_author, new_author ) {
        await UpdateAuthorLogModel.create({ 
            new_author: new_author,
            old_author: old_author,
            article_id: article_id, 
            owner: email, 
            update_in: new Date(),
        });
    }
}

export default new repository();