import { Router } from 'express';
import userController from '../../controller/user.controller.js';

const router = Router();

router
.post('/login', userController.login)
.post('/new', userController.createUser)
.get('/by-role', userController.findUsersByRole)

export default router;