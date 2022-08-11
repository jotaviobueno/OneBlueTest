import express from 'express';
export const UserRoutes = express.Router();

// Controllers
import UserController from '../http/Controller/User/UserController.js';
import UpdateController from '../http/Controller/User/UpdateController.js';

// Request/Validators/Middlewares
import UserRequest from '../Request/User/UserRequest.js';

UserRoutes.post('/register', UserRequest.validateStorage, UserController.storageUser);
UserRoutes.post('/login', UserRequest.validateLogin, UserController.login);
UserRoutes.get('/my-account', UserRequest.validateSeeAccount, UserController.seeAccount);
UserRoutes.delete('/my-account/delete', UserRequest.validateDeleteAccount, UserController.delete);

UserRoutes.patch('/my-account/change-name', UpdateController.name);