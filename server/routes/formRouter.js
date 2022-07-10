import Router from 'express';
import FormController from '../controllers/formController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const formRouter = new Router();

formRouter.get('/:id', verifyJWT, FormController.getQuestionItems);
formRouter.get('/:id/title', verifyJWT, FormController.getFormTitle);
formRouter.get('/:id/author', verifyJWT, FormController.getAuthor);
formRouter.delete('/:id', verifyJWT, FormController.deleteForm);

export default formRouter;