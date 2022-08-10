import express from 'express';
export const UserRoutes = express.Router();

// Controllers
import UserController from '../http/Controller/User/UserController.js';

// Request/Validators/Middlewares
import UserRequest from '../Request/User/UserRequest.js';

UserRoutes.post('/register', UserRequest.validateStorage, UserController.storageUser);
UserRoutes.post('/login', UserRequest.validateLogin, UserController.login);