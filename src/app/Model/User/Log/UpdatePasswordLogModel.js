// Dependencies
import mongoose from 'mongoose';

const updatePasswordLog = mongoose.model( "updatePasswordLog", {

    email: { type: String, required: true },
    update_in: { type: Date, required: true },

});

export default updatePasswordLog;
