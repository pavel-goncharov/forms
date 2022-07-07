import Router from 'express';
import FormController from '../controllers/formController.js';

const formRouter = new Router();

formRouter.get('/:id', FormController.getQuestionItems);
formRouter.get('/:id/title', FormController.getFormTitle);
formRouter.get('/:id/author', FormController.getAuthor);
formRouter.delete('/:id', FormController.deleteForm);

export default formRouter;