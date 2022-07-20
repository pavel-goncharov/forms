import Router from 'express';
import PlayController from '../controllers/playController.js';
import verifyJWT from '../middleware/verifyJWT.js';
import {PlayRoutes} from '../constants/api.js';

const playRouter = new Router();

playRouter.post(PlayRoutes.PASSAGE, verifyJWT, PlayController.createPassage);
playRouter.get(PlayRoutes.CHECK, verifyJWT, PlayController.checkIsCorrectToPassForm);

export default playRouter;