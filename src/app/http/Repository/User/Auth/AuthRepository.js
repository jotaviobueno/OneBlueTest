// Models
import UserModel from '../../../../Model/User/UserModel.js';
import TokensChengePasswordModel from '../../../../Model/User/AuthToken/TokensChangePasswordModel.js';

// Dependencies
import { nanoid } from 'nanoid';

class repository {
    
    async GenerationTokenToChangePassword ( email ) {
        return true, await TokensChengePasswordModel.create({
            email: email,
            token: nanoid(),
            token_expires_in: new Date().setHours(new Date().getHours() + 1),
            status: null
        });
    }

}

export default new repository();