// Dependencies
import yup from 'yup';

class ArticleRequest {
    async validateCreateArticle ( req, res, next ) {
        req.headers;

        const schemaBody =  yup.object().shape({

            article_title: yup.string ("username not defined")
            .required ("the username field is necessary to be able to register"),

            article_text: yup.string ('password is not defined')
            .required ('the password is required for registration'),

            author: yup.string ('password is not defined')
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

    async validateDeleteArticle ( req, res, next ) {
        req.headers;

        const schemaBody =  yup.object().shape({

            password: yup.string ("username not defined")
            .required ("the username field is necessary to be able to register"),
    
        });

        const schemaHeaders = yup.object().shape({

            session_token: yup.string ('session_token is not defined')
            .required ("session_token not defined, please login again"),

            article_id: yup.string ('session_token is not defined')
            .required ("session_token not defined, please login again")
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

    async validateFindOneArticle ( req, res, next ) {
        req.headers;

        const schemaHeaders = yup.object().shape({

            article_id: yup.string ('session_token is not defined')
            .required ("session_token not defined, please login again")
        });
    
        try {

            await schemaHeaders.validate(req.headers);

        } catch(err) {
            return res.status(400).json({
                message: err.errors
            });
        }
       await next();
    }
}

export default new ArticleRequest();