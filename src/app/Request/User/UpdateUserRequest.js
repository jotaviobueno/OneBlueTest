// Dependencies
import yup from 'yup';

class UpdateUserRequest {
    async validateUpdateName ( req, res, next ) {
        req.headers;

        const schemaBody =  yup.object().shape({

            new_name: yup.string ("username not defined")
            .required ("the username field is necessary to be able to register"),

            password: yup.string ('password is not defined')
            .required ('the password is required for registration')
    
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

    async validateUpdatePassword1 ( req, res, next ) {
        req.headers;

        const schemaBody =  yup.object().shape({

            new_password: yup.string ("new_password not defined")
            .required ("the username field is necessary to be able to register"),
    

            password: yup.string ('password is not defined')
            .required ('the password is required for registration')

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

    async validateUpdateEmail ( req, res, next ) {
        req.headers;

        const schemaBody =  yup.object().shape({

            new_email: yup.string ("new_password not defined")
            .required ("the username field is necessary to be able to register"),
    

            password: yup.string ('password is not defined')
            .required ('the password is required for registration')

        });

        const schemaHeaders = yup.object().shape({

            change_token: yup.string ('session_token is not defined')
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

    async validateUpdatePassword2 ( req, res, next ) {
        req.headers;

        const schemaBody =  yup.object().shape({

            new_password: yup.string ("new_password not defined")
            .required ("the username field is necessary to be able to register"),

        });

        const schemaHeaders = yup.object().shape({

            change_token: yup.string ('session_token is not defined')
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

export default new UpdateUserRequest();