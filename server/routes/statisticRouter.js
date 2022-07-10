import Router from 'express';
import StatisticController from '../controllers/statisticController.js';
import verifyJWT from '../middleware/verifyJWT.js';
const statisticRouter = new Router();

statisticRouter.get('/:id/passages', verifyJWT, StatisticController.getCountPassage);
statisticRouter.get('/:id/filter/questions', verifyJWT, StatisticController.getFilterQuestions);
statisticRouter.get('/:id/filter/users', verifyJWT, StatisticController.getFilterUsers);
statisticRouter.post('/:id', verifyJWT, StatisticController.calcStatistic);

export default statisticRouter;