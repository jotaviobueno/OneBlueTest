// Dependencies
import mongoose from 'mongoose';

const updateNameLog = mongoose.model( "updateNameLog", {

    email: { type: String, required: true },
    new_name: { type: String, required: true },
    old_name: { type: String, required: true },
    update_in: { type: Date, required: true },

});

export default updateNameLog;
