import { Router } from 'express';
import userOnboardingController from '../../controller/userOnboarding.controller.js';
import validateToken from '../../middleware/validateToken.middleware.js';
import { authorizeRoles } from '../../middleware/auth.middleware.js';

const router = Router();

router.use(validateToken.validateToken);

router
  .post('/new', authorizeRoles('analystHHRR'), userOnboardingController.createUserOnboarding)
  .get('/list', authorizeRoles('analystHHRR'), userOnboardingController.findAllUserOnboardings)
  .get('/list/:userId', authorizeRoles('employee'), userOnboardingController.findOnboardingByUserId);

export default router;
