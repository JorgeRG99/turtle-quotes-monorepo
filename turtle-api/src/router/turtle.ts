import { Router } from 'express';
import { TurtleAuthController } from '../controllers/TrutleAuthController';
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../config';

export const turtleRouter = Router();

turtleRouter.post(LOGIN_ROUTE, TurtleAuthController.login);
turtleRouter.post(REGISTER_ROUTE, TurtleAuthController.register);