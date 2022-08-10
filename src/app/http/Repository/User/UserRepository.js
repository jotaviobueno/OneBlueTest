// Models
import UserModel from '../../../Model/User/UserModel.js';

// Dependencies
import bcrypt from 'bcrypt';

class repository {

    async storageUser (username, email, password) {
       return true, await UserModel.create({
            username: username,
            email: email,
            password: await bcrypt.hash(password, 10),
            created_in: new Date(),
            update_at: new Date(),
            deleted_at: null
        });
    }

}

export default new repository();