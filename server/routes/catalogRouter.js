import Router from 'express';
import CatalogController from '../controllers/catalogController.js';
import verifyJWT from '../middleware/verifyJWT.js';
import {CatalogRoutes} from '../constants/api.js';

const catalogRouter = new Router();

catalogRouter.post(CatalogRoutes.DEFAULT, verifyJWT, CatalogController.createForm);
catalogRouter.get(CatalogRoutes.DEFAULT, verifyJWT, CatalogController.getAllCatalogItems);

export default catalogRouter;