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
        return true, await LoginModel.create({
            email: email,
            session_token: nanoid(),
            login_made_in: new Date(),
            disconnected_in: null,
        });
    }

}

export default new repository();