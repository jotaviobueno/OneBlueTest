import express from 'express';
export const UserRoutes = express.Router();

// Controllers
import UserController from '../http/Controller/User/UserController.js';
import UpdateController from '../http/Controller/User/UpdateController.js';
import AuthController from '../http/Controller/User/Auth/AuthController.js';

// Request/Validators/Middlewares
import UserRequest from '../Request/User/UserRequest.js';

UserRoutes.post( '/register', UserRequest.validateStorage, UserController.storageUser );
UserRoutes.post( '/login', UserRequest.validateLogin, UserController.login );
UserRoutes.get( '/my-account', UserRequest.validateSeeAccount, UserController.seeAccount );
UserRoutes.delete( '/my-account/delete', UserRequest.validateDeleteAccount, UserController.delete );

// Change
UserRoutes.patch( '/my-account/change-name', UpdateController.name );
UserRoutes.patch( '/my-account/change-password', UpdateController.ChangePassword );
UserRoutes.patch( '/change/email', UpdateController.changeEmail );

// GetToken
UserRoutes.get( '/get-token/change-password', AuthController.generationTokenChangePassword );
UserRoutes.get( '/get-token/change-email', AuthController.generationTokenChangeEmail );
