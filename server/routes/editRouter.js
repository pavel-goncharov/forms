import Router from 'express';
import EditController from '../controllers/editController.js'
import verifyJWT from '../middleware/verifyJWT.js';
import {EditRoutes} from '../constants/api.js';

const editRouter = new Router();

editRouter.get(EditRoutes.INFO, verifyJWT, EditController.getInfoForm);
editRouter.put(EditRoutes.INFO, verifyJWT, EditController.updateInfoForm);
editRouter.put(EditRoutes.SAVE, verifyJWT, EditController.saveForm);

export default editRouter;