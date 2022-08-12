// Models
import TokensChengePasswordModel from '../../../../Model/User/AuthToken/TokensChangePasswordModel.js';
import TokensChangeEmailModel from '../../../../Model/User/AuthToken/TokensChangeEmailModel.js';

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

    async GenerationTokenToChangeEmail ( email ) {
        return true, await TokensChangeEmailModel.create({
            email: email,
            token: nanoid(),
            token_expires_in: new Date().setHours(new Date().getHours() + 1),
            status: null
        });
    }
}

export default new repository();