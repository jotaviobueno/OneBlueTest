// Dependencies
import mongoose from 'mongoose';

const LoginModel = mongoose.model( "Login", {

    email: { type: String, required: true },
    session_token: { type: String, required: true },
    login_made_in: { type: Date, required: true },
    disconnected_in: { type: Date},
});

export default LoginModel;
