import Router from 'express';
import CatalogController from '../controllers/catalogController.js';

const catalogRouter = new Router();

catalogRouter.post('/', CatalogController.createForm);
catalogRouter.get('/', CatalogController.getAllCatalogItems);

export default catalogRouter;