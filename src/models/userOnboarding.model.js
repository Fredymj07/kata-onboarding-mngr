import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { User } from './user.model.js';
import { Onboarding } from './onboarding.model.js';

export const UserOnboarding = sequelize.define('UserOnboarding', {
  userId: {
    type: DataTypes.INTEGER,
    references: { model: User, key: 'id' },
  },
  onboardingId: {
    type: DataTypes.INTEGER,
    references: { model: Onboarding, key: 'id' },
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'in_progress'),
    defaultValue: 'pending',
  },
  assignedDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  finishedDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
}, {
  tableName: 'user_onboardings',
  timestamps: false,
});

User.belongsToMany(Onboarding, { through: UserOnboarding, foreignKey: 'userId' });
Onboarding.belongsToMany(User, { through: UserOnboarding, foreignKey: 'onboardingId' });
