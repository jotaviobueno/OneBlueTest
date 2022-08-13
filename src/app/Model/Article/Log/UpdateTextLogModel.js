// Dependencies
import mongoose from 'mongoose';

const updateArticleTextLog = mongoose.model( "updateArticleText", {

    new_text: { type: String, required: true },
    old_text: { type: String, required: true },
    article_id: { type: String, required: true }, 
    owner: { type: String, required: true }, 
    update_in: { type: Date, required: true },

});

export default updateArticleTextLog;
