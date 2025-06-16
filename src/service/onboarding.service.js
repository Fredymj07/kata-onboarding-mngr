import { Onboarding } from '../models/onboarding.model.js';

const createOnboarding = async (body) => {
  try {
    const query = await Onboarding.create(body);
    return query;
  } catch (error) {
    throw new Error(`Error creating onboarding: ${error.message}`);
  }
};

const getAllOnboardings = async () => {
  try {
    const onboardings = await Onboarding.findAll();
    return onboardings;
  } catch (error) {
    throw new Error(`Error fetching all onboardings: ${error.message}`);
  }
};

const getOnboardingById = async (id) => {
  try {
    const onboarding = await Onboarding.findByPk(id);

    if (!onboarding) {
      throw new Error('Onboarding not found');
    }

    return onboarding;
  } catch (error) {
    throw new Error(`Error fetching onboarding by ID: ${error.message}`);
  }
};

const getOnboardingByType = async (type) => {
  try {
    const onboarding = await Onboarding.findOne({ where: { type } });
    return onboarding;
  } catch (error) {
    throw new Error(`Error fetching onboarding by type: ${error.message}`);
  }
};

const updateOnboarding = async (id, type) => {
  try {
    const onboarding = await Onboarding.findByPk(id);
    if (!onboarding) {
      throw new Error('Onboarding not found');
    }
    onboarding.type = type;
    await onboarding.save();
    return onboarding;
  } catch (error) {
    throw new Error(`Error updating onboarding: ${error.message}`);
  }
};
const deleteOnboarding = async (id) => {
  try {
    const onboarding = await Onboarding.findByPk(id);

    if (!onboarding) {
      throw new Error('Onboarding not found');
    }
    await onboarding.destroy();
    return { message: 'Onboarding deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting onboarding: ${error.message}`);
  }
};

export default {
  createOnboarding,
  getAllOnboardings,
  getOnboardingById,
  getOnboardingByType,
  updateOnboarding,
  deleteOnboarding
};
