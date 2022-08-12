// Dependencies
import mongoose from 'mongoose';

const TokensChangeEmail = mongoose.model( "TokensChangeEmail", {

    email: { type: String, required: true },
    token: { type: String, required: true },
    token_expires_in: { type: Date, required: true },
    status: { type: Boolean}

    //  STATUS:
    //  NULL = GERADO MAIS NÃO UTILIZADO
    //  TRUE = GERADO É UTILIZADO
    //  FALSE = TOKEN EXPIRADO

});

export default TokensChangeEmail;
