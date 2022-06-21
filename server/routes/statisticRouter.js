import Router from 'express';
import StatisticController from '../controllers/statisticController.js';
const statisticRouter = new Router();

statisticRouter.get('/:id/passages', StatisticController.getCountPassage);
statisticRouter.get('/:id/filter', StatisticController.getFilter);
statisticRouter.get('/:id', StatisticController.getStatistic);

export default statisticRouter;