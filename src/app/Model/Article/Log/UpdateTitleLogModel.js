// Dependencies
import mongoose from 'mongoose';

const updateArticleTitleLog = mongoose.model( "updateArticleTitle", {

    new_title: { type: String, required: true },
    old_title: { type: String, required: true },
    article_id: { type: String, required: true }, 
    owner: { type: String, required: true }, 
    update_in: { type: Date, required: true },

});

export default updateArticleTitleLog;
