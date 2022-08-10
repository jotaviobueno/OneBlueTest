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

        return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });
    }

    async login ( req, res ) {
        const { email, password } = req.body;

        const UserInfo = await UserHelper.existEmail( email );

        if (! UserInfo)
            return await ResponseHelper.badRequest( res, { error:  "email not found" });
        
        await UserHelper.verifySession(UserInfo.email);

        if (! await UserHelper.comparePassword( password, UserInfo.password ))
            return await ResponseHelper.notAuthorized( res, { error:  "credentials invalid" });

        const session_token = await repository.createSession( email );

        if (session_token)
            return await ResponseHelper.success( res, { success:  'login made', session_info: {email: session_token.email, session_token: session_token.session_token } });

        return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });
    }
}

export default new UserController();
