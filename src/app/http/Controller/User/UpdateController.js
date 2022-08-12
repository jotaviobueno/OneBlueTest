// Repository
import repository from '../../Repository/User/UpdateRepository.js';

// Helpers
import UserHelper from '../../../Helper/User/UserHelper.js';
import ResponseHelper from '../../../Helper/ResponseHelper.js';

class UpdateController {

    async name ( req, res ) {
        const { session_token } = req.headers;
        const { password, new_name } = req.body;  

        const sessionInfo = await UserHelper.verifyToken( session_token );

        if (! sessionInfo )
            return await ResponseHelper.unprocessableEntity( res, { error:  "session not found" });
        
        const UserInfo = await UserHelper.existEmail( sessionInfo.email );

        if (! UserInfo )
            return await ResponseHelper.badRequest( res, { error:  "email not found" });

        if (! await UserHelper.comparePassword( password, UserInfo.password ))
            return await ResponseHelper.notAuthorized( res, { error:  "credentials invalid" });

        if ( await repository.ChangeName( UserInfo.email, new_name )) {
            
            await repository.CreateNameChangeLogging( new_name, UserInfo.username, UserInfo.email );

            return await ResponseHelper.success( res, { success:  "name changed" });
        }
        
        return await ResponseHelper.unprocessableEntity( res, { error: "unable to process request" }); 
    } 

    async ChangePassword ( req, res ) {
        const { session_token } = req.headers;
        const { password, new_password } = req.body;

        const sessionInfo = await UserHelper.verifyToken( session_token );

        if (! sessionInfo )
            return await ResponseHelper.unprocessableEntity( res, { error:  "session not found" });
        
        const UserInfo = await UserHelper.existEmail( sessionInfo.email );

        if (! UserInfo )
            return await ResponseHelper.badRequest( res, { error:  "email not found" });

        if (! await UserHelper.comparePassword( password, UserInfo.password ))
            return await ResponseHelper.notAuthorized( res, { error:  "credentials invalid" });

        if ( await UserHelper.comparePassword( new_password, UserInfo.password ))
            return await ResponseHelper.notAuthorized( res, { error:  "password identical to the account" });

        if ( await repository.updatePassword( new_password, UserInfo.email )) {
            
            await repository.createLog( UserInfo.email );

            await UserHelper.disconnectAllSession( UserInfo.email );

            return await ResponseHelper.success( res, { success:  "password changed" });
        }

        return await ResponseHelper.unprocessableEntity( res, { error: "unable to process request" }); 
    }

    async changeEmail ( req, res ) {
        const { change_token } = req.headers;
        const { new_email, password } = req.body;

        const tokenInfo = await repository.existToken( change_token );
        
        if (! tokenInfo )
            return await ResponseHelper.badRequest( res, { error:  "Token invalid" });

        const UserInfo = await UserHelper.existEmail( tokenInfo.email );
        
        if (! UserInfo )
            return await ResponseHelper.badRequest( res, { error:  "email not found" });

        if ( tokenInfo.email != UserInfo.email )
            return await ResponseHelper.notAuthorized( res, { error:  "credentials invalid" });
        
        if ( new_email === UserInfo.email )
            return await ResponseHelper.notAuthorized( res, { error:  "credentials invalid" }); 

        if (! await UserHelper.comparePassword( password, UserInfo.password ))
            return await ResponseHelper.notAuthorized( res, { error:  "credentials invalid" });

        if ( await repository.ChangeEmail( UserInfo.email, new_email )) {

            await repository.createLogUpdateEmail( UserInfo.email, new_email );

            await repository.deleteToken( change_token );

            await UserHelper.disconnectAllSession( UserInfo.email );

            return await ResponseHelper.success( res, { success: "email changed" }); ;
        }

        return await ResponseHelper.unprocessableEntity( res, { error: "unable to process request" }); 
    }

}

export default new UpdateController();