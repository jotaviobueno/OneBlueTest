// Dependencies
import yup from 'yup';

class UserRequest {
    
    async validateStorage (req, res, next) {
        req.headers;

        const schemaBody =  yup.object().shape({

            username: yup.string ("username not defined")
            .required ("the username field is necessary to be able to register")
            .min (3, "username too small")
            .max (30, "username too big"),

            email: yup.string ('email is not defined')
            .required ("email is required for registration")
            .email ('send in email format'),
           
            password: yup.string ('password is not defined')
            .required ('the password is required for registration')
            .min (4, 'your password is too small')
            .max (35, 'your password is too big')
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

}

export default new UserRequest();