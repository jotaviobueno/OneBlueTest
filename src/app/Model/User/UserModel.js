import mongoose from 'mongoose';

const UserModel = mongoose.model( "user", {

    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    created_in: { type: Date, required: true },
    update_at: { type: Date, required: true },
    deleted_at: { type: Date},
});

export default UserModel;
