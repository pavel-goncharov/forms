import Router from 'express';
import userRouter from './userRouter.js';
import catalogRouter from './catalogRouter.js';
import formRouter from './formRouter.js';
import playRouter from './playRouter.js';
import editRouter from './editRouter.js';
import statisticRouter from './statisticRouter.js';

const router = new Router();

router.use('/user', userRouter);
router.use('/catalog', catalogRouter);
router.use('/form', formRouter);
router.use('/play', playRouter);
router.use('/edit', editRouter);
router.use('/statistic', statisticRouter);

export default router;