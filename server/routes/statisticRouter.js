import Router from 'express';
import StatisticController from '../controllers/statisticController.js';
const statisticRouter = new Router();

statisticRouter.get('/:id/passages', StatisticController.getCountPassage);
statisticRouter.get('/:id/filter/questions', StatisticController.getFilterQuestions);
statisticRouter.get('/:id/filter/users', StatisticController.getFilterUsers);
statisticRouter.post('/:id', StatisticController.calcStatistic);

export default statisticRouter;