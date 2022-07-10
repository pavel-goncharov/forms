import Router from 'express';
import CatalogController from '../controllers/catalogController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const catalogRouter = new Router();

catalogRouter.post('/', verifyJWT, CatalogController.createForm);
catalogRouter.get('/', verifyJWT, CatalogController.getAllCatalogItems);

export default catalogRouter;