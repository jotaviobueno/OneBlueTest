// Dependencies
import mongoose from 'mongoose';

const ArticleLikeLogModel = mongoose.model( "ArticleLikeLog", {

    liked_by: { type: String, required: true },
    article_id: { type: String, required: true },

});

export default ArticleLikeLogModel;