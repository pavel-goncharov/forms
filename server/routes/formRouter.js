import Router from 'express';
import FormController from '../controllers/formController.js';
import verifyJWT from '../middleware/verifyJWT.js';
import {FormRoutes} from '../constants/api.js';

const formRouter = new Router();

formRouter.get(FormRoutes.FORM, verifyJWT, FormController.getQuestionItems);
formRouter.get(FormRoutes.TITLE, verifyJWT, FormController.getFormTitle);
formRouter.delete(FormRoutes.FORM, verifyJWT, FormController.deleteForm);
formRouter.get(FormRoutes.AUTHOR, verifyJWT, FormController.checkIsAuthorForm);

export default formRouter;