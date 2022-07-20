import Router from 'express';
import UserController from '../controllers/userController.js';
import verifyJWT from '../middleware/verifyJWT.js';
import {UserRoutes} from '../constants/api.js';

const userRouter = new Router();

userRouter.post(UserRoutes.SIGN_UP, UserController.signUp);
userRouter.post(UserRoutes.LOGIN, UserController.login);
userRouter.post(UserRoutes.REFRESH, verifyJWT, UserController.refreshToken);
userRouter.post(UserRoutes.LOGOUT, UserController.logOut);
userRouter.post(UserRoutes.GET_ME, verifyJWT, UserController.getMe);

export default userRouter;