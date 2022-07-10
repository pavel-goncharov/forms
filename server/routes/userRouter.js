import Router from 'express';
import UserController from '../controllers/userController.js';

import verifyJWT from '../middleware/verifyJWT.js';

const userRouter = new Router();

userRouter.post('/signup', UserController.signUp);
userRouter.post('/login', UserController.login);
userRouter.post('/refresh', verifyJWT, UserController.refreshToken);
userRouter.post('/logout', UserController.logOut);
userRouter.post('/me', verifyJWT, UserController.getMe);

export default userRouter;