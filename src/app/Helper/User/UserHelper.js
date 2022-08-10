// Models
import UserModel from '../../Model/User/UserModel.js';
import LoginModel from '../../Model/User/LoginModel.js';

// Dependencies
import bcrypt from 'bcrypt';

class UserHelper {

    async existEmail ( email ) {
        const verifyEmail = await UserModel.findOne({ email: email, deleted_at: null });

        if  (verifyEmail === null)
            return false;

        return verifyEmail;
    }

    async comparePassword ( password, hash ) {
        return await bcrypt.compare( password, hash );
    }

    async verifySession ( email ) {
        const disconnectSession = await LoginModel.find({ email: email, disconnected_in: null });

        if (disconnectSession.length >= 1) {
            disconnectSession.forEach(async ( session ) => {
                await LoginModel.updateMany({ email: session.email, disconnected_in: null }, { disconnected_in: new Date() });
            });
        }
    }
}

export default new UserHelper();