// Models
import UserModel from '../../../Model/User/UserModel.js';
import UpdateNameLogModel from '../../../Model/User/Log/UpdateNameLogModel.js';
import UpdatePasswordLogModel from '../../../Model/User/Log/UpdatePasswordLogModel.js';
import UpdateEmailLogModel from '../../../Model/User/Log/UpdateEmailLogModel.js';
import TokensChangeEmailModel from '../../../Model/User/AuthToken/TokensChangeEmailModel.js';
import TokensChangePasswordModel from '../../../Model/User/AuthToken/TokensChangePasswordModel.js';

// Dependencies
import bcrypt from 'bcrypt';

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

    async createLogUpdatePassword ( email ) {
        await UpdatePasswordLogModel.create({
            email: email,
            update_in: new Date()
        });
    }

    async updatePassword ( new_password, email ) {
        await UserModel.findOneAndUpdate({ email: email, deleted_at: null }, { password: await bcrypt.hash( new_password, 10), update_at: new Date() });

        return true;
    }

    async ChangeEmail ( email, new_email ) {
        await UserModel.findOneAndUpdate({ email: email, deleted_at: null }, { email: new_email, update_at: new Date() });

        return true;
    }

    async createLogUpdateEmail ( email, new_email ) {
        await UpdateEmailLogModel.create({
            email: email,
            new_email: new_email,
            update_in: new Date()
        });
    }

    async deleteEmailToken ( token ) {
        await TokensChangeEmailModel.findOneAndUpdate({ token: token, status: null }, { status: true });

        return true;
    }

    async deletePasswordToken ( token ) {
        await TokensChangePasswordModel.findOneAndUpdate({ token: token, status: null }, { status: true });

        return true;
    }

}

export default new repository();