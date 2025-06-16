import { Router } from 'express';
import onboardingController from '../../controller/onboarding.controller.js';
import validateToken from '../../middleware/validateToken.middleware.js';
import { authorizeRoles } from '../../middleware/auth.middleware.js';

const router = Router();

router.use(validateToken.validateToken);

router
  .post('/new', authorizeRoles('analystHHRR'), onboardingController.createOnboarding)
  .get('/list', authorizeRoles('analystHHRR'), onboardingController.getAllOnboardings)
  .get('/:type', authorizeRoles('analystHHRR'), onboardingController.getOnboardingByType)
  .put('/:id', authorizeRoles('analystHHRR'), onboardingController.updateOnboarding)
  .delete('/:id', authorizeRoles('analystHHRR'), onboardingController.deleteOnboarding);

export default router;
