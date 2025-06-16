import { UserOnboarding } from '../models/userOnboarding.model.js';

const createUserOnboarding = async (body) => {
  try {
    const query = await UserOnboarding.create(body);
    return query;
  } catch (error) {
    throw new Error(`Error creating user onboarding: ${error.message}`);
  }
};

const findAllUserOnboardings = async () => {
  try {
    const query = await UserOnboarding.findAll();
    return query;
  } catch (error) {
    throw new Error(`Error fetching user onboardings: ${error.message}`);
  }
};

const findOnboardingByUserId = async (userId) => {
  try {
    const query = await UserOnboarding.findAll({
      where: { userId }
    });
    return query;
  } catch (error) {
    throw new Error(`Error fetching onboarding for user ID ${userId}: ${error.message}`);
  }
};

export default {
  createUserOnboarding,
  findAllUserOnboardings,
  findOnboardingByUserId
};
