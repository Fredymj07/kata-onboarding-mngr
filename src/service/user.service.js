import { User } from '../models/user.model.js';
import { encriptPassword, comparePassword } from '../utils/password.utils.js';

const login = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    return user;
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

const createUser = async ({name, email, password, role, dateEntry}) => {
  try {
    const passwordEncripted = await encriptPassword(password);
    const user = await User.create({
      name,
      email,
      password: passwordEncripted,
      role,
      dateEntry
    });
    return user;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

const findOneById = async(id) => {
  return await User.findOne({where: { id }});
};

const findOneByEmail = async(email) => {
  return await User.findOne({where: { email }});
};

const findUsersByRole = async(role) => {
  return await User.findAll({where: { role }});
};

export default {
  login,
  createUser,
  findOneById,
  findOneByEmail,
  findUsersByRole
}
