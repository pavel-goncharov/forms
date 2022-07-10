import Router from 'express';
import editController from '../controllers/editController.js'
import verifyJWT from '../middleware/verifyJWT.js';

const editRouter = new Router();

editRouter.get('/:id/info', verifyJWT, editController.getInfoForm);
editRouter.put('/:id/info', verifyJWT, editController.updateInfoForm);
editRouter.put('/:id/save', verifyJWT, editController.saveForm);

// for postman
// editRouter.post('/:id/question', editController.createQuestion);
// editRouter.delete('/question/:id', editController.deleteQuestion);
// editRouter.post('/question/:id/answer', editController.createAnswer);
// editRouter.delete('/answer/:id', editController.deleteAnswer);

export default editRouter;