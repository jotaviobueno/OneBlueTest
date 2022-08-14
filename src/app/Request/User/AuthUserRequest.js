// Dependencies
import yup from 'yup';

class AuthUserRequest {
    async validateGenerationTokenPassword ( req, res, next ) {
        req.headers;

        const schemaBody =  yup.object().shape({

            email: yup.string ("username not defined")
            .required ("the username field is necessary to be able to register"),
    
        });
    
        try {

            await schemaBody.validate(req.body);

        } catch(err) {
            return res.status(400).json({
                message: err.errors
            });
        }
       await next();
    }

    async validateGenerationTokenEmail ( req, res, next ) {
        req.headers;

        const schemaBody =  yup.object().shape({

            password: yup.string ("username not defined")
            .required ("the username field is necessary to be able to register"),
    
        });

        const schemaHeaders = yup.object().shape({

            session_token: yup.string ('session_token is not defined')
            .required ("session_token not defined, please login again"),
        });
    
        try {

            await schemaHeaders.validate(req.headers);

            await schemaBody.validate(req.body);

        } catch(err) {
            return res.status(400).json({
                message: err.errors
            });
        }
       await next();
    }
}

export default new AuthUserRequest();