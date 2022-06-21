import Router from 'express';
import PlayController from '../controllers/playController.js';

const playRouter = new Router();

playRouter.post('/:id', PlayController.createPassage);

export default playRouter;