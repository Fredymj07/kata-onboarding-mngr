import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Onboarding = sequelize.define('Onboarding', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.ENUM('welcome', 'technician'),
    allowNull: false,
  },
  workArea: {
    type: DataTypes.ENUM('all', 'tecnology', 'accounting', 'ux', 'humanResources'),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activities: {
    type: DataTypes.JSON,
    allowNull: false,
  },
}, {
  tableName: 'onboardings',
  timestamps: false,
});
