// Dependencies
import mongoose from 'mongoose';

const updateEmailLog = mongoose.model( "updateEmailLog", {

    email: { type: String, required: true },
    new_email: { type: String, required: true },
    update_in: { type: Date, required: true },

});

export default updateEmailLog;
