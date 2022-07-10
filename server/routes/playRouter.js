import Router from 'express';
import PlayController from '../controllers/playController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const playRouter = new Router();

playRouter.post('/:id', verifyJWT, PlayController.createPassage);

export default playRouter;