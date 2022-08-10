// Models
import UserModel from '../../Model/User/UserModel.js';

class UserHelper {

    async existEmail ( email ) {
        const verifyEmail = await UserModel.findOne({ email: email, deleted_at: null });

        if  (verifyEmail === null)
            return false;

        return verifyEmail;
    }

}

export default new UserHelper();