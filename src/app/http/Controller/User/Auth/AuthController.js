// repository
import repository from '../../../Repository/User/Auth/AuthRepository.js';

// Helpers
import UserHelper from '../../../../Helper/User/UserHelper.js';
import AuthHelper from '../../../../Helper/User/Auth/AuthHelper.js';
import ResponseHelper from '../../../../Helper/ResponseHelper.js';

class AuthController {
    
    async generationTokenChangePassword ( req, res ) {
        const { email } = req.body;
        
        await AuthHelper.verifyTokenExpiresDate();

        const UserInfo = await UserHelper.existEmail( email );

        if (! UserInfo )
            return await ResponseHelper.badRequest( res, { error:  "email not found" });

        await AuthHelper.checkTheAmountOfToken(UserInfo.email);

        const changeToken = await repository.GenerationTokenToChangePassword( email );

        if ( changeToken )
            return await ResponseHelper.success(res, {
                change_token: changeToken.token, 
                token_expires_in: changeToken.token_expires_in
            });
        
        return await ResponseHelper.unprocessableEntity( res, { error: "unable to process request" }); 
    } 
}

export default new AuthController();