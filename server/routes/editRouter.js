import Router from 'express';
import editController from '../controllers/editController.js'

const editRouter = new Router();

editRouter.put('/:id/info', editController.updateInfoForm);
editRouter.put('/:id/save', editController.saveForm);

editRouter.post('/:id/question', editController.createQuestion);
editRouter.delete('/question/:id', editController.deleteQuestion);

editRouter.post('/question/:id/answer', editController.createAnswer);
editRouter.delete('/answer/:id', editController.deleteAnswer);

export default editRouter;