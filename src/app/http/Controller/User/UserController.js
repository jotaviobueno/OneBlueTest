// Repository
import repository from '../../Repository/User/UserRepository.js';

// Helpers
import UserHelper from '../../../Helper/User/UserHelper.js';
import ResponseHelper from '../../../Helper/ResponseHelper.js';

class UserController {

    async storageUser ( req, res ) {
        const { username, email, password } = req.body;

        if (await UserHelper.existEmail( email ) != false)
            return await ResponseHelper.badRequest( res, { error:  "email already registered" });

        if (await repository.storageUser( username, email, password ))
            return await ResponseHelper.created( res, { success:  "account created" });

        return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });;
    }
}

export default new UserController();
