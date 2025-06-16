import userOnboardingService from '../service/userOnboarding.service.js';
import userService from '../service/user.service.js';
import onboardingService from '../service/onboarding.service.js';

const createUserOnboarding = async (req, res) => {
  try {
    const data = req.body;
    const userId = await userService.findOneById(data.userId);
    const onboardingId = await onboardingService.getOnboardingById(data.onboardingId);

    if (!userId || !onboardingId) {
      res.status(404).json({ message: 'User or onboarding not exist!' });
    }

    const userOnboarding = await userOnboardingService.createUserOnboarding(data);
    res.status(201).json(userOnboarding);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor', detail: error.message });
  }
};

const findAllUserOnboardings = async (req, res) => {
  try {
    const userOnboardings = await userOnboardingService.findAllUserOnboardings();
    res.status(200).json(userOnboardings);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor', detail: error.message });
  }
};

const findOnboardingByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userOnboarding = await userOnboardingService.findOnboardingByUserId(userId);
    res.status(200).json(userOnboarding);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor', detail: error.message });
  }
};

export default {
  createUserOnboarding,
  findAllUserOnboardings,
  findOnboardingByUserId
}
