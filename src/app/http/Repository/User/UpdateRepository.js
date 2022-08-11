// Models
import UserModel from '../../../Model/User/UserModel.js';
import UpdateNameLogModel from '../../../Model/User/Log/UpdateNameLogModel.js';
import UpdatePasswordLogModel from '../../../Model/User/Log/UpdatePasswordLogModel.js';

// Dependencies

class repository {

    async CreateNameChangeLogging ( new_name, old_name, email ) {
        await UpdateNameLogModel.create({
            email: email,
            new_name: new_name,
            old_name: old_name,
            update_in: new Date()
        });
    }

    async ChangeName ( email, new_name ) {
        await UserModel.findOneAndUpdate({ email: email, deleted_at: null }, { username: new_name, update_at: new Date() });

        return true;
    }

    async createLog ( email ) {
        await UpdatePasswordLogModel.create({
            email: email,
            update_in: new Date()
        });
    }

    async updatePassword ( new_password, email ) {
        await UserModel.findOne({ email: email, deleted_at: null }, { password: new_password, update_at: new Date() });

        return true;
    }
}

export default new repository();