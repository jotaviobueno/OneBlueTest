// Model
import TokensChangePasswordModel from '../../../Model/User/AuthToken/TokensChangePasswordModel.js';
import TokensChangeEmailModel from '../../../Model/User/AuthToken/TokensChangeEmailModel.js';

class AuthHelper {
    
    async verifyTokenExpiresDate ( ) {
        const findAllTokens = await TokensChangePasswordModel.find({ status: null });

        findAllTokens.forEach( async (tokens) => {
            if ( new Date() >= tokens.token_expires_in )
                await TokensChangePasswordModel.findOneAndUpdate({ token: tokens.token }, {status: false })
        });
    }

    async checkTheAmountOfToken ( email ) {
        const findAllUserToken = await TokensChangePasswordModel.find({ email: email, status: null });

        if ( findAllUserToken.length >= 1 )
            await TokensChangePasswordModel.updateMany({ email: email }, { status: false });
    }

    async checkTheAmountOfTokenEmail ( email ) {
        const findAllUserToken = await TokensChangeEmailModel.find({ email: email, status: null });

        if ( findAllUserToken.length >= 1 )
            await TokensChangeEmailModel.updateMany({ email: email }, { status: false });
    }

    async verifyEmailTokenExpiresDate ( ) {
        const findAllTokens = await TokensChangeEmailModel.find({ status: null });

        findAllTokens.forEach( async (tokens) => {
            if ( new Date() >= tokens.token_expires_in )
                await TokensChangeEmailModel.findOneAndUpdate({ token: tokens.token }, {status: false })
        });
    }
}

export default new AuthHelper();