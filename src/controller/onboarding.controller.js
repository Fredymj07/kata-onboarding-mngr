import onboardingService from '../service/onboarding.service.js';

const createOnboarding = async (req, res) => {
  try {
    const data = req.body;

    if (!data) {
      return res.status(422).json({ message: 'All the fields are required' });
    }

    const onboarding = await onboardingService.createOnboarding(data);
    res.status(201).json(onboarding);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor', detail: error.message });
  }
};

const getAllOnboardings = async (req, res) => {
  try {
    const onboardings = await onboardingService.getAllOnboardings();
    res.status(200).json(onboardings);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor', detail: error.message });
  }
};

const getOnboardingByType = async (req, res) => {
  try {
    const { type } = req.params;

    if (!type) {
      return res.status(422).json({ message: 'Type is required' });
    }

    const onboarding = await onboardingService.getOnboardingByType(type);

    if (!onboarding) {
      return res.status(404).json({ message: 'Onboarding not found' });
    }

    res.status(200).json(onboarding);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor', detail: error.message });
  }
};

const updateOnboarding = async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body;

    if (!type) {
      return res.status(422).json({ message: 'Type is required' });
    }

    const onboarding = await onboardingService.updateOnboarding(id, type);

    if (!onboarding) {
      return res.status(404).json({ message: 'Onboarding not found' });
    }

    res.status(200).json(onboarding);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor', detail: error.message });
  }
};

const deleteOnboarding = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await onboardingService.deleteOnboarding(id);

    res.status(204).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor', detail: error.message });
  }
};

export default {
  createOnboarding,
  getAllOnboardings,
  getOnboardingByType,
  updateOnboarding,
  deleteOnboarding
};
