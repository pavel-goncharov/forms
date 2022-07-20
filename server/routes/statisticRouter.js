import Router from 'express';
import StatisticController from '../controllers/statisticController.js';
import verifyJWT from '../middleware/verifyJWT.js';
import {StatisticRoutes} from '../constants/api.js';

const statisticRouter = new Router();

statisticRouter.get(StatisticRoutes.PASSAGES, verifyJWT, StatisticController.getCountPassage);
statisticRouter.get(StatisticRoutes.FILTER_QUESTIONS, verifyJWT, StatisticController.getFilterQuestions);
statisticRouter.get(StatisticRoutes.FILTER_USERS, verifyJWT, StatisticController.getFilterUsers);
statisticRouter.post(StatisticRoutes.STATISTIC, verifyJWT, StatisticController.calcStatistic);
statisticRouter.get(StatisticRoutes.STATISTIC, verifyJWT, StatisticController.getAllStatistic);

export default statisticRouter;