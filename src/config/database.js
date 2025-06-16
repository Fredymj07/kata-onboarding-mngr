import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const database = process.env.DATABASE;
const username = process.env.DB_USER;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const port = Number(process.env.DB_PORT);

export const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
