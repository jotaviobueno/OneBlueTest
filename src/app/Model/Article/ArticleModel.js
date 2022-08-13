// Dependencies
import mongoose from 'mongoose';

const ArticleModel = mongoose.model('article', {

    created_by_email: { type: String, required: true },
    article_title: { type: String, required: true },
    article_text: { type: String, required: true },
    author: { type: String, required: true },
    total_like: { type: Number, required: true },
    created_in: { type: Date, required: true },
    update_at: { type: Date, required: true },
    deleted_at: { type: Date },
});

export default ArticleModel;