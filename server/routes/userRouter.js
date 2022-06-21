import Router from 'express';
import UserController from '../controllers/userController.js';

const userRouter = new Router();

userRouter.post('/signup', UserController.signUp);
userRouter.post('/login', UserController.login);
userRouter.get('/nickname', UserController.getNickname);

export default userRouter;