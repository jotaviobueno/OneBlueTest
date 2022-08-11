// Models
import UserModel from '../../../Model/User/UserModel.js';
import LoginModel from '../../../Model/User/LoginModel.js';

// Dependencies
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';

class repository {

    async storageUser ( username, email, password ) {
       return true, await UserModel.create({
            username: username,
            email: email,
            password: await bcrypt.hash(password, 10),
            created_in: new Date(),
            update_at: new Date(),
            deleted_at: null
        });
    }

    async createSession ( email ) {
        const session_token = nanoid();

        await LoginModel.create({
            email: email,
            session_token: session_token,
            login_made_in: new Date(),
            disconnected_in: null,
        });

        return true, session_token;
    }

    async returnAccount ( email ) {
        return true, await UserModel.findOne({ email: email, deleted_at: null }).select({ _id: 0, __v: 0, password: 0 });
    }

    async deleteAccount (email) {
        await UserModel.findOneAndUpdate({ email: email, deleted_at: null}, { update_at: new Date(), deleted_at: new Date() });

        return true;
    }

}

export default new repository();