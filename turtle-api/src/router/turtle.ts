import { Router } from 'express';
import { TurtleAuthController } from '../controllers/TrutleAuthController';
import { LOGIN_ROUTE, LOGOUT_ROUTE, REGISTER_ROUTE, SESSION_CHECK_ROUTE } from '../config';
import { auth } from '../middlewares/authentication';

export const turtleRouter = Router();

turtleRouter.get(SESSION_CHECK_ROUTE, auth, TurtleAuthController.sessionCheck);
turtleRouter.post(LOGIN_ROUTE, TurtleAuthController.login);
turtleRouter.post(REGISTER_ROUTE, TurtleAuthController.register);
turtleRouter.post(LOGOUT_ROUTE, auth, TurtleAuthController.logout);