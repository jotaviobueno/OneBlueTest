// Dependencies
import mongoose from 'mongoose';

const updateArticleAuthorLog = mongoose.model( "updateArticleAuthor", {

    new_author: { type: String, required: true },
    old_author: { type: String, required: true },
    article_id: { type: String, required: true }, 
    owner: { type: String, required: true }, 
    update_in: { type: Date, required: true },

});

export default updateArticleAuthorLog;