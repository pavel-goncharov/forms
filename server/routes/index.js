import Router from 'express';
import userRouter from './userRouter.js';
import catalogRouter from './catalogRouter.js';
import formRouter from './formRouter.js';
import playRouter from './playRouter.js';
import editRouter from './editRouter.js';
import statisticRouter from './statisticRouter.js';
import {Routes} from '../constants/api.js';

const router = new Router();

router.use(Routes.USER, userRouter);
router.use(Routes.CATALOG, catalogRouter);
router.use(Routes.FORM, formRouter);
router.use(Routes.PLAY, playRouter);
router.use(Routes.EDIT, editRouter);
router.use(Routes.STATISTIC, statisticRouter);

export default router;