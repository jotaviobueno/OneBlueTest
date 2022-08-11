// Repository
import repository from '../../Repository/User/UserRepository.js';

// Helpers
import UserHelper from '../../../Helper/User/UserHelper.js';
import ResponseHelper from '../../../Helper/ResponseHelper.js';

class UserController {

    async storageUser ( req, res ) {
        const { username, email, password } = req.body;

        if ( await UserHelper.existEmail( email ) != false)
            return await ResponseHelper.badRequest( res, { error:  "email already registered" });

        if ( await repository.storageUser( username, email, password ))
            return await ResponseHelper.created( res, { success:  "account created" });

        return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });
    }

    async login ( req, res ) {
        const { email, password } = req.body;

        const UserInfo = await UserHelper.existEmail( email );

        if (! UserInfo )
            return await ResponseHelper.badRequest( res, { error:  "email not found" });
        
        await UserHelper.verifySession(UserInfo.email );

        if (! await UserHelper.comparePassword( password, UserInfo.password ))
            return await ResponseHelper.notAuthorized( res, { error:  "credentials invalid" });

        const session_token = await repository.createSession( email );

        if ( session_token )
            return await ResponseHelper.success( res, { success:  'login made', session_token: session_token });

        return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });
    }

    async seeAccount ( req, res ) {
        const { session_token } = req.headers;

        const sessionInfo = await UserHelper.verifyToken( session_token );

        if (! sessionInfo )
            return await ResponseHelper.unprocessableEntity( res, { error:  "session not found" });
        
        const UserInfo = await UserHelper.existEmail( sessionInfo.email );

        if (! UserInfo )
            return await ResponseHelper.badRequest( res, { error:  "email not found" });

        const returnAccount = await repository.returnAccount( UserInfo.email )

        if ( returnAccount )
            return await ResponseHelper.success( res, { success: returnAccount });

        return await ResponseHelper.unprocessableEntity( res, { error: "unable to process request" });    
    }

    async delete ( req, res ) {
        const { session_token } = req.headers;
        const { password } = req.body;  

        const sessionInfo = await UserHelper.verifyToken( session_token );

        if (! sessionInfo )
            return await ResponseHelper.unprocessableEntity( res, { error:  "session not found" });
        
        const UserInfo = await UserHelper.existEmail( sessionInfo.email );

        if (! UserInfo )
            return await ResponseHelper.badRequest( res, { error:  "email not found" });

        if (! await UserHelper.comparePassword( password, UserInfo.password ))
            return await ResponseHelper.notAuthorized( res, { error:  "credentials invalid" });

        if ( await repository.deleteAccount( UserInfo.email )) {

            await UserHelper.disconnectAllSession( UserInfo.email );

            return await ResponseHelper.success( res, { success: "account deleted" });  
        }  
        
        return await ResponseHelper.unprocessableEntity( res, { error: "unable to process request" });    
    }
}

export default new UserController();