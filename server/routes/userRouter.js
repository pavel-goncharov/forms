import Router from 'express';
import UserController from '../controllers/userController.js';

const userRouter = new Router();

userRouter.post('/signup', UserController.signUp);
userRouter.post('/login', UserController.login);
userRouter.get('/refresh', UserController.refreshToken);
userRouter.get('/logout', UserController.logOut);
userRouter.get('/:id/nickname', UserController.getNickname);

export default userRouter;