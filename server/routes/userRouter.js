import Router from 'express';
import userController from '../controllers/userController.js';

const router = new Router();

// router.get('/user1', (req, res) => res.json({name: 'works'}));
router.post('/signup', userController.signUp);
router.post('/login', userController.login);

export default router;