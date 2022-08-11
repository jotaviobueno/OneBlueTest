// Model
import TokensChangePasswordModel from '../../../Model/User/AuthToken/TokensChangePasswordModel.js';

class AuthHelper {
    
    async verifyTokenExpiresDate ( ) {
        const findAllTokens = await TokensChangePasswordModel.find({ status: null });

        findAllTokens.forEach( async (tokens) => {
            if ( new Date() >= tokens.token_expires_in )
                await TokensChangePasswordModel.findOneAndUpdate({ token_to_change_email: tokens.token_to_change_email }, {status: false })
        });
    }

    async checkTheAmountOfToken ( email ) {
        const findAllUserToken = await TokensChangePasswordModel.find({ email: email, status: null });

        if ( findAllUserToken.length >= 1 )
            await TokensChangePasswordModel.updateMany({ email: email }, { status: false });
    }
}

export default new AuthHelper();