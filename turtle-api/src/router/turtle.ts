import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { LOGIN_ROUTE, LOGOUT_ROUTE, RANK_ROUND, REGISTER_ROUTE, SESSION_CHECK_ROUTE } from '../config';
import { auth } from '../middlewares/authentication';
import { StatsController } from '../controllers/StatsController';

export const turtleRouter = Router();

turtleRouter.get(SESSION_CHECK_ROUTE, auth, AuthController.sessionCheck);
turtleRouter.post(LOGIN_ROUTE, AuthController.login);
turtleRouter.post(REGISTER_ROUTE, AuthController.register);
turtleRouter.post(LOGOUT_ROUTE, auth, AuthController.logout);
turtleRouter.post(RANK_ROUND, auth, StatsController.rankRound);