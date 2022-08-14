import express from 'express';
export const UserRoutes = express.Router();

// Controllers
import UserController from '../http/Controller/User/UserController.js';
import UpdateController from '../http/Controller/User/UpdateController.js';
import AuthController from '../http/Controller/User/Auth/AuthController.js';

// Request/Validators/Middlewares
import UserRequest from '../Request/User/UserRequest.js';
import UpdateUserRequest from '../Request/User/UpdateUserRequest.js';
import AuthUserRequest from '../Request/User/AuthUserRequest.js';

UserRoutes.post( '/register', UserRequest.validateStorage, UserController.storageUser );
UserRoutes.post( '/login', UserRequest.validateLogin, UserController.login );
UserRoutes.get( '/my-account', UserRequest.validateSeeAccount, UserController.seeAccount );
UserRoutes.delete( '/my-account/delete', UserRequest.validateDeleteAccount, UserController.delete );

// Change
UserRoutes.patch( '/my-account/change-name', UpdateUserRequest.validateUpdateName, UpdateController.name );
UserRoutes.patch( '/my-account/change-password', UpdateUserRequest.validateUpdatePassword1, UpdateController.ChangePasswordV1 );
UserRoutes.patch( '/change/email', UpdateUserRequest.validateUpdateEmail, UpdateController.changeEmail );
UserRoutes.patch( '/change/password', UpdateUserRequest.validateUpdatePassword2, UpdateController.changePasswordV2 );

// GetToken
UserRoutes.get( '/get-token/change-password', AuthUserRequest.validateGenerationTokenPassword, AuthController.generationTokenChangePassword );
UserRoutes.get( '/get-token/change-email', AuthUserRequest.validateGenerationTokenEmail, AuthController.generationTokenChangeEmail );
